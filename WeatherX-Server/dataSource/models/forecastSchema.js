/* define forecast.io 'current forecast' schema */

'use strict';
// importing mongoose.Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// may use Validator.js to validate data if needed
// require('validator')

/* forecast.io current forecast response.json schema
    _id (ObjectId, auto-generated)
    timestamp (Date, defaults to “now”)
    data (ofMixed, entire current forcast.io response in json format)
           forecast.io json is a nested json with all kinds of different data types...
           will try this 'blob' data model method first
*/

module.exports = new Schema({
  id:  mongoose.Schema.Types.ObjectId,
  timestamp: {
        type: Date
       },
  forecastData: {
        any: Schema.Types.Mixed
       }
});
