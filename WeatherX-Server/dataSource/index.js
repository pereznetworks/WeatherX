// following module pattern ...
// so this ends up being a 'package' of dataSource modules =)

// importing methods that access forecast.io and mapbox geocoding api
const getForecastApiCall = require('./forecast').getForecastApiCall;
const getGeoCodeApiCall = require('./forecast').getGeoCodeApiCall;
const getLocationCoordinates = require('./forecast').getLocationCoordinates;
const manageForecastData = require('./forecast').manageForecastData;
const manageLocData = require('./forecast').manageLocData;

// exporting methods that access forecast.io and mapbox geocoding api
module.exports.getForecastApiCall= getForecastApiCall;
module.exports.getGeoCodeApiCall = getGeoCodeApiCall;
module.exports.manageLocData = manageLocData;
module.exports.manageForecastData = manageForecastData;
