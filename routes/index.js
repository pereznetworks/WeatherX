const express = require('express');
const axios = require('axios');
const main = express.Router();


// api keys
const apiKeys = {
  forecastKey:  process.env.FORECAST_KEY,
  geoCodeKey: process.env.GEOCODE_KEY
}

// importing sequelize, db and models
const sequelizeDb = require('../data/models');


// importing methods that access forecast.io and mapbox geocoding api
const getForecastApiCall = require('../dataSource').getForecastApiCall;
const getGeoCodeApiCall = require('../dataSource').getGeoCodeApiCall;
const manageForecastData = require('../dataSource').manageForecastData;
const manageLocData = require('../dataSource').manageLocData;

// importing newForecastData document based on mongoose model
const newForecastData = require('../dataSource').newForecastData;
const newLocationData = require('../dataSource').newLocationData;

// importing utils for time and temp
const timeDate = require('../dataSource').timeDate;
const convertTemp = require('../dataSource').convertTemp;
const setBackground = require('../dataSource').setBackground;

// locals to pass to pug templates to be rendered with the view
const locals = {
  searchResults: {
    forecast: false,
    initialView: require('../views/initialView/locals.js').homePg,
    locationBar: require(`../views/locationBarView/locals.js`).locationBar,
    mainView: require('../views/mainView/locals.js').mainView,
    arrayLength: 0,  // how many locationBars are there
    currentIndex: 0, // for use when creating another locationBar and mainView
    arrayIndexNo: 0, // for use when views rendered, which location is selected
    locationBarArray: [], // store and track data for locationBars,
    mainViewArray:[], // store and track data for mainViews, index and length should match locationBarArray
    forecastData: [],
    locationData: [],
    locationName: [],
    locationCount: 0,
    currentLocationData: {},
    availLocationsArray: [],
    mainViewBackGround: [],
    locationBarBackGround: []
  }
}

// object containing methods and vars for are realTimeClock
const realTimeClock = require(`../views/utils`).realTimeClock;

// run a server-side realTimeClock
const startClock = function(){
  realTimeClock.getLiveFormatedTime(new Date(), realTimeClock.tz)
};

let rtcInterval = setInterval(startClock, 1000);
// clearInterval(rtcInterval); - when to do ..??

// convert Fahrenheit to Celsius and Celsius to Fahrenheit
// const convertTemp = (tempType, tempNum) => {
//
//   if (tempType  == "Celsius"){
//     // so converting from Fahrenheit to Celsius
//     return ((tempNum - 32 ) / 1.8).toPrecision(4);
//   } else {
//     // else converting to Fahrenheit from Celsius
//     return (tempNum *  1.8) + 32;
//   }
//
//  // end convertTemp()
// }

