var fs = require('fs');
var http = require('http');
//var request = require('request');
//var url = require('url');

var cardList = JSON.parse(fs.readFileSync(__dirname+'/public/js/cardList.js', 'utf8'));

var host = 'gatherer.wizards.com';
var path = '/Pages/Search/Default.aspx?name=';//+[chaos]+[orb]'
var i = 0;

function savecards() {
	fs.writeFileSync(__dirname+'/public/js/cardList'+Date.now().toString()+'.js', JSON.stringify(cardList));
}
//&name=+[knight]&mana=+~[W]&color=+[W]
function getcard(i){
	if(i >= cardList.length){//cardList.length
		savecards();
		return;
	}
	var path = '/Pages/Search/Default.aspx?name=+['+cardList[i].Name.replace(/\s+/g,']+[')+']&mana=+=['+cardList[i].Cost+']&color=+['+cardList[i].Color+']';
	http.get({host: host, port: 80, path: path}, function(res) {
		if(res.statusCode == 302) {
			var location = res.headers.location;
			var startOfId = location.indexOf('multiverseid=');
			if(startOfId > 0){
				cardList[i].multiverseId = parseInt(location.substring(startOfId+13,location.length));
				console.log(cardList[i].Name+' : '+cardList[i].multiverseId);
			} else {
				console.log(path+' not found');
			}
		} else {
			console.log(path+' not found');
		}
		setTimeout(function() {
			getcard(i+1);
		}, Math.floor(Math.random()*1000));
	}).on('error', function(e) {
		console.log("error: "+e.message);
		savecards();
	});
}
getcard(i);


//cardList.forEach(function(card) {
//	console.log('/Pages/Search/Default.aspx?name=+['+card.Name.replace(/\s+/g,']+[')+']');
//});

// var host = 'www.wizards.com';
// var path = '/magic/autocard.asp?name=Chaos+Orb'

// request({
	// url:'http://gatherer.wizards.com/Pages/Search/Default.aspx?name=+[chaos]+[orb]'
	// ,followRedirect: false
// }, function (error, response, body) {
  // console.log(response.headers.location);
  // //console.log(response.request);
  // // if (!error && response.statusCode == 200) {
   // // request('http://gatherer.wizards.com/Handlers/Image.ashx?'+response.request.uri.query+'&type=card').pipe(fs.createWriteStream('./public/images/cards/Chaos Orb.jpg'));
  // // }
// });

	// res.on('data', function(chunk) {
			// console.log('BODY: ' + chunk);
		// });
	
