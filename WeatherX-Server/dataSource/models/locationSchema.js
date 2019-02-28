/* define forecast.io 'current forecast' schema */

'use strict';
// importing mongoose.Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// may use Validator.js to validate data if needed
// require('validator')

/* tomtom geocoded location from
    _id (ObjectId, auto-generated)
    timestamp (Date, defaults to “now”)
    data (ofMixed, entire location object data)
           will try this 'blob' data model method first
           befofe actuall detailing out all the data fields and types
*/

module.exports = new Schema({
  id:  mongoose.Schema.Types.ObjectId,
  timestamp: {
        type: Date,
        default: Date.now
       },
  locationData: {
        any: Schema.Types.Mixed
       }
});
