// methods for access api

const current = {
  mostRecentForecast: {},
  mostRecentLocation: {}
}
const db = {
  locationArray: [],
  forecastArray: []
}; // will need to replace this with mongoose code

const manageLocData = loc => {
  if (loc){
    if (current.mostRecentLocation){ // push current forecast onto array
      db.locationArray.push(current.mostRecentLocation);
    }
    current.mostRecentLocation = {  // save new current foreeast
      timeStamp: Date.now(),
      data: loc
    } // will end up with an array of objects: [{timeStamp:<dateInt>, data:forecast.json}]
    return current;
  }
}; // will need to replace this with mongoose code also


const manageForecastData = forecast => {
  if (forecast){
    if (current.mostRecentForecast){ // push current forecast onto array
      db.forecastArray.push(current.mostRecentForecast);
    }
    current.mostRecentForecast = {  // save new current foreeast
      timeStamp: Date.now(),
      data: forecast
    } // will end up with an array of objects: [{timeStamp:<dateInt>, data:forecast.json}]
    return current;
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

  const geoCodeKey = require('../config').geoCodeKey;
  let searchTermArray;
  let coordinates = {};

  // due to cost may want to not use up apicalls to sources for every invalid respsonse
  // need to parse req.param.locaton for valid city, state, and or zip-codes
  // TomTom's STRUCTURED geocode search is an option
  const findEachWord = /[\sA-Za-z]+/g;
  const lookForCommaAtBeginning = /^,(?=[\sA-Za-z])/g;
  const lookForCommaBetween = /,(?=[\sA-Za-z])/g;
  const lookForWords = /[A-Za-z]\w+/g;
  const findNumbers = /[0-9]/g;
  const alphanumberic = /\w+/g;
  const lookforWordAfterComma = /(?<=,)[A-Za-z]\w+/g;
  const lookforZipCode = /^\d+$/g;
  const lookForForeignPostalCode = /([A-Za-z0-9])\w+([\s])\w+/g;
  const countryCode = `US`;  // setting default
  //const cityName;

  // using TomTom unstructed geocode search, just make sure searchTerm isn't blank
  if (!searchTerm){
    coordinates.notice = `Opps`;
  } else {
    return `https://api.tomtom.com/search/2/geocode/${searchTerm}.json?limit=1&key=${geoCodeKey}`
  }

  // uncomment below for testing only
  // if(searchTerm.location !== 'San Francisco, CA'){
  //   coordinates.longitude = -122.420679;
  //   coordinates.latitude = 37.772537;
  // }
  // return coordinates;
};

module.exports.getForecastApiCall= getForecastApiCall;
module.exports.getGeoCodeApiCall = getGeoCodeApiCall;
module.exports.manageForecastData = manageForecastData;
module.exports.manageLocData = manageLocData;
