/* import schemas and declare models */

'use strict';
// importing mongoose
var mongoose = require("mongoose");

// importing schema
var forecastSchema = require('./forecastSchema.js');

// creating a model
const NewForecast = mongoose.model('newForecast', forecastSchema);
const NewLocation = mongoose.model('newLocation', forecastSchema);

// exporting the models
module.exports.course = NewForecast;
module.exports.course = NewLocation;
