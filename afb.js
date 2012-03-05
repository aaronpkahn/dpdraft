var dnode = require('dnode');
//var exec  = require('child_process').exec;
var client = dnode({
	hear	:	function(n,m){
		console.log(m);
		//exec('say1.exe ' + m);
	}	
});

client.connect(6060, function(server, conn) {
	console.log('connected to dpdraft');
	server.login('afb:'+Date.now().toString());
});