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
 * Lobby Schema
 */
var LobbySchema = new Schema({
    // -- Create your schema here
    id: {
        type: Number
    },
    Created: {
        type: Date
    },
    Name: {
        type: String
    },
    lobbyId: {
        type: Number
    }
});

mongoose.model('Lobby', LobbySchema);
