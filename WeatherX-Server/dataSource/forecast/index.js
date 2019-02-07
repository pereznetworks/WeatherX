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
const getForecastApiCall = coordinates => {

  const key = require('../config').forecastKey;
  // will need to import mapbox module and key also

  // fail-safe in-case no valid coordinates are passed
  if (!coordinates.latitude || !coordinates.longitude) {
    return coordinates.notice;
  }

  let apicall = `https://api.darksky.net/forecast/${key}/${coordinates.latitude},${coordinates.longitude}`;
  return apicall;

};

const getGeoCodeApiCall = searchTerm => {

  const key = require('../config').geoCodeKey;
  let searchTermArray;
  let coordinates = {};

  // due to cost may want to not use up apicalls to sources for every invalid respsonse
  // need to parse req.param.locaton for valid city, state, and or zip-codes
  // ONLY IF using TomTom's structured geocode search
  let lookForCommaBetween = /,(?=[\sA-Za-z])/g;
  let lookForWords = /[A-Za-z]\w+/g;
  let alphanumberic = /\w+/g;
  let lookforCountry = /(?<=,)[A-Za-z]\w+/g;
  let lookforZipCode = /^\d+$/g;
  let lookForForeignPostalCode = /([A-Za-z0-9])\w+([\s])\w+/g;
  let countryCode = `US`;  // setting default
  let cityName;

  // using TomTom unstructed geocode search, just make sure searchTerm isn't blank
  if (!searchTerm){
    coordinates.notice = `Opps`;
  } else {
    return `https://api.tomtom.com/search/2/geocode/${searchTerm}.json?storedResult=false&key=${geoCodeKey}`
  }

  // uncomment below for testing only
  // if(searchTerm.location !== 'San Francisco, CA'){
  //   coordinates.longitude = -122.420679;
  //   coordinates.latitude = 37.772537;
  // }
  // return coordinates;



};

module.exports.getForecast= getForecastApiCall;
module.exports.getLocationCoordinates = getGeoCodeApiCall;
module.exports.manageDb = manageDb;
