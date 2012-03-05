var fs = require('fs');
var http = require('http');
//var request = require('request');
//var url = require('url');

var cardList = JSON.parse(fs.readFileSync(__dirname+'/public/js/cardList.js', 'utf8'));
var cardsWithNoId = cardList.filter(function(value, index, array) {
	return !value.hasOwnProperty('multiverseId');
});
var host = 'gatherer.wizards.com';
//var path = '/Pages/Search/Default.aspx?name=';//+[chaos]+[orb]'
var args = process.argv;

if(args.length > 2)
{
	switch(args[2]) {
		case 'test':
			var test = [{"Name":"Broodmate Dragon","Color":"M","Type":"Creature ? Dragon","Cost":"3BRG"}];
			getcard(0, test);
			break;
		case 'getcards':
			getcard(0, cardsWithNoId)
			break;
		case 'stripcrap':
			cardList.forEach(function(value, index, array) {
				value.Name = value.Name.replace(/\([0-9]\)/g,'').replace(/\s+$/,'');
			});
			savecards();
			break;
		case 'showmissing':
			cardsWithNoId.forEach(function(value, index, array) {
				console.log(value);
				console.log('/Pages/Search/Default.aspx?name=+['+value.Name.replace(/\s+/g,']+[')+']&mana=+=['+value.Cost+']&color=+['+value.Color+']');
			});
			break;
		default: console.log('invalid arg');
	} 
} else {
	console.log('must enter an argument');
}

function savecards() {
	fs.writeFileSync(__dirname+'/public/js/cardList'+Date.now().toString()+'.js', JSON.stringify(cardList));
}
//&name=+[knight]&mana=+~[W]&color=+[W]
function getcard(i, cards){
	if(i >= cards.length){//cards.length
		savecards();
		return;
	}
	var path = '/Pages/Search/Default.aspx?name=+['+cards[i].Name.replace(/\s+/g,']+[')+']&mana=+=['+cards[i].Cost+']&color=+['+cards[i].Color+']';
	console.log(host+path);
	http.get({host: host, port: 80, path: path}, function(res) {
		if(res.statusCode == 302) {
			var location = res.headers.location;
			var startOfId = location.indexOf('multiverseid=');
			if(startOfId > 0){
				cards[i].multiverseId = parseInt(location.substring(startOfId+13,location.length));
				console.log(cards[i].Name+' : '+cards[i].multiverseId);
			} else {
				console.log(path+' not found');
			}
		} else {
			console.log(path+' not found');
		}
		setTimeout(function() { //chill so wotc doesn't get pissed
			getcard(i+1, cards);
		}, Math.floor(Math.random()*1000));
	}).on('error', function(e) {
		console.log("error: "+e.message);
		savecards();
	});
}


//cards.forEach(function(card) {
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
	
