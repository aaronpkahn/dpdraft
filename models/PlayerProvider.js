var GUID = require('./Algorithms.js').GUID;

PlayerProvider = function(){};
PlayerProvider.prototype.dummyData = [];

PlayerProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

PlayerProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

PlayerProvider.prototype.findByName = function(name) {
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i].name == name ) {
      return this.dummyData[i];
    }
  }
  return null
};

PlayerProvider.prototype.save = function(Players, callback) {
  var Player = null;
  var error = null;
  if( typeof(Players.length)=="undefined")
    Players = [Players];
  
  for( var i =0;i< Players.length;i++ ) {
    Player = Players[i];
	 
    if(this.findByName(Player.name) != null){
		error = {msg:'This name is already taken'};
	 } else {
		Player._id = GUID(); //TODO: Fix GUID generation
		Player.created = new Date();
		this.dummyData[this.dummyData.length]= Player;
	 }
 
    // if( Player.comments === undefined )
    // 	Player.comments = [];
		// for(var j =0;j< Player.comments.length; j++) {
      // Player.comments[j].created_at = new Date();
    // }
  }
  callback(error, Players);
};

/* dummy data */
/*
new PlayerProvider().save([
  {name: 'Jimmy', ip: 'testip1', drafts: ['one','two']},
  {name: 'Bob', ip: 'testip2'},
  {name: 'Penismightier', ip: 'testip3'}
], function(error, Players){});
*/
exports.PlayerProvider = PlayerProvider;