var cardList = require("./public/js/cardList.js").cardList;
var packsize = 14;
var packcount = 3;

var draft = {
	players: [],
	packs: [],
	joinDraft: function(request, response) {
		var playercount = this.players.length;
		if(playercount === 0)
		{
			makePacks(this.packs);
		}
		var ip = request.connection.remoteAddress;
		if(typeof this.players[ip] === 'undefined' 
			|| this.players[ip] === null)
		{
			this.players[ip] = this.players.length;
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("Welcome to the draft, may i call you: "+ip+"\n\n");
			response.write("\tName\tColor\tType\tCost\n");
			for(var i = 0; i < packcount; i+=1)
				for(var j = 0; j < packsize; j+=1)
				{
					var card = this.packs[i*playercount][j];
				//for(card in this.packs[i*playercount])
					response.write("\t"+card.Name+"\t"+card.Color+"\t"+card.Type+"\t"+card.Cost+"\n");
				}
			response.end();
		} else
		{
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.end("You have already joined the draft !");
		}	
	}
};

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