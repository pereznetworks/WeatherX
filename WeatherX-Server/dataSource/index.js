// following module pattern ...
// so this ends up being a 'package' of dataSource modules =)

// importing methods that access forecast.io and mapbox geocoding api
const getForecastApiCall = require('./forecast').getForecastApiCall;
const getGeoCodeApiCall = require('./forecast').getGeoCodeApiCall;
const getLocationCoordinates = require('./forecast').getLocationCoordinates;
const manageForecastData = require('./forecast').manageForecastData;
const manageLocData = require('./forecast').manageLocData;

// my own modular mongoose connection method and callbacks
const connect = require('./mongoClient').connect;
const onErr = require('./mongoClient').onErr;
const onceConnected = require('./mongoClient').onceConnected;

// importing my own modular mongoose connection methods
const runFindQuery = require('./mongooseDocumentMethods').runFindQuery;
const createNew = require('./mongooseDocumentMethods').createNew;
const updateDoc = require('./mongooseDocumentMethods').updateDoc;

// exporting methods that access forecast.io and mapbox geocoding api
module.exports.getForecastApiCall= getForecastApiCall;
module.exports.getGeoCodeApiCall = getGeoCodeApiCall;
module.exports.manageLocData = manageLocData;
module.exports.manageForecastData = manageForecastData;

// exporting my custom mongoose client connection methods
module.exports.connect = connect;
module.exports.onErr = onErr;
module.exports.onceConnected = onceConnected;

// exporting my own modular mongoose connection methods
module.exports.runFindQuery = runFindQuery;
module.exports.createNew = createNew;
module.exports.updateDoc = updateDoc;
