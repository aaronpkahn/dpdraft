var exec  = require('child_process').exec;

exec('say1.exe what the fucker', function (error, stdout, stderr) {
		console.log(error);
});
	 // exec("echo 'sweet dude'", function (error, stdout, stderr) {
		// console.log(stdout);
	 // });