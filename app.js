var express = require('express');
var util = require('util');

var app = express.createServer();
app.configure(function() {
	app.use('/public',express.static(__dirname + '/public'));
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(express.bodyParser());
});
// app.use(express.bodyParser());
// app.post('/', function(req, res){
	// res.send(req.body);
// }

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

app.listen(80);

console.log('Express server started on port %s', app.address().port);
