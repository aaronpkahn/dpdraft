var cardList = require("./public/js/cardList.js").cardList;

var draft = function(n, p, s, c){
	this.name = n;
	this.players = p;
	this.packs = [];
	//assign packs
	this.assignpacks = function(packsize,packcount){
		//makePacks(//TODO: aaron you are here
		for(k in this.players) {
			this.players.packs = [];
			for(var i = 0; i < packcount; i+=1) {
				this.player.packs.push(
				for(var j = 0; j < packsize; j+=1)
				{
					var card = this.packs[i*playercount][j];
				}
			}
		}
	};
	this.assignpacks(s,c);
}

function makePacks(packs) {
	shuffle(cardList);
	for(var i = 0; i < (cardList.length/packsize)|0; packs[i]=[], i+=1);
	for(var i = 0; i < cardList.length-cardList.length%packsize; i+=1)
		packs[(i/packsize)|0][i%packsize]=cardList[i];
}

function shuffle(a){
	for(var j, x, i = a.length; i; j = parseInt(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
}

exports.draft = draft;