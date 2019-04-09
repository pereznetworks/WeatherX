// methods for accessing external api, managing data

let mostRecentForecast = {};
let mostRecentLocation = {};

const manageLocData = loc => {
  if (loc){
    // if (current.mostRecentLocation){ // push current forecast onto array
    //   db.locationArray.push(current.mostRecentLocation);
    // }
    mostRecentLocation = {  // save new current foreeast
      timeStamp: Date.now(),
      data: loc
    } // will end up with an array of objects: [{timeStamp:<dateInt>, data:forecast.json}]
    return mostRecentLocation;
  }
}; // will need to replace this with mongoose code also


const manageForecastData = forecast => {

  // requiring custom module for removing unused data from DarkSky
  const reduceForecastDataSet = require('./reduceDataSet.js').reduceForecastDataSet;

  if (forecast){
    // if (current.mostRecentForecast){ // push current forecast onto array
    //   db.forecastArray.push(current.mostRecentForecast);
    // }
    mostRecentForecast = {  // save new current foreeast
      timeStamp: Date.now(),
      data: reduceForecastDataSet(forecast)  // reducing dataset to just the data WeatherX currently uses
    } // will end up with an array of objects: [{timeStamp:<dateInt>, data:forecast.json}]

    return mostRecentForecast;
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

  // input validation done in react app, before req sent
  // could use these for input validation here
  // for complete validation ...
  // would like to parse req.param.locaton for valid city, state, and or zip-codes
  // but would need a valid list of these to compare against
  // also should move these into a regexp library module
  const findEachWord = /[\sA-Za-z]+/g;
  const lookForCommaAtBeginning = /^,(?=[\sA-Za-z])/g;
  const lookForCommaBetween = /,(?=[\sA-Za-z])/g;
  const lookForWords = /[A-Za-z]\w+/g;
  const findNumbers = /[0-9]/g;
  const alphanumberic = /\w+/g;
  const lookforWordAfterComma = /(?<=,)[A-Za-z]\w+/g;
  const lookforZipCode = /^\d+$/g;
  const lookForForeignPostalCode = /([A-Za-z0-9])\w+([\s])\w+/g;
  const countryCode = `US`;  // use this if wanting to set a default foir country code
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
