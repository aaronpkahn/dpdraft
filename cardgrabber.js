var request = require('request');
var fs = require('fs');
var url = require('url');

request({
	url:'http://www.wizards.com/magic/autocard.asp?name=Chaos+Orb'
	,followRedirect: false
}, function (error, response, body) {
  console.log(response.statusCode);
  console.log(response.request);
  if (!error && response.statusCode == 200) {
   request('http://gatherer.wizards.com/Handlers/Image.ashx?'+response.request.uri.query+'&type=card').pipe(fs.createWriteStream('./public/images/cards/Chaos Orb.jpg'));
  }
});
