var express = require('express');
var util = require('util');
var PlayerProvider = require('./models/PlayerProvider').PlayerProvider;
var playerProvider = new PlayerProvider();

var app = express.createServer();
//TODO: add 'development' and 'production' environment app.configure
app.configure(function() {
   //setup jqtpl views layout.html used by default
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.register('.html', require('jqtpl').express);
	
	//add static files route
	app.use('/public', express.static(__dirname + '/public/'));
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(express.bodyParser()); //needed for standard body posts
	//app.use(express.methodOverride()); //needed for puts
	app.use(app.router); //optional, but must be called last
});

app.get('/', function(req, res) {
	res.render('login');
});

app.post('/', function(req, res) {
	playerProvider.save(
		{name: req.body.name, ip: req.connection.remoteAddress},
		function(error, docs) {
			console.log('made it past save');
			// if(error != null){
				// res.render('login',{errormsg:error.msg});
			// } else {
				// res.redirect('/getPlayers');
			// }
		}
	);
});

app.get('/getPlayers', function(req, res){
	playerProvider.findAll(function(error, docs){
		res.render('players', {'players':docs});
	});
});

if(!module.parent) { //for testing
	app.listen(80);
}
console.log('dpdraft up and running on port %s', app.address().port);

/*function loadUser(req, res, next){
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
*/
