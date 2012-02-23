var algo = require('./algorithms.js');

 var Draft = require('./draft.js').Draft;

var players = [{name:'jim'},{name:'tom'},{name:'bob'}];
var draft = new Draft('drafttest', players, 3, 14);

// check out one player
//console.log(draft.players[0]
for(p in draft.players[1].packs){
	var pack = draft.players[1].packs[p];
	console.log('pack '+p);
	for(c in pack) {
	//	console.log(pack[c]); //print card
	}
}
// console.log(draft.players);

// var strang = '/ok sweet dude';
// console.log(algo.parseCommand(strang));
//<div style="position:absolute; top:1px; left:1px; background-color:black; color:white; width:100px; height:100px;">html hacks</div>
