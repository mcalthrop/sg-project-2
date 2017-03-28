// TODO: implement seedData()
console.warn('NOTE! This is where you will seed your database.');
console.warn('NOTE! Remember to change Game & Player to your primary & secondary model names... and the comments too!');

var mongoose = require('mongoose');
var Game = require('../models/game-model');
var Player = require('../models/player-model');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2';

function seedData() {
  var player1 = new Player();
  var player2 = new Player();
  var players = [player1, player2];

  player1.name = 'Boris Johnson';
  player1.handle = 'Bozza';
  player2.name = 'Sadiq Khan';
  player2.handle = 'TheMayor';

  Player.create(players, function (err, playersCreated) {
    var game = new Game();

    if (err) {
      console.log('could not create players: err:', err);
      process.exit(1);
    }
    console.log('players created:', playersCreated);
    game.title = 'Monopoly';
    game.genre = 'Fun';
    game.players.push(playersCreated[0]._id);
    game.players.push(playersCreated[1]._id);

    game.save(function (err, gameCreated) {
      if (err) {
        console.log('could not create game with players: err:', err);
        process.exit(1);
      }
      console.log('game created:', gameCreated);
      console.log('seed complete');
      mongoose.connection.close();
      console.log(`disconnected from db ${mongoose.connection.name}`);
    });
  });

}

function initDb() {
  mongoose.connect(MONGODB_URI, {}, function (err) {
    if (err) {
      console.log('could not connect to db: err:', err);
      process.exit(1);
    }
    console.log(`connected to db ${mongoose.connection.name}`);
    Game.remove({}, function(err) {
      if (err) {
        console.log('could not drop Game collection: err:', err);
        process.exit(1);
      }
      console.log('emptied Game collection');
      Player.remove({}, function(err) {
        if (err) {
          console.log('could not drop Player collection: err:', err);
          process.exit(1);
        }
        console.log('emptied Player collection');
        seedData();
      });
    });
  });
}

initDb();