// create arrays containing current and forecast weather for requested locations
// each array is created as part of the locals.searchResults object
const createLocations = data => {
  let newForecast = {
    // save new current foreeast
    timeStamp: Date.now(),
    data: data
    }

  // currentLocation will always be the latest one entered, so new locationBar will be rendered for it
  // index of locationName array should always match index of forecastData array

  searchResults.forecastData = [...searchResults.forecastData, newForecast.data[1]];
  searchResults.locationData =  [...searchResults.locationData, newForecast.data[0]];
  searchResults.locationName = [...searchResults.locationName, `${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`];
  searchResults.currentLocationData = {
    index: searchResults.forecastData.length,
    locationName: `${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`,
    sunsetTime: newForecast.data[1].data.daily.data[0].sunsetTime,
    sunriseTime: newForecast.data[1].data.daily.data[0].sunriseTime,
    utcOffSet: newForecast.data[1].data.offset,
    liveFormattedTime: timeDate.getCurrentTimeAtLocation(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset),
    timezone: newForecast.data[1].data.offset,
    day: timeDate.checkDay(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset, newForecast.data[1].data.daily.data[0].sunsetTime, newForecast.data[1].data.daily.data[0].sunriseTime),
    tempFahrenheit: Math.floor(newForecast.data[1].data.currently.apparentTemperature),
    tempCelsius: convertTemp.toCelsius(Math.floor(newForecast.data[1].data.currently.apparentTemperature)),
    icon:`${newForecast.data[1].data.currently.icon}`,
    summary:`${newForecast.data[1].data.currently.summary}`,
    wiClass: createWIelement(newForecast.data[1].data.currently.icon, timeDate.checkDay(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset, newForecast.data[1].data.daily.data[0].sunsetTime, newForecast.data[1].data.daily.data[0].sunriseTime)),
    currentCondition:`${newForecast.data[1].data.currently.summary}`
  };
  searchResults.availLocationsArray = [...searchResults.availLocationsArray, {
    index: searchResults.forecastData.length,
    locationName: `${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`,
    utcOffSet: newForecast.data[1].data.offset,
    timeStamp: newForecast.data[1].data.currently.time,
    sunsetTime: newForecast.data[1].data.daily.data[0].sunsetTime,
    sunriseTime: newForecast.data[1].data.daily.data[0].sunriseTime,
    liveFormattedTime: timeDate.getCurrentTimeAtLocation(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset),
    timezone: newForecast.data[1].data.offset,
    day: timeDate.checkDay(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset, newForecast.data[1].data.daily.data[0].sunsetTime, newForecast.data[1].data.daily.data[0].sunriseTime),
    tempFahrenheit: Math.floor(newForecast.data[1].data.currently.apparentTemperature),
    tempCelsius: convertTemp.toCelsius(Math.floor(newForecast.data[1].data.currently.apparentTemperature)),
    icon:`${newForecast.data[1].data.currently.icon}`,
    summary:`${newForecast.data[1].data.currently.summary}`,
    wiClass: timeDate.getWiClass(newForecast.data[1].data.currently.icon, timeDate.checkDay(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset, newForecast.data[1].data.daily.data[0].sunsetTime, newForecast.data[1].data.daily.data[0].sunriseTime)),
    currentCondition:`${newForecast.data[1].data.currently.summary}`
  }];
  searchResults.locationCount = searchResults.locationCount + 1;
  searchResults.mainViewBackGround = [...searchResults.mainViewBackGround, timeDate.MainView(newForecast.data[1].data)];
  searchResults.locationBarBackGround =  [...searchResults.locationBarBackGround, timeDate.LocationBar(newForecast.data[1].data)];


  // doing this here means only a valid query will set forecast flag true
  locals.searchResults.forecast = true;

  // for testing only
  // let locationTemp = 0;
  // locationBars
  // locals.searchResults.locationBarArray.push(
  //   {
  //     locationName: locationName,
  //     tempFahrenheit:locationTemp,
  //     tempCelsius: convertTemp.toCelsius(locationTemp),
  //     locationBarBackGround:'locationBar-clearDay',
  //     liveFormattedTime: `${realTimeClock.time}`,
  //     currentCondition:'clearDay',
  //     wiClass:"wi wi-day-sunny",
  //     timezone: locationName === 'San Francisco, CA' ? -7 : -5
  //   }
  // ); // end locationBarArray.push
  // mainViews
  // locals.searchResults.mainViewArray.push(
  //   {
  //     location:
  //         {
  //           name:locationName
  //         },
  //      currentConditions:
  //         {
  //           tempFahrenheit:0,
  //           tempCelsius:-34,
  //           mainViewBackGround:'locationBar-clearDay',
  //           liveFormattedTime:`${realTimeClock.time}`,
  //           currentCondition:'clearDay',
  //           wiClass:"wi wi-day-sunny"
  //         }
  //   }
  // ); // end mainViewArray.push

// end createLoctions()
}

