var mongoose = require('mongoose');
mongoose.model('Player', {
	name	: {type: String}
	, ip	: {type: String}
});

exports.Player = function(db) {
	return db.model('Player');
};