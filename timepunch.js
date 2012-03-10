// initialize express
var port = 80;
var express = require('express');
var app = express.createServer();
app.configure(function () {
	app.use('/public', express.static(__dirname + '/public/timepunch/'));
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/timepunch/timepunch.html');
});
app.get('/timepunch.manifest', function(req, res) {
	res.header('Content-Type', 'text/cache-manifest');
	res.sendfile('./timepunch.manifest');
});
app.listen(port);
console.log('http://localhost:'+port+'/');