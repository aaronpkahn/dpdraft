var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

PlayerProvider = function() {
  this.db= new Db('test', new Server('127.0.0.1', '27017', {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


PlayerProvider.prototype.getCollection= function(callback) {
  this.db.collection('players', function(error, player_collection) {
    if( error ) callback(error);
    else callback(null, player_collection);
  });
};

PlayerProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, player_collection) {
      if( error ) callback(error)
      else {
        player_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};


PlayerProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, player_collection) {
      if( error ) callback(error)
      else {
        player_collection.findOne({_id: player_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

PlayerProvider.prototype.save = function(players, callback) {
    this.getCollection(function(error, player_collection) {
      if( error ) callback(error)
      else {
        if( typeof(players.length)=="undefined")
          players = [players];

        for( var i =0;i< players.length;i++ ) {
          player = players[i];
          player.created_at = new Date();
          if( player.comments === undefined ) player.comments = [];
          for(var j =0;j< player.comments.length; j++) {
            player.comments[j].created_at = new Date();
          }
        }

        player_collection.insert(players, function() {
          callback(null, players);
        });
      }
    });
};

exports.PlayerProvider = PlayerProvider;