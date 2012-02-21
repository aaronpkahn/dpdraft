var server = require("./server");
var router = require("./router");
var rH = require("./requestHandlers");

var handle = {}
handle["/"] = rH.start;
handle["/start"] = rH.start;
handle["/upload"] = rH.upload;
handle["/dirLoad"] = rH.dirLoad;
handle["/show"] = rH.show;
handle["/share"] = rH.share;
handle["/joindraft"] = rH.joinDraft;

server.start(router.route, handle);