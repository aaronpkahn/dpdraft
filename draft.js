var fs = require('fs');
var cardList = JSON.parse(fs.readFileSync(__dirname+'/public/js/cardList.js', 'utf8'));

var Draft = function(n, p, c, s){
	this.name = n;
	this.players = p; //TODO: randomize player array
	this.packs = []; //2 dim array
	
	this.assignPacks = function(packsPerPlayer, packsize){
		this.packs = makePacks(packsPerPlayer*this.players.length, packsize); //pass packs by reference to be updated by makePacks
		for(var i = 0; i<this.players.length; i++) {
			this.players[i].packs = this.packs.slice(i*packsPerPlayer, (i+1)*packsPerPlayer);
		}
	};
	this.assignPacks(c, s);
}

function makePacks(packcount, packsize) {
	var draftStack = [];
	var packs = [];
	var colorBuckets = {};
	//setup bucket for each color
	for (var x in cardList) {
		if(cardList[x].Color in colorBuckets) {
			colorBuckets[cardList[x].Color].push(cardList[x]); //add card to bucket
		} else {
		 	colorBuckets[cardList[x].Color] = [cardList[x]]; //initialize bucket to new array with card
		}
	}	
	//TODO: add check for too many players
	//TODO: fix divide by 0 error if no colors
	var cardsPerColor = Math.ceil((packcount*packsize)/Object.keys(colorBuckets).length);
	//randomly select appropriate number of cards from each bucket
	var i;
	for (var j in colorBuckets) {
		for (i=0; i<cardsPerColor; i++) {
			var randomNumber=Math.floor(Math.random()*colorBuckets[j].length);
			//add selected card to the draft pool
			draftStack.push(colorBuckets[j][randomNumber]);
			//remove selected card from bucket
			colorBuckets[j].splice([randomNumber],1);
		}
	}
	
	//shuffle up and assign packs (no five piling allowed - gert)
	shuffle(draftStack);
	for(i = 0; i < (draftStack.length/packsize)|0; packs[i]=[], i+=1); //create each pack
	for(i = 0; i < draftStack.length-draftStack.length%packsize; i+=1) //loop through all the cards
		packs[(i/packsize)|0][i%packsize]=draftStack[i]; //assign each card to a pack
	return packs;
}

function shuffle(a){
	for(var j, x, i = a.length; i; j = parseInt(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
}

exports.Draft = Draft;

