const express = require('express');
const axios = require('axios');
const main = express.Router();

// importing methods that access forecast.io and mapbox geocoding api
const getForecastApiCall = require('../dataSource').getForecastApiCall;
const getGeoCodeApiCall = require('../dataSource').getGeoCodeApiCall;
const manageForecastData = require('../dataSource').manageForecastData;
const manageLocData = require('../dataSource').manageLocData;

// importing newForecastData document based on mongoose model
const newForecastData = require('../dataSource').newForecastData;
const newLocationData = require('../dataSource').newLocationData;

// api keys
const apiKeys = {
  forecastKey:  process.env.FORECAST_KEY,
  geoCodeKey: process.env.GEOCODE_KEY
}

// importing utils for time and temp
const timeDate = require('../dataSource/utils').timeDate;
const convertTemp = require('../dataSource/utils').convertTemp;
const setBackground = require('../dataSource/utils').setBackground;
const getWiClass = require('../dataSource/utils').getWiClass;

// locals to pass to pug templates to be rendered with the view
const locals = {
  searchResults: {
    fahrenheitFont:"°F",
    celsiusFont:"°C",
    forecast: false,
    tempTypeFahrenheit: true,
    notADuplicateLocation: true,
    geoCodeThis: '', // raw input from navbar view,
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
    locationName: [], // corrected geocoded city, province name of requested navbar input
    locationCount: 0,
    currentLocationData: {},
    availLocationsArray: [],
    mainViewBackGround: [],
    locationBarBackGround: []
  }
}

// check for dups, if input is a dup, set notADuplicateLocation to false
const compareLocationName = (item, index) => {

  // first isolate city, province and the make Upper Case
  const findEachWord = /[\sA-Za-z]+/g;

  const locationCity = item.match(findEachWord)[0].toUpperCase();
  const locationProvice = item.match(findEachWord)[1].toUpperCase();
  const compareLocationName = `${locationCity}, ${locationProvice}`;

  const city = locals.searchResults.geoCodeThis.match(findEachWord)[0].toUpperCase();
  const province = locals.searchResults.geoCodeThis.match(findEachWord)[1].toUpperCase();
  const compareInput = `${city}, ${province}`;

  // then compare
  if (compareLocationName === compareInput){
    locals.searchResults.notADuplicateLocation = false;
  } else {
    locals.searchResults.notADuplicateLocation = true;
  }
};

// create arrays containing current and forecast weather for requested locations
// each array is created as part of the locals.searchResults object

