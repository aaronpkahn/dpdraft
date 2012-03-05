var fs = require('fs');
var cardList = JSON.parse(fs.readFileSync(__dirname+'/public/js/cardList.js', 'utf8'));


var Draft = function(n, p, c, s){
	this.name = n;
	this.players = p;
	this.packs = []; //2 dim array
	
	this.assignPacks = function(packcount, packsize){
		this.packs = []; //clear packs
		makePacks(this.packs, packcount, packsize); //pass packs by reference to be updated by makePacks
		var i = 0;
		for(p in this.players) {
			this.players[p].packs = this.packs.slice(i*packcount, (i+1)*packcount);
			i++;
		}
	};
	this.assignPacks(c, s);
}

function makePacks(packs, packcount, packsize) {
	shuffle(cardList);
	for(var i = 0; i < (cardList.length/packsize)|0; packs[i]=[], i+=1); //create each pack
	for(var i = 0; i < cardList.length-cardList.length%packsize; i+=1) //loop through all the cards
		packs[(i/packsize)|0][i%packsize]=cardList[i]; //assign each card to a pack
}

function shuffle(a){
	for(var j, x, i = a.length; i; j = parseInt(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
}

exports.Draft = Draft;