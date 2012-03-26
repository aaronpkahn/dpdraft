//TODO: use event emitters for all player broadcasting
//TODO: change all for in loops to forEach Ex.:
	// Object.keys(myobject).forEach(function(key){
	  // myobject[key];
	// });
var algo = require('./algorithms');
var Draft = require('./draft').Draft;

exports.commands = {
	sweet		: function(cb) {
		cb('sweet exectued *sp');
	}
	,draft	: function(cb,args,players) {
		if(args.length > 0) {
			cb('draft '+args[0]+' created for '+Object.keys(players).length+' players');
			var draft1 = new Draft(args[0], players, 3, 14);
			for(var p in players){
				players[p].receivePacks(draft1.players[p].packs);
			}
		} else {
			cb('','draft command requires a name argument');
		}
	}
	,pen15	: function(cb,args,players) {
		for(var p in players){
			players[p].log('<marquee behavior=scroll direction=right>8====D '+args.join(' ')+'</marquee>');
		}
	}
	,dong		: function(cb,args,players) {
		for(var p in players) {
			players[p].log('<pre>'+args.join(' ')+'<br>      ___<br>     //  7<br>    (_,_/\\<br>     \\    \\<br>      \\    \\<br>      _\\    \\__<br>     (   \\     )<br>      \\___\\___/</pre>');
		}
	}
	,tron		: function(cb,args,players) {
		for(var p in players) {
			players[p].tron();
		}
	}
	,list		: function(cb,args,players) {
		if(args.length > 0) {
			switch(args[0]){
				case 'players':
					var playerList = [];
					for(var p in players) playerList.push(players[p].name);
					cb(playerList.join(', '));
					break;
				default:
					cb('','list argument '+args[0]+' not recognized');
			}
		} else {
			cb('','list requires object name argument');
		}
	}
	,kick		: function(cb,args,players) {
		if(args.length > 1 
		&& args[0] && args[0] in players 
		&& algo.SHA1(args[1]) == '1f7d9766cbcb5f42e41784c98cb05c14401b4b19'){
			players[args[0]].logout();
			delete players[args[0]];
			cb('gtfo '+args[0]+' you just got kicked');
		} else {
			cb('','kick requires playername and password');
		}
	}
};
