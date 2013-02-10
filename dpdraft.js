//load config
var fs = require('fs');
var conf = JSON.parse(fs.readFileSync(__dirname+'/config.json', 'utf8'));

// initialize express
var port = 14833;
var express = require('express');
var request = require('request');

var players = {};
var nextUserId = 0;

var app = express.createServer();
app.configure(function () {
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'ghasp' }));
	app.use(express.bodyParser());
	//app.use(express.cookieSession()); //3.0
	app.use('/public', express.static(__dirname + '/public/'));
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.get('/', function(req, res) {
	if(req.session.auth && req.session.auth.loggedIn){
		res.sendfile(__dirname + '/public/index.html');
	} else {
		res.sendfile(__dirname + '/public/auth.html');
	}
});

app.get('/sid', function(req, res) {
	res.send(req.session.id);
});

//handle google oauth2
app.get('/oauth2callback', function(req, res){
	if(!req.query.error && req.query.code){
		(function(nextId, req, res){
			//upgrade from a code to a token
			request.post({
					url 	: 'https://accounts.google.com/o/oauth2/token'
					,json	: true
					,form 	: {
						code 			: req.query.code
						,client_id 		: conf.google.client_id
						,client_secret 	: conf.google.client_secret
						,redirect_uri	: 'http://'+req.headers.host+'/oauth2callback' //not sure why this is req
						,grant_type		: 'authorization_code'
					}
				}
				,function(error, response, body){
					if(error || !body.access_token){
						console.log(error);
						res.sendfile(__dirname + '/public/autherror.html');
					} else {
						//TODO: disconnect this player 
						//create a new session
						players[req.session.id] = {
							access_token : body.access_token
						};
						
						//get user info
						//we shouldn't need a closure here because req and res are already scoped for this user
						request.get({
								uri 	: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='+body.access_token
								,json 	: true
							}
							,function(error, response, body){
								var p = players[req.session.id];
									p.googleid 	= body.id;
									p.name 		= body.name;
									p.picture	= body.picture;
									p.link		= body.link;
								console.log('new connection: '+ body.name + ' - '+ body.id );
								res.sendfile(__dirname + '/public/index.html');
							}
						);	
					}
				}
			);
		})(++nextUserId, req, res);
	} else {
		res.sendfile(__dirname + '/public/autherror.html');
	} 
});

app.listen(port);
console.log('http://localhost:'+port+'/');

//initialize dnode
var DNode = require('dnode');
var commands =  require('./commands');
var algo = require('./algorithms');
DNode(function(client, conn) {
	
	this.setupClient = function(sid, cb) {
		if(!sid || !players[sid]){
			client.logout();
		} else
		{
			client.sid = sid;
			var p = players[sid];
			if(!p.client){
				p.client = client;
				cb({
					name 		: p.name
					,picture 	: p.picture
					,link 		: p.link
				});
			}
		}
	}
	
	
	// conn.on('ready', function() {
	// });
	conn.on('end', function () {
		if(client.sid && players[client.sid]) {
			var disconnectText = players[client.sid].name + ' disconnected';
			console.log(conn.id+': '+disconnectText);
			delete players[client.sid];
			for(var p in players) {
				if(players[p].client)
					players[p].client.log(disconnectText);
			}
		}
	});
	this.say = function (text, cb) {
		if(text.length > 1 && text.indexOf('/') == 0) {
			//command
			var c = algo.parseCommand(text);
			if(c.command in commands)
			{
				commands[c.command](function(result,error){
					if(error){ client.raiseError(error);}
					else { client.log(result);}
				},c.args,players);
			} else {
				client.raiseError('command '+c.command+' not recognized');
			}
		} else {
			//chat
			//text = escape(text);
			for(var p in players) {
				if(players[p].client)
					players[p].client.hear(players[client.sid].name,text);
			}
		}
	};
	
}).listen(app);

// You can pass options through to socket.io with the io parameter:
// dnode(...).listen(webserver, { io : { flashPolicyServer : false } });