// make api calls and process geocoded location and weather data
const getForecast = function(req, res, next){
  // resetting forecast flag just in case this is not the first forecast retreived
  locals.searchResults.forecast = false;

  const input = req.query.geoCodeThis;
  const lookForCommaBetween = /,(?=[\sA-Za-z])/g;

  if (input && input.match(lookForCommaBetween)){

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
                    let newForecast = {
                      // save new current foreeast
                      timeStamp: Date.now(),
                      data: db
                      }

                    // currentLocation will always be the latest one entered, so new locationBar will be rendered for it
                    // index of locationName array should always match index of forecastData array
                    // the increase indexs, save input to geoCodeThis array
                    locals.searchResults.arrayLength = locals.searchResults.locationBarArray.length;
                    locals.searchResults.currentIndex = locals.searchResults.arrayLength - 1;

                    locals.searchResults.forecastData = [...locals.searchResults.forecastData, newForecast.data[1]];
                    locals.searchResults.locationData =  [...locals.searchResults.locationData, newForecast.data[0]];
                    locals.searchResults.locationName = [...locals.searchResults.locationName, `${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`];
                    locals.searchResults.currentLocationData = {
                      index: locals.searchResults.forecastData.length,
                      locationName: `${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`,
                      sunsetTime: newForecast.data[1].data.daily.data[0].sunsetTime,
                      sunriseTime: newForecast.data[1].data.daily.data[0].sunriseTime,
                      utcOffSet: newForecast.data[1].data.offset,
                      liveFormattedTime: timeDate.getCurrentTimeAtLocation(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset),
                      timezone: newForecast.data[1].data.offset,
                      day: timeDate.checkDay(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset, newForecast.data[1].data.daily.data[0].sunsetTime, newForecast.data[1].data.daily.data[0].sunriseTime),
                      tempFahrenheit: Math.floor(newForecast.data[1].data.currently.temperature),
                      tempCelsius: convertTemp.toCelsius(Math.floor(newForecast.data[1].data.currently.temperature)),
                      icon:`${newForecast.data[1].data.currently.icon}`,
                      summary:`${newForecast.data[1].data.currently.summary}`,
                      wiClass: getWiClass(newForecast.data[1].data.currently.icon, timeDate.checkDay(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset, newForecast.data[1].data.daily.data[0].sunsetTime, newForecast.data[1].data.daily.data[0].sunriseTime)),
                      currentCondition:`${newForecast.data[1].data.currently.summary}`
                    };
                    locals.searchResults.availLocationsArray = [...locals.searchResults.availLocationsArray, {
                      index: locals.searchResults.forecastData.length,
                      locationName: `${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`,
                      utcOffSet: newForecast.data[1].data.offset,
                      timeStamp: newForecast.data[1].data.currently.time,
                      sunsetTime: newForecast.data[1].data.daily.data[0].sunsetTime,
                      sunriseTime: newForecast.data[1].data.daily.data[0].sunriseTime,
                      liveFormattedTime: timeDate.getCurrentTimeAtLocation(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset),
                      timezone: newForecast.data[1].data.offset,
                      day: timeDate.checkDay(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset, newForecast.data[1].data.daily.data[0].sunsetTime, newForecast.data[1].data.daily.data[0].sunriseTime),
                      tempFahrenheit: Math.floor(newForecast.data[1].data.currently.temperature),
                      tempCelsius: convertTemp.toCelsius(Math.floor(newForecast.data[1].data.currently.temperature)),
                      icon:`${newForecast.data[1].data.currently.icon}`,
                      summary:`${newForecast.data[1].data.currently.summary}`,
                      wiClass: getWiClass(newForecast.data[1].data.currently.icon, timeDate.checkDay(newForecast.data[1].data.currently.time, newForecast.data[1].data.offset, newForecast.data[1].data.daily.data[0].sunsetTime, newForecast.data[1].data.daily.data[0].sunriseTime)),
                      currentCondition:`${newForecast.data[1].data.currently.summary}`
                    }];
                    locals.searchResults.locationCount = locals.searchResults.locationCount + 1;
                    locals.searchResults.mainViewBackGround = [...locals.searchResults.mainViewBackGround, timeDate.mainView(newForecast.data[1].data)];
                    locals.searchResults.locationBarBackGround =  [...locals.searchResults.locationBarBackGround, timeDate.locationBar(newForecast.data[1].data)];

                    // doing this here means only a valid query will set forecast flag true
                    locals.searchResults.forecast = true;

                    return locals.searchResults;

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
                      next(err);
                   });

                 }).catch(err => {
                  console.log('Error getting location data... ', err);
                  next(err);
              });

            }).catch(function(err){
              console.log(`error: ${err}`);
              next(err);
            });

         }).catch(err => {
          console.log('Error geocding that location ... ', err);
          next(err);
        });
    }
  } else {

    // let errorMsg = `Opps, it seems we did not receive a valid location: place type a city, state or zipcode, then a ',' followed by a country abbreviation`;
    // next(new Error(`${errorMsg}`));
    return locals.searchResults;
  }
};

