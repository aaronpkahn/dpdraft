function route(handle, pathname, request, response) {
	//console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](request, response);
	} else {
		if (pathname !== '/favicon.ico') console.log("no function support" + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;