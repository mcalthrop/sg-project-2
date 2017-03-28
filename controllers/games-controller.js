var Game = require('../models/game-model');

// Action: index
function indexGames(req, res) {
  Game.find({}, function (err, games) {
    if (err) {
      console.log('Could not get list of games:', err);
      // NOTE: when an error occurs, always create an object that looks like this:
      //   { message: 'description of error' }
      // This will enable the client (UI) to display an error message.
      res.status(500).json({ message: 'Could not get list of games' });
      return;
    }
    res.status(200).json(games);
  });
}

// TODO: create other endpoints as required

module.exports = {
  index: indexGames
};
