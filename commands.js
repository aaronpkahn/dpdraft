exports.commands = {
	draft		: function(args,cb) {
		if(args.length > 0) {
			cb('draft '+args[0]+' created');
		} else {
			cb('','draft command requires a name parameter');
		}
	}
	, sweet	: function(args,cb) {
		cb('sweet exectued');
	}
};