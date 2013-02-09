// initialize express
var port = 14833;
var express = require('express');
var players = {};

//setup google auth
var everyauth = require('everyauth');
everyauth.google
	.appId('dpdraft.nodester.com')
	.appSecret('TV-ot6hX9mTvvYqwxp-kjGUH')
	.scope('https://www.googleapis.com/auth/userinfo.profile') // What you want access to
	.handleAuthCallbackError( function (req, res) {
		console.log('authcallbackerror !');
	})
	.findOrCreateUser( function (session, accessToken, accessTokenExtra, googleUserMetadata) {
		console.log('token:'+accessToken);
		console.log(googleUserMetadata);
	})
	.redirectPath('/');

var app = express.createServer();
app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(everyauth.middleware());
	app.use(express.session({ secret: 'foobar' }));
	app.use('/public', express.static(__dirname + '/public/'));
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.get('/google4c9586b693d4cf5b.html', function(req,res) {
	res.sendfile(__dirname + '/public/google4c9586b693d4cf5b.html');
});
app.get('/', function(req, res) {
	if(req.session.auth && req.session.auth.loggedIn){
		res.sendfile(__dirname + '/public/index.html');
	} else {
		res.sendfile(__dirname + '/public/auth.html');
	}

});
app.get('/api/test',function(req, res) {
	var ip_address;
	try {
		ip_address = req.connection.remoteAddress;
		for(var p in players) {
			players[p].hear('drupal:','ip-'+ip_address);
		}
	} catch(error)
	{
		console.log(error);
	}
	res.send(JSON.stringify({error:'', result:'get successful'}));
});
app.post('/api/test',function(req, res) {
	res.send(JSON.stringify({error:'', result:'post successful'}));
});
app.put('/api/test',function(req, res) {
	res.send(JSON.stringify({error:'', result:'put successful'}));
});
app.del('/api/test',function(req, res) {
	res.send(JSON.stringify({error:'', result:'delete successful'}));
});

app.listen(port);
console.log('http://localhost:'+port+'/');

//initialize dnode
var dnode = require('dnode');
var commands =  require('./commands').commands;
var algo = require('./algorithms');
var server = dnode(function(player, conn) {
	// conn.on('ready', function() {
	// });
	conn.on('end', function () {
		if(player.name && players.hasOwnProperty(player.name)) {
			var disconnectText = player.name + ' disconnected';
			console.log(conn.id+': '+disconnectText);
			delete players[player.name];
			for(var p in players) {
				players[p].log(disconnectText);
			}
		}
	});
	this.login = function(name,cb) {
		if(!name.match('^[a-zA-Z0-9]*$')) {
			cb('invalid characters, enter new name');
			return;
		}
		if(name in players) {
			cb(name+' is taken, enter new name');
			return;
		}
		player.name = name;
		var connectionText = player.name+' connected';
		console.log(conn.id+': '+connectionText);
		for(var p in players) {
			players[p].log(connectionText);
		}
		//player.GUID = algo.GUID();
		players[player.name] = player;
		cb();
	};
	this.say = function (text, cb) {
		if(!player.name){ //catch players that haven't logged in
			player.logout();
			return;
		}
		
		if(text.length > 1 && text.indexOf('/') == 0) {
			//command
			var c = algo.parseCommand(text);
			if(c.command in commands)
			{
				commands[c.command](function(result,error){
					if(error){ player.raiseError(error);}
					else { player.log(result);}
				},c.args,players);
			} else {
				player.raiseError('command '+c.command+' not recognized');
			}
		} else {
			//chat
			//text = escape(text);
			for(var p in players) {
				players[p].hear(player.name,text);
			}
		}
	};
	
});
server.listen(app);
// You can pass options through to socket.io with the io parameter:
// dnode(...).listen(webserver, { io : { flashPolicyServer : false } });