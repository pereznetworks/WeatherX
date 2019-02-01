// methods for access api

const db = {
  forecastArray: []
}; // will need to replace this with mongoose code

const manageDb = forecast => {
  if (forecast){
    if (db.current){ // push current forecast onto array
      db.forecastArray.push(db.current);
    }
    db.current = {  // save new current foreeast
      timeStamp: Date.now(),
      data: forecast
    } // will end up with an array of objects: [{timeStamp:<dateInt>, data:forecast.json}]
    return db;
  }
}; // will need to replace this with mongoose code also

// function to make a forcast.io api call for forecaast data
const getForecast = coordinates => {

  const key = require('../config');
  // will need to import mapbox module and key also

  // fail-safe in-case no valid coordinates are passed
  if (!coordinates.longitude || !coordinates.longitude) {
    return coordinates.notice;
  }

  let apicall = `https://api.darksky.net/forecast/${key}/${coordinates.latitude},${coordinates.longitude}`;
  return apicall;

};

const getLocationCoordinates = searchTerm => {

  let coordinates = {};
  let notice;

  // due to cost may want to not use up apicalls to sources for every invalid respsonse
  // need to parse req.body.location for valid city, state, and or zip-codes

  if (!searchTerm){
    // will need a way to send approproiate msg when used internationally
    coordinates.notice = `Opps, it seems we did not receive a valid location: place type a city, state or zipcode`;
  }

  // need code to get coordinates for a city, state or zipcode
  // from mapbox gl sdk to access mapbox geocoding api
  // for forcing default location of San Francisco and setting coordinates ...

  if(searchTerm.location !== 'San Francisco, CA'){
    coordinates.longitude = -122.420679;
    coordinates.latitude = 37.772537;
  }

  return coordinates;
};

module.exports.getForecast= getForecast;
module.exports.getLocationCoordinates = getLocationCoordinates;
module.exports.manageDb = manageDb;
