/* import schemas and declare models */

'use strict';
// importing mongoose
var mongoose = require("mongoose");

// importing schema
var currentForecastSchema = require('./currentForecastSchema.js');

// creating a model
const CurrentForecast = mongoose.model('currentForecast', currentForecastSchema);

// exporting the models
module.exports.course = CurrentForecast;
