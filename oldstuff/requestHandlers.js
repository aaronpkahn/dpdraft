var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var util = require("util");
var draft = require("./draft").draft;
var counter = 0;

function share(request, response) {
	counter += 1;
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("test"+counter);
    response.end();
}

function start(request, response) {
console.log("Request handler 'start' was called.");
var body = '<!doctype html>'+
	'<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="imageUp">'+
	//'<textarea name="taText" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function dirLoad(request, response) {
  console.log("Request handler 'start' was called.");
  var content = "empty";

  exec("dir", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });

  return content;
}

function upload(request, response) {
  console.log("Request handler 'upload' was called.");
  
   var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    
	fs.renameSync(files.imageUp.path, "./Temp/test1.jpg");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(request, response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./Temp/test1.jpg", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

function joinDraft(request, response) {
	draft.joinDraft(request, response);
}

exports.joinDraft = joinDraft;
exports.share = share;
exports.dirLoad = dirLoad;
exports.start = start;
exports.upload = upload;
exports.show = show;