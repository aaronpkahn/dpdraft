var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
	fs = require('fs');

http.createServer(function(req, res) {
		var newO = {
		a:	[], 
		b: 	"cool",
		c:	function(){
				//console.log(typeof this.a['127.0.0.1']);
				var ip = req.connection.remoteAddress;
				this.a[ip] = true;
				if(typeof this.a[ip] === 'undefined' || this.a[ip] === null)
				return ("missing(worked)");
				else 
				return (this.a[ip]);
				// {
					// this.a["1"] = "tite";
					// console.log(this.a["1"]);
				// } else
				// {
					// console.log("null");
				// }
				
				}
		};
	
	res.writeHead(200, {'content-type': 'text/plain'});
	res.end("ip: "+newO.c()+" "+req.connection.remoteAddress);
	//res.end(util.inspect(req));
}).listen(8888);



// http.createServer(function(req, res) {
  
  // if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // // parse a file upload
    // var form = new formidable.IncomingForm();
    // form.parse(req, function(err, fields, files) {
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
	  // res.write(files.upload.path+'\n');
	  // fs.renameSync(files.upload.path, '/Temp/tester.jpg');
      // res.end(util.inspect({fields: fields, files: files}));
    // });
    // return;
  // }

  // // show a file upload form
  // res.writeHead(200, {'content-type': 'text/html'});
  // res.end(
    // '<form action="/upload" enctype="multipart/form-data" '+
    // 'method="post">'+
    // '<input type="text" name="title"><br>'+
    // '<input type="file" name="upload" multiple="multiple"><br>'+
    // '<input type="submit" value="Upload">'+
    // '</form>'
  // );
// }).listen(8888);

console.log('server up');