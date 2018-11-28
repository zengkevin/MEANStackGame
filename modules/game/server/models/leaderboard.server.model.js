'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * Leaderboard Schema
 */
var LeaderboardSchema = new Schema({
    // -- Create your schema here
    username: {
      type: String
    },
    picture: {
      type: String
    },
    gamespl: {
      type: Number
    },
    wins: {
      type: Number
    },
    losses: {
      type: Number
    },
    draws: {
      type: Number
    }
});

mongoose.model('Leaderboard', LeaderboardSchema);
