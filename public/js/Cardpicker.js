var fs = require('fs');
var cardList = JSON.parse(fs.readFileSync(__dirname+'/cardList.js', 'utf8'));
//console.log(cardList);

//var cardList = require('./cardList.js');
var numberplayers = 1;//prompt("please enter number of players","8");
var colorList = ["R","G","B","U","W","L","M","A"];
var draftstack = new Array();



// determine number of cards for each color
var nocardspercolor = numberplayers*6;

//iterate through colors
var x;
for (x in colorList) {
	var activecolor = colorList[x]
	//select all cards of the active color
	
	var colorbucket = new Array();
	var z, i;
	for (z in cardList) {
		if(cardList[z].Color === activecolor){
			colorbucket.splice(0,0,cardList[z]);
		}
	};
	//randomly select appropriate number of cards from bucket
	for (i=0; i<nocardspercolor; i++) {
		var randomnumber=Math.floor(Math.random()*colorbucket.length);
	//add selected card to the draft pool
		draftstack.push(colorbucket[randomnumber]);
	//remove selected card from bucket
		colorbucket.splice([randomnumber],1);
		};
};

console.log(draftstack);
		
		