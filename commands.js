exports.commands = {
	sweet		: function(cb) {
		cb('sweet exectued *sp');
	}
	,draft	: function(cb,args) {
		if(args.length > 0) {
			cb('draft '+args[0]+' created');
		} else {
			cb('','draft command requires a name argument');
		}
	}
	,pen15	: function(cb,args,players) {
		for(p in players){
			players[p].log('<marquee behavior=scroll direction=right>8====D '+args.join(' ')+'</marquee>');
		}
	}
	,dong		: function(cb,args,players) {
		for(p in players) {
			players[p].log('<pre>'+args.join(' ')+'<br>      ___<br>     //  7<br>    (_,_/\\<br>     \\    \\<br>      \\    \\<br>      _\\    \\__<br>     (   \\     )<br>      \\___\\___/</pre>');
		}
	}
	,list		: function(cb,args,players) {
		if(args.length > 0) {
			switch(args[0]){
				case 'players':
					var playerList = [];
					for(p in players) playerList.push(players[p].name);
					cb(playerList.join(', '));
					break;
				default:
					cb('','list argument '+args[0]+' not recognized');
			}
		} else {
			cb('','list requires object name arguement');
		}
	}
};