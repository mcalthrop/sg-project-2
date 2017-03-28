var Game = require('../models/game-model');

// Action: index
function indexGames(req, res) {
  Game.find({}, function (err, games) {
    if (err) {
      console.log('Could not get list of games:', err);
      res.status(500).send('Could not get list of games');
      return;
    }
    res.status(200).json(games);
  });
}

// TODO: create other endpoints as required

module.exports = {
  index: indexGames
};