// make api calls and process geocoded location and weather data
const getForecast = (input, apiKeys) => {

  if (input ){

    console.log(`\n...processing new GET request...\nusing async functions, some of the following logs may seem to be out of order\n`);

    let removeLeading = /([\sA-Z-a-z])+/g;
    let locationArray = input.match(removeLeading);
    let locationString = locationArray.toString();
    let geoCodeApiCallUrl = getGeoCodeApiCall(locationString, apiKeys.geoCodeKey);

    if (geoCodeApiCallUrl === 'Oops'){
      let errorMsg = `Opps, it seems we did not receive a valid location: place type a city, state or zipcode, then a ',' followed by a country abbreviation`;
      next(new Error(`${errorMsg}`));
    } else {
      axios.get(geoCodeApiCallUrl)
        .then(response => {

          sequelizeDb.Locations.create(response)
            .then(Location => {

              let longLat = Location.dataValues.data.results[0].position;
              let cityName =  Location.dataValues.data.results[0].address.municipality;
              let province =  Location.dataValues.data.results[0].address.countrySubdivision;
              let loc = {latitude:longLat.lat,longitude:longLat.lon, city: cityName, province: province };

              // going through this process to send 1 response with 1 set of json data
              const db = [];
              db.push(manageLocData(loc));
              let forecastApiCallUrl = getForecastApiCall(db[0].data, apiKeys.forecastKey);

              axios.get(forecastApiCallUrl)
                   .then(response => {

                    sequelizeDb.Forecasts.create(response)

                   .then( Forecast => {

                    db.push(manageForecastData(Forecast.dataValues.data));
                    return db

                    console.log(`response sent, deleting data.., should get 2 "found:" folloewd by nothing`);
                    db.splice(0, db.length)

                    }).then(()=>{
                     // prove that data in tables deleted, should console the word, 'found:' followed by nothng, twice
                      // may write this to a log instead of logging to console
                      // or just turnoff sequelize logging for production

                      // not keeping data, part of DarkSky usage terms
                      sequelizeDb.Forecasts.destroy({force:true,truncate:true}).then(()=>{
                        sequelizeDb.Forecasts.findAll().then(found => console.dir(`found: ${found}`)).catch(err => console.log(err));
                      });

                      // not keeping data, part of TomTom API usage terms
                      sequelizeDb.Locations.destroy({force:true,truncate:true}).then(()=>{
                        sequelizeDb.Locations.findAll().then(found => console.dir(`found: ${found}`)).catch(err => console.log(err));
                      });

                    }).catch( err => {
                      console.log('Error getting forecast data... ', err);
                      return err;
                   });

                 }).catch(err => {
                  console.log('Error getting location data... ', err);
                    return err;
              });

            }).catch(function(error){
              console.log(`error: ${error}`);
            });

         }).catch(err => {
          console.log('Error geocding that location ... ', err);
          return err;
        });
    }
  } else {

    let errorMsg = `Opps, it seems we did not receive a valid location: place type a city, state or zipcode, then a ',' followed by a country abbreviation`;
    next(new Error(`${errorMsg}`));
  }
};

// using an indexNo, splices out the corresponding data object from locationBarArray and mainViewArray
const removeLocation = indexNo => {
  // using a given index, splice all arrays with the effect of removing that location
  locals.searchResults.locationData.splice(indexNo, 1);
  locals.searchResults.locationName.splice(indexNo, 1);
  locals.searchResults.forecastData.splice(indexNo, 1);
  locals.searchResults.availLocationsArray.splice(indexNo, 1);
  locals.searchResults.locationBarBackGround.splice(indexNo, 1);
  locals.searchResults.mainViewBackGround.splice(indexNo, 1);
  locals.searchResults.locationCount = locals.searchResults.locationData.length;
}

// renders home page, initial view
main.get('/', (req, res, next) => {
  // renders the a title bar  and navbar with tempType controls
  // locationBar only renders as response from /weatherCurren
  res.render('index', locals.searchResults)

});

// current weather route gecodes and gets weather data for each location
// calls createLoctions(), storing data in locals.searchResults
// redirects back to home route
main.get('/weatherCurrent', (req, res, next) => {
  // gecodes req.query.searchInput, uses result to get forecast data
  // send data back to home page usign a redirect
  if (req.query.geoCodeThis){
    locals.searchResults.arrayLength = locals.searchResults.locationBarArray.length;
    locals.searchResults.currentIndex = locals.searchResults.arrayLength - 1;

    let db = getForecast(req.query.geoCodeThis, apiKeys)
    if (db){
      createLocations(db);
    }
  }
  res.redirect('/')

});

// selected location calls weatherForecast route
// renders main view or detail of weather forecast for that location
main.get('/weatherForecast/:indexNo', (req, res, next) => {
  // requires already gecoded location and forecast data
  // otherwise redirect to home page
  // else renders mainView
  if (locals.searchResults.forecast){
    locals.searchResults.arrayIndexNo = req.params.indexNo;
    res.render('mainView/detail.pug', locals.searchResults)
  } else {
    res.redirect('/')
  }
});

// removes the correspondong forecast data object from location and mainView arrays
// redirect to home page,
// which renders the existing locationBars minus removed location
main.get('/removeLocation/:indexNo', (req, res, next) => {
  if (req.params.indexNo && !isNaN(parseInt(req.params.indexNo))){
  removeLocation(req.params.indexNo);}
  res.redirect('/')
});

module.exports = main;
