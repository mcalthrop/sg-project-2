var express = require('express');
var router = express.Router();
var gamesController = require('../controllers/games-controller');

router.get('/games', gamesController.index);
// TODO: fill in other routes as required

module.exports = router;