const showForecastDetail = function(index, locals){

  // get current data for selected location, using index for that location's data object
  locals.searchResults.currentLocationData = {
      index: index,
      name: `${locals.searchResults.locationData[index].data.city}, ${locals.searchResults.locationData[index].data.province}`,
      sunsetTime: locals.searchResults.forecastData[index].data.daily.data[0].sunsetTime,
      sunriseTime: locals.searchResults.forecastData[index].data.daily.data[0].sunriseTime,
      utcOffSet: locals.searchResults.forecastData[index].data.offset,
      time: timeDate.getCurrentTimeAtLocation(locals.searchResults.forecastData[index].data.currently.time, locals.searchResults.forecastData[index].data.offset),
      tempFahrenheit: Math.floor(locals.searchResults.forecastData[index].data.currently.temperature),
      tempCelsius: convertTemp.toCelsius(Math.floor(locals.searchResults.forecastData[index].data.currently.temperature)),
      day: timeDate.checkDay(locals.searchResults.forecastData[index].data.currently.time, locals.searchResults.forecastData[index].data.offset, locals.searchResults.forecastData[index].data.daily.data[0].sunsetTime, locals.searchResults.forecastData[index].data.daily.data[0].sunriseTime),
      icon: locals.searchResults.forecastData[index].data.currently.icon
    };

   locals.searchResults.currentForecast = locals.searchResults.forecastData[index].data;
   locals.searchResults.hourlyConditions = getHourlyConditions(locals.searchResults.forecastData[index].data.hourly.data);
   locals.searchResults.dailyConditions = getDailyConditions(locals.searchResults.forecastData[index].data.daily.data);

  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   locals.searchResults.tableHeader = {
     dayOfWeek: daysOfWeek[timeDate.whatDayIsIt(locals.searchResults.currentForecast.currently.time, locals.searchResults.currentForecast.offset)],
     tempHighF: Math.floor(locals.searchResults.currentForecast.daily.data[0].temperatureHigh),
     tempLowF: Math.floor(locals.searchResults.currentForecast.daily.data[0].temperatureLow),
     tempHighC: convertTemp.toCelsius(Math.floor(locals.searchResults.currentForecast.daily.data[0].temperatureHigh)),
     tempLowC: convertTemp.toCelsius(Math.floor(locals.searchResults.currentForecast.daily.data[0].temperatureLow)),
   };

   const initialTime = new Date(locals.searchResults.forecastData[index].data.hourly.data[0].time * 1000);
   const timeNow = new Date();

   let removed;

   if (initialTime.getUTCHours() <  timeNow.getUTCHours() ){
     removed = locals.searchResults.forecastData[index].data.hourly.data.splice(0,1);
   }
   remove = '';

   return locals.searchResults;
};

const pickOutDataPoints = (dataObject, index) => {  // callback function for getHourlyConditions

  let day = timeDate.checkDay(dataObject.time, locals.searchResults.currentLocationData.utcOffSet, locals.searchResults.currentLocationData.sunsetTime, locals.searchResults.currentLocationData.sunriseTime);
  let hour =  timeDate.getHourOfDay(dataObject.time, locals.searchResults.currentLocationData.utcOffSet);
  let icon = dataObject.icon;
  let tempFahrenheit = locals.searchResults.currentLocationData.tempFahrenheit;
  let tempCelsius = locals.searchResults.currentLocationData.tempCelsius;

  if (index === 0 ){
    return {
      day: day,     // datatype boolean
      hour: 'Now',  // datatype string
      icon: icon,   // datatype string
      tempF: tempFahrenheit,   // datatype int
      tempC: tempCelsius
    };
  } else {
    return {
      day: day,    // datatype boolean
      hour: hour,  // datatype string
      icon: icon,  // datatype string
      tempF: tempFahrenheit,   // datatype int
      tempC: tempCelsius
    };
  }
};

const pickOutDailyDataPoints = (dataObject, index) => { // calback function for getDailyConditions

    // let today = new Date();
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return {
      day: daysOfWeek[timeDate.whatDayIsIt(dataObject.time, locals.searchResults.currentLocationData.utcOffSet)],  // datatype string
      icon: dataObject.icon,            // datatype string
      tempLowF: Math.floor(dataObject.temperatureLow),   // datatype int
      tempHighF: Math.floor(dataObject.temperatureHigh),  // datatype int
      tempLowC: convertTemp.toCelsius( Math.floor(dataObject.temperatureLow)),   // datatype int
      tempHighC: convertTemp.toCelsius( Math.floor(dataObject.temperatureHigh)),   // datatype int
    };
};

const getHourlyConditions = (dataArray) => { // for each hour in a locations forecast, return an object of datapoints
   return dataArray.map(pickOutDataPoints);
}

const getDailyConditions = (dataArray) => { // for each day in a locations forecast, return an object of datapoints
   return dataArray.map(pickOutDailyDataPoints);
}

// using an indexNo, splices out the corresponding data object from arrays in locals.searchResults
const removeLocation = (indexNo, locals) => {
  // using a given index, splice all arrays with the effect of removing that location
  locals.searchResults.locationData.splice(indexNo, 1);
  locals.searchResults.locationName.splice(indexNo, 1);
  locals.searchResults.forecastData.splice(indexNo, 1);
  locals.searchResults.availLocationsArray.splice(indexNo, 1);
  locals.searchResults.locationBarBackGround.splice(indexNo, 1);
  locals.searchResults.mainViewBackGround.splice(indexNo, 1);
  locals.searchResults.locationCount = locals.searchResults.locationData.length;

  return locals;
}

