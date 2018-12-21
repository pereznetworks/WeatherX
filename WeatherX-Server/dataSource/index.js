//following module pattern ...
// do this ends up being a 'package' of dataSource modules =)

// importing methods that access forecast.io and mapbox geocoding api
const getForecast = require('./forecast').getForecast;
const getLocationCoordinates = require('./forecast').getLocationCoordinates;
const manageDb = require('./forecast').manageDb;

// my own modular mongoose connection method and callbacks
const connect = require('./mongoClient').connect;
const onErr = require('./mongoClient').onErr;
const onceConnected = require('./mongoClient').onceConnected;

// importing my own modular mongoose connection methods
const runFindQuery = require('./mongoDocumentMethods').runFindQuery;
const createNew = require('./mongoDocumentMethods').createNew;
const updateDoc = require('./mongoDocumentMethods').updateDoc;

// exporting methods that access forecast.io and mapbox geocoding api
module.exports.getForecast= getForecast;
module.exports.getLocationCoordinates = getLocationCoordinates;
module.exports.manageDb = manageDb;

// exporting my custom mongoose client connection methods
module.exports.connect = connect;
module.exports.onErr = onErr;
module.exports.onceConnected = onceConnected;

// exporting my own modular mongoose connection methods
module.exports.runFindQuery = runFindQuery;
module.exports.createNew = createNew;
module.exports.updateDoc = updateDoc;
