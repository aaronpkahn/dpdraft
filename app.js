var express = require('express');
var util = require('util');
//var mongoose = require('mongoose');
var PlayerProvider = require('./models/PlayerProvider').PlayerProvider;
var playerProvider = new PlayerProvider();
var exec  = require('child_process').exec;
//var db = mongoose.connect('mongodb://localhost:27017');
//var Schema = mongoose.Schema;

var app = express.createServer();
app.configure(function() {
   app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	//app.set('view options', {layout:false});
	app.register('.html', require('jqtpl').express);
	app.use('/public',express.static(__dirname + '/public'));
   app.use('/public/js',express.static(__dirname + '/public/js'));
   app.use('/public/images',express.static(__dirname + '/public/images'));
   app.use('/public/css',express.static(__dirname + '/public/css'));
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(express.bodyParser()); //needed for posts
	//app.use(express.methodOverride()); //needed for puts
	app.use(app.router); //must be called after bodyParser for post body
});

app.get('/', function(req, res) {
	console.log('trying to say what the fucker');
	res.render('login');
});

app.post('/', function(req, res) {
	playerProvider.save(
		{name: req.body.name, ip: req.connection.remoteAddress},
		function(error, docs) {
			if(error != null){
				res.render('login',{errormsg:error.msg});
			} else {
				res.redirect('/public/pubnubtest.html');
			}
		}
	);
});

app.get('/getPlayers', function(req, res){
	playerProvider.findAll(function(error, docs){
		res.render('players', {'players':docs});
	});
});

function loadUser(req, res, next){
	if(req.params.id > 2){
		next();
	} else {
		next(new Error('Failed to load user:' + req.params.id));
	}
}

var myMsg = {'msg':'awesome'};

app.get('/draftlogin/:id', loadUser, function(req, res){
	res.send(__dirname+'you are in batman:'+req.params.id);
});

app.post('/testpost', function(req,res){
	res.send(util.inspect(req,false));
});

app.post('/testajax', function(req,res){
	//console.log(util.inspect(req.body,false));
	var bodyofreq = req.body;
	bodyofreq.user.email = 'akahn@test.com';
	res.send(req.body);
});

if(!module.parent) { //for testing
	app.listen(80);
}
console.log('Express server started on port %s', app.address().port);
