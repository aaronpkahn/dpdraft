exports.commands = {
	sweet		: function(cb) {
		cb('sweet exectued *sp');
	}
	,draft	: function(cb,args) {
		if(args.length > 0) {
			cb('draft '+args[0]+' created');
		} else {
			cb('','draft command requires a name parameter');
		}
	}
	,pen15	: function(cb,args,players) {
		for(p in players){
			players[p].log('<marquee behavior=scroll direction=right>8====D '+args.join(' ')+'</marquee>');
		}
	}
};