// renders home page, initial view
main.get('/', (req, res, next) => {
  // renders the a title bar  and navbar with tempType controls
  // locationBar only renders as response from /weatherCurrent
    res.render('index', req.session.locals = locals.searchResults);

});

// current weather route gecodes and gets weather data for each location
// calls createLoctions(), storing data in locals.searchResults
// redirects back to home route
main.get('/weatherCurrent', (req, res, next) => {
  // gecodes req.query.searchInput, uses result to get forecast.io data
  // render home page view after data processing done

  // regexps for basic input validation
  // for now just checking for comma delimited location like...city, state
  const lookForCommaBetween = /,(?=[\sA-Za-z])/g;
  // for any input that start with a comma
  const lookForCommaAtBeginning = /^,(?=[\sA-Za-z])/g;
  // and for numbers anywhere in the input
  const findNumbers = /[0-9]+/g;

  if (req.query.geoCodeThis !== ''){ //if not blank

    req.session.locals.geoCodeThis = req.query.geoCodeThis;

    // if not a duplicate, if there is at least 1 comma between words, if no comma at beginning and if no numbers,
    if (req.query.geoCodeThis.match(lookForCommaBetween) !== null && req.query.geoCodeThis.match(lookForCommaAtBeginning) == null && req.query.geoCodeThis.match(findNumbers) == null ){

      // if there are other names in the locationData array, compare each of these for dulicates
      if (req.session.locals.locationName.length > 0){
        req.session.locals.locationName.forEach(compareLocationName);
      }

      if (locals.searchResults.notADuplicateLocation){
        // make async axios api calls to get and process data
        req.sessions.locals = getForecast(req.session.locals.searchResults);
      }

    } else {
      // just in case req.query.geoCodeThis is a duplicate, just render the home page with no changes
      // may want to change navBar input so users is prompted for valid input
      res.render('index', req.session.locals.searchResults);
    }


  } else {

    // just in case req.query.geoCodeThis is blank, just render the home page with no changes
    // may want to change navBar input so users is prompted for valid input
    res.render('index', req.session.locals.searchResults);
  }

});

main.get('/tempType/:type', (req, res, next) => {

    // this simply sets a tempType flag to be used by both locationBar and mainView templates...
    // to show tempaerture in Celsius or Fahrenheit degrees

    const updateTime = (object, index) => {
      object.liveFormattedTime = timeDate.getCurrentTimeAtLocation(new Date(), req.session.locals.forecastData[index].data.offset);
      return object;
    };
    if (req.params.type) {
      if ( req.params.type == "Fahrenheit"){
      req.sessions.locals.searchResults.tempTypeFahrenheit = true;
      } else if (req.params.type == "Celsius"){
      req.sessions.locals.searchResults.tempTypeFahrenheit = false;
      }
    req.sessions.locals.searchResults.availLocationsArray = req.sessions.locals.searchResults.availLocationsArray.map(updateTime);
    } // other wise make no changes

    res.redirect('/');
})

// selected location calls weatherForecast route
// renders main view or detail of weather forecast for that location
main.get('/weatherForecast/:indexNo', (req, res, next) => {
  // requires already gecoded location and forecast data
  // otherwise redirect to home page
  // else renders mainView
  if (req.sessions.locals.searchResults.forecast){
    req.session.locals.arrayIndexNo = req.params.indexNo;
    req.session.locals = showForecastDetail(req.session.locals);
    res.render('mainView/detail.pug', req.sessions.locals.searchResults)
  } else {
    res.redirect('/')
  }
});

// removes the correspondong forecast data object from location and mainView arrays
// redirect to home page,
// which renders the existing locationBars minus removed location
main.get('/removeLocation/:indexNo', (req, res, next) => {
  if (req.params.indexNo && !isNaN(parseInt(req.params.indexNo))){
  req.session.locals = removeLocation(req.params.indexNo, req.session.locals);}
  res.redirect('/')
});

module.exports = main;
