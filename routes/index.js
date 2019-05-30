const express = require('express');
const axios = require('axios');
const main = express.Router();

// importing Sequelize, and sequelizeDb and models
const Sequelize = require('../data/models').Sequelize;
const sequelizeDb = require('../data/models').db;

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

const importedTemplateData = {
  initialView: require('../views/initialView/locals.js').homePg,
  locationBar: require(`../views/locationBarView/locals.js`).locationBar,
  mainView: require('../views/mainView/locals.js').mainView
}

// locals to pass to pug templates to be rendered with the view
const resetTemplateData = () => {
  const data = {
    fahrenheitFont:"°F",
    celsiusFont:"°C",
    forecast: false,
    tempTypeFahrenheit: true,
    notADuplicateLocation: true,
    geoCodeThis: '', // raw input from navbar view,
    initialView: importedTemplateData.initialView,
    locationBar: importedTemplateData.locationBar,
    mainView: importedTemplateData.mainView,
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
  };

  return data;
};

// makes api calls, processes geocoded location and weather data, and saves to seqeulize data and session db
// render forecast if successful, if not render page unchanged with navbar input prompt
const makeApiCalls = function(update, req, res, next){

  // regexps and a callback function for basic input validation and duplicate checking

  // for any input that start with a comma
  const lookForCommaAtBeginning = /^,(?=[\sA-Za-z])/g;
  // for any input that has a comma between words
  const lookForCommaBetween = /,(?=[\sA-Za-z])/g;
  // any numbers anywhere in the input
  const findNumbers = /[0-9]+/g;

  // check for dups, if input is a dup, set notADuplicateLocation to false
  const compareLocationName = (item, index) => {

    // first isolate city, province and the make Upper Case
    // const findEachWord = /[\sA-Za-z]+/g;
    const findEachWord = /[A-Za-z]\w+/g;

    const locationCity = item.match(findEachWord)[0].toUpperCase();
    const locationProvice = item.match(findEachWord)[1].toUpperCase();
    const compareLocationName = `${locationCity}, ${locationProvice}`;

    const city = res.locals.searchResults.geoCodeThis.match(findEachWord)[0].toUpperCase();
    const province = res.locals.searchResults.geoCodeThis.match(findEachWord)[1].toUpperCase();
    const compareInput = `${city}, ${province}`;

    // then compare
    if (compareLocationName != compareInput && res.locals.searchResults.notADuplicateLocation != false){
      res.locals.searchResults.notADuplicateLocation = true;
    } else {
      res.locals.searchResults.notADuplicateLocation = false;
    }
  };

  let input = res.locals.searchResults.geoCodeThis;

  // if not a duplicate, if there is at least 1 comma between words, if no comma at beginning and if no numbers,
  if (input.match(lookForCommaBetween) !== null && input.match(lookForCommaAtBeginning) == null && input.match(findNumbers) == null ){

    // if there are other names in the locationData array, compare each of these for dulicates
    if (res.locals.searchResults.locationName.length > 0){
      res.locals.searchResults.locationName.forEach(compareLocationName);
    }

    if (res.locals.searchResults.notADuplicateLocation){

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

              const loc = {
                data: {
                  results: response.data.results,
                  summary: response.data.summary
                }
              };

              sequelizeDb.Locations.create(loc)
                .then(Location => {

                  // sequelizeDb.Locations.findAll().then((location)=>{console.log(location)})
                  let location_id = Location.id;

                  let longLat = Location.dataValues.data.results[0].position;
                  let cityName =  Location.dataValues.data.results[0].address.municipality;
                  let province =  Location.dataValues.data.results[0].address.countrySubdivision;
                  let loc = {location_id:location_id,latitude:longLat.lat,longitude:longLat.lon, city: cityName, province: province };

                  const db = [];
                  db.push(manageLocData(loc));
                  let forecastApiCallUrl = getForecastApiCall(db[0].data, apiKeys.forecastKey);

                  axios.get(forecastApiCallUrl)
                       .then(response => {

                         const forecast = {
                           Locations_id: db[0].data.location_id,
                           data: response.data
                         };

                        sequelizeDb.Forecasts.create(forecast)
                         .then( Forecast => {

                           // sequelizeDb.Forecasts.findAll().then((forecast)=>{console.log(forecast)})

                            db.push(manageForecastData(Forecast.dataValues.data));
                            let newForecast = {
                              // save new current foreeast
                              timeStamp: Date.now(),
                              data: db
                              }

                            // currentLocation will always be the latest one entered, so new locationBar will be rendered for it
                            // index of locationName array should always match index of forecastData array
                              if (update) {
                                // then we're adding to the SearchResults.data column
                                sequelizeDb.SearchResults.findOne({
                                  where: {app_id:req.session.id}
                                }).then( SearchResults => {
                                     const searchResults = {
                                          app_id: req.session.id,
                                          data: {
                                                forecastData: [newForecast.data[1]],
                                                locationData: [newForecast.data[0]],
                                                locationName: [`${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`],
                                                currentLocationData: {
                                                    // index: this.forecastData.length,
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
                                                  },
                                                mainViewBackGround: [timeDate.mainView(newForecast.data[1].data)],
                                                locationBarBackGround: [timeDate.locationBar(newForecast.data[1].data)]
                                              }
                                            };

                                     SearchResults.update(searchResults.data)
                                        .then(SearchResults => {

                                           // res.status(200).json(searchResults.data);

                                           res.locals.searchResults.forecastData = [...res.locals.searchResults.forecastData, SearchResults.data.forecastData[0]];
                                           res.locals.searchResults.locationData =  [...res.locals.searchResults.locationData, SearchResults.data.locationData[0]];
                                           res.locals.searchResults.locationName = [...res.locals.searchResults.locationName, SearchResults.data.locationName[0]];
                                           res.locals.searchResults.currentLocationData = {
                                             index: res.locals.searchResults.locationName.length,
                                             locationName: SearchResults.data.currentLocationData.locationName,
                                             sunsetTime: SearchResults.data.currentLocationData.sunsetTime,
                                             sunriseTime: SearchResults.data.currentLocationData.sunriseTime,
                                             utcOffSet: SearchResults.data.currentLocationData.offset,
                                             liveFormattedTime: timeDate.getCurrentTimeAtLocation(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset),
                                             timezone: SearchResults.data.forecastData[0].data.offset,
                                             day: timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime),
                                             tempFahrenheit: Math.floor(SearchResults.data.forecastData[0].data.currently.temperature),
                                             tempCelsius: convertTemp.toCelsius(Math.floor(SearchResults.data.forecastData[0].data.currently.temperature)),
                                             icon:`${SearchResults.data.forecastData[0].data.currently.icon}`,
                                             summary:`${SearchResults.data.forecastData[0].data.currently.summary}`,
                                             wiClass: getWiClass(SearchResults.data.forecastData[0].data.currently.icon, timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime)),
                                             currentCondition:`${SearchResults.data.forecastData[0].data.currently.summary}`
                                           };
                                           res.locals.searchResults.availLocationsArray = [...res.locals.searchResults.availLocationsArray, {
                                               index: res.locals.searchResults.locationName.length,
                                               locationName: SearchResults.data.currentLocationData.locationName,
                                               sunsetTime: SearchResults.data.currentLocationData.sunsetTime,
                                               sunriseTime: SearchResults.data.currentLocationData.sunriseTime,
                                               utcOffSet: SearchResults.data.currentLocationData.offset,
                                               liveFormattedTime: timeDate.getCurrentTimeAtLocation(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset),
                                               timezone: SearchResults.data.forecastData[0].data.offset,
                                               day: timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime),
                                               tempFahrenheit: Math.floor(SearchResults.data.forecastData[0].data.currently.temperature),
                                               tempCelsius: convertTemp.toCelsius(Math.floor(SearchResults.data.forecastData[0].data.currently.temperature)),
                                               icon:`${SearchResults.data.forecastData[0].data.currently.icon}`,
                                               wiClass: getWiClass(SearchResults.data.forecastData[0].data.currently.icon, timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime)),
                                               currentCondition:`${SearchResults.data.forecastData[0].data.currently.summary}`
                                             }];
                                           res.locals.searchResults.locationCount = res.locals.searchResults.locationData.length;
                                           res.locals.searchResults.mainViewBackGround = [...res.locals.searchResults.mainViewBackGround, timeDate.mainView(SearchResults.data.forecastData[0].data)];
                                           res.locals.searchResults.locationBarBackGround =  [...res.locals.searchResults.locationBarBackGround, timeDate.locationBar(SearchResults.data.forecastData[0].data)];
                                           res.locals.searchResults.forecast = true;

                                           sequelizeDb.AppSessions.findOne({
                                             where: {app_id: req.session.id}
                                           }).then(AppSession => {
                                             const currentCount = AppSession.locationCount + 1;
                                             AppSession.update({locationCount: currentCount
                                             }).then(() => {
                                               res.render('index', res.locals.searchResults);
                                               console.log(`results saved to session store, emptying temp db object`);
                                               db.splice(0, db.length)
                                             }).catch(err => {
                                             next(new Error(`Oops, problem incrementing locationCount`, err));
                                             });
                                           }).catch(err => {
                                             next(new Error(`Oops, problem finding AppSession by that session.id`, err));
                                           });

                                        }).catch(err => next(new Error('Error updating SearchResults... ', err)))
                                    }).catch(err => {
                                      next(new Error('Error finding SearchResults... ', err))
                                    })

                              } else {
                                // then we're creating a new SearchResults table
                                const searchResults = {
                                     app_id: req.session.id,
                                     data: {
                                           forecastData: [newForecast.data[1]],
                                           locationData: [newForecast.data[0]],
                                           locationName: [`${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`],
                                           currentLocationData: {
                                               // index: this.forecastData.length,
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
                                             },
                                           mainViewBackGround: [timeDate.mainView(newForecast.data[1].data)],
                                           locationBarBackGround: [timeDate.locationBar(newForecast.data[1].data)]
                                         }
                                       };
                                // then we're creating a new SearchResults table
                                sequelizeDb.SearchResults.create(searchResults)
                                .then( SearchResults => {

                                     // res.status(200).json(searchResults.data);

                                     const index = res.locals.searchResults.locationName.length;

                                     res.locals.searchResults.forecastData = [...res.locals.searchResults.forecastData, SearchResults.data.forecastData[0]];
                                     res.locals.searchResults.locationData =  [...res.locals.searchResults.locationData, SearchResults.data.locationData[0]];
                                     res.locals.searchResults.locationName = [...res.locals.searchResults.locationName, SearchResults.data.locationName[0]];
                                     res.locals.searchResults.currentLocationData = {
                                       index: res.locals.searchResults.locationName.length,
                                       locationName: SearchResults.data.currentLocationData.locationName,
                                       sunsetTime: SearchResults.data.currentLocationData.sunsetTime,
                                       sunriseTime: SearchResults.data.currentLocationData.sunriseTime,
                                       utcOffSet: SearchResults.data.currentLocationData.offset,
                                       liveFormattedTime: timeDate.getCurrentTimeAtLocation(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset),
                                       timezone: SearchResults.data.forecastData[0].data.offset,
                                       day: timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime),
                                       tempFahrenheit: Math.floor(SearchResults.data.forecastData[0].data.currently.temperature),
                                       tempCelsius: convertTemp.toCelsius(Math.floor(SearchResults.data.forecastData[0].data.currently.temperature)),
                                       icon:`${SearchResults.data.forecastData[0].data.currently.icon}`,
                                       summary:`${SearchResults.data.forecastData[0].data.currently.summary}`,
                                       wiClass: getWiClass(SearchResults.data.forecastData[0].data.currently.icon, timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime)),
                                       currentCondition:`${SearchResults.data.forecastData[0].data.currently.summary}`
                                     };
                                     res.locals.searchResults.availLocationsArray = [...res.locals.searchResults.availLocationsArray, {
                                         index: res.locals.searchResults.locationName.length,
                                         locationName: SearchResults.data.currentLocationData.locationName,
                                         sunsetTime: SearchResults.data.currentLocationData.sunsetTime,
                                         sunriseTime: SearchResults.data.currentLocationData.sunriseTime,
                                         utcOffSet: SearchResults.data.currentLocationData.offset,
                                         liveFormattedTime: timeDate.getCurrentTimeAtLocation(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset),
                                         timezone: SearchResults.data.forecastData[0].data.offset,
                                         day: timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime),
                                         tempFahrenheit: Math.floor(SearchResults.data.forecastData[0].data.currently.temperature),
                                         tempCelsius: convertTemp.toCelsius(Math.floor(SearchResults.data.forecastData[0].data.currently.temperature)),
                                         icon:`${SearchResults.data.forecastData[0].data.currently.icon}`,
                                         wiClass: getWiClass(SearchResults.data.forecastData[0].data.currently.icon, timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime)),
                                         currentCondition:`${SearchResults.data.forecastData[0].data.currently.summary}`
                                       }];
                                     res.locals.searchResults.locationCount = res.locals.searchResults.locationData.length;
                                     res.locals.searchResults.mainViewBackGround = [...res.locals.searchResults.mainViewBackGround, timeDate.mainView(SearchResults.data.forecastData[0].data)];
                                     res.locals.searchResults.locationBarBackGround =  [...res.locals.searchResults.locationBarBackGround, timeDate.locationBar(SearchResults.data.forecastData[0].data)];
                                     res.locals.searchResults.forecast = true;

                                     sequelizeDb.AppSessions.findOne({
                                       where: {app_id: req.session.id}
                                     }).then(AppSession => {
                                       const currentCount = AppSession.locationCount + 1;
                                       AppSession.update({locationCount: currentCount
                                       }).then(() => {

                                         res.render('index', res.locals.searchResults);
                                         console.log(`results saved to session store, emptying temp db object`);
                                         db.splice(0, db.length);

                                       })
                                       .catch(err => {
                                       next(new Error(`Oops, problem incrementing locationCount`, err));
                                       });
                                     }).catch(err => {
                                       next(new Error(`Oops, problem finding AppSession by that session.id`, err));
                                     });

                                  }).catch(err => {
                                        console.log('Error saving SearchResults... ', err);
                                        return err;
                                  });
                              }

                          }).catch( err => {
                             console.log('Error saving Forecast data... ', err);
                             return err;
                          });

                       }).catch( err => {
                          console.log('Error getting forecast data... ', err);
                          return err;
                       });

                }).catch(function(err){
                  console.log(`Error saving that Location: \n${err}`);
                  return err;
                });

             }).catch(err => {
              console.log('Error geocding that location\n ${err}',);
              return err;
            });

        }

      }

     } else {

        // no valid input, render pg no changes, except will be displaying helpgul msg in navBar input
        res.render('index', res.locals.searchResults);
     }


  } else {
    // just in case input is a duplicate, just render the home page with no changes
    // may want to change navBar input so users is prompted for valid input
    res.render('index', res.locals.searchResults);
  }

};

// update currentLocationData array with data from SearchResults arrays using the index for selected location
const showForecastDetail = function(index, searchResults){

  // get current data for selected location, using index for that location's data object
  searchResults.currentLocationData = {
      index: index,
      name: `${searchResults.locationData[index].data.city}, ${searchResults.locationData[index].data.province}`,
      sunsetTime: searchResults.forecastData[index].data.daily.data[0].sunsetTime,
      sunriseTime: searchResults.forecastData[index].data.daily.data[0].sunriseTime,
      utcOffSet: searchResults.forecastData[index].data.offset,
      time: timeDate.getCurrentTimeAtLocation(searchResults.forecastData[index].data.currently.time, searchResults.forecastData[index].data.offset),
      tempFahrenheit: Math.floor(searchResults.forecastData[index].data.currently.temperature),
      tempCelsius: convertTemp.toCelsius(Math.floor(searchResults.forecastData[index].data.currently.temperature)),
      day: timeDate.checkDay(searchResults.forecastData[index].data.currently.time, searchResults.forecastData[index].data.offset, searchResults.forecastData[index].data.daily.data[0].sunsetTime, searchResults.forecastData[index].data.daily.data[0].sunriseTime),
      icon: searchResults.forecastData[index].data.currently.icon
    };

   searchResults.currentForecast = searchResults.forecastData[index].data;
   searchResults.hourlyConditions = getHourlyConditions(searchResults.forecastData[index].data.hourly.data, searchResults);
   searchResults.dailyConditions = getDailyConditions(searchResults.forecastData[index].data.daily.data, searchResults);

  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   searchResults.tableHeader = {
     dayOfWeek: daysOfWeek[timeDate.whatDayIsIt(searchResults.currentForecast.currently.time, searchResults.currentForecast.offset)],
     tempHighF: Math.floor(searchResults.currentForecast.daily.data[0].temperatureHigh),
     tempLowF: Math.floor(searchResults.currentForecast.daily.data[0].temperatureLow),
     tempHighC: convertTemp.toCelsius(Math.floor(searchResults.currentForecast.daily.data[0].temperatureHigh)),
     tempLowC: convertTemp.toCelsius(Math.floor(searchResults.currentForecast.daily.data[0].temperatureLow)),
   };

   const initialTime = new Date(searchResults.forecastData[index].data.hourly.data[0].time * 1000);
   const timeNow = new Date();

   let removed;

   if (initialTime.getUTCHours() <  timeNow.getUTCHours() ){
     removed = searchResults.forecastData[index].data.hourly.data.splice(0,1);
   }
   remove = '';

   return searchResults;
};

const getHourlyConditions = (dataArray, searchResults) => { // for each hour in a locations forecast, return an object of datapoints

  const pickOutDataPoints = (dataObject, index) => {  // callback function for getHourlyConditions

    let day = timeDate.checkDay(dataObject.time, searchResults.currentLocationData.utcOffSet, searchResults.currentLocationData.sunsetTime, searchResults.currentLocationData.sunriseTime);
    let hour =  timeDate.getHourOfDay(dataObject.time, searchResults.currentLocationData.utcOffSet);
    let icon = dataObject.icon;
    let tempFahrenheit = searchResults.currentLocationData.tempFahrenheit;
    let tempCelsius = searchResults.currentLocationData.tempCelsius;

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


   return dataArray.map(pickOutDataPoints);
}

const getDailyConditions = (dataArray, searchResults) => { // for each day in a locations forecast, return an object of datapoints

  const pickOutDailyDataPoints = (dataObject, index) => { // calback function for getDailyConditions

      // let today = new Date();
      let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      return {
        day: daysOfWeek[timeDate.whatDayIsIt(dataObject.time, searchResults.currentLocationData.utcOffSet)],  // datatype string
        icon: dataObject.icon,            // datatype string
        tempLowF: Math.floor(dataObject.temperatureLow),   // datatype int
        tempHighF: Math.floor(dataObject.temperatureHigh),  // datatype int
        tempLowC: convertTemp.toCelsius( Math.floor(dataObject.temperatureLow)),   // datatype int
        tempHighC: convertTemp.toCelsius( Math.floor(dataObject.temperatureHigh)),   // datatype int
      };
  };


   return dataArray.map(pickOutDailyDataPoints);
}

// using an indexNo, splices out the corresponding data object from arrays in searchResults
const removeLocation = (indexNo, searchResults) => {
  // using a given index, splice all arrays with the effect of removing that location
  searchResults.locationData.splice(indexNo, 1);
  searchResults.locationName.splice(indexNo, 1);
  searchResults.forecastData.splice(indexNo, 1);
  // searchResults.availLocationsArray.splice(indexNo, 1);
     // this array is not rebuilt each time locationBar are rendered
     // may try to find a different to handle this but for now.. commented out
  searchResults.locationBarBackGround.splice(indexNo, 1);
  searchResults.mainViewBackGround.splice(indexNo, 1);
  searchResults.locationCount = searchResults.locationData.length;

  return searchResults
}

// renders home page, initial view
// renders subviews, title bar, navbar and tempType controls
// locationBar view only renders if there are SearchResults
main.get('/', (req, res, next) => {

    // checking for AppSessions and SearchResults just in case...
    // user decides to browse back to home page or '/'
    // from any of the other routes
    // or if going back to home from mainView

      const session = {app_id: req.session.id};

      sequelizeDb.AppSessions.findOne({
        where: {app_id: req.session.id}
      }).then(AppSession =>{

        if (AppSession){

          if (AppSession.locationCount > 0){

              sequelizeDb.SearchResults.findOne({
                where: {app_id: req.session.id}
              }).then(SearchResults => {


                res.locals.searchResults = resetTemplateData();
                res.locals.searchResults.currentLocationData = SearchResults.data.currentLocationData;
                res.locals.searchResults.forecastData = SearchResults.data.forecastData;
                res.locals.searchResults.locationData = SearchResults.data.locationData;
                res.locals.searchResults.locationName = SearchResults.data.locationName;
                res.locals.searchResults.locationBarBackGround = SearchResults.data.locationBarBackGround;
                res.locals.searchResults.mainViewBackGround = SearchResults.data.mainViewBackGround;
                res.locals.searchResults.forecast = true;

                res.locals.searchResults.availLocationsArray.push({
                      index: SearchResults.data.locationName.length - 1,
                      locationName: SearchResults.data.currentLocationData.locationName,
                      sunsetTime: SearchResults.data.currentLocationData.sunsetTime,
                      sunriseTime: SearchResults.data.currentLocationData.sunriseTime,
                      utcOffSet: SearchResults.data.currentLocationData.utcOffSet,
                      liveFormattedTime: timeDate.getCurrentTimeAtLocation(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset),
                      timezone: SearchResults.data.forecastData[0].data.offset,
                      day: timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime),
                      tempFahrenheit: Math.floor(SearchResults.data.forecastData[0].data.currently.temperature),
                      tempCelsius: convertTemp.toCelsius(Math.floor(SearchResults.data.forecastData[0].data.currently.temperature)),
                      icon:`${SearchResults.data.forecastData[0].data.currently.icon}`,
                      wiClass: getWiClass(SearchResults.data.forecastData[0].data.currently.icon, timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime)),
                      currentCondition:`${SearchResults.data.forecastData[0].data.currently.summary}`
                    });

                res.render('index', res.locals.searchResults);

              }).catch(err => {

                // console.log('Error find that Session... ', err);
                next(new Error('Error finding that Session... ', err));

              });


           } else {

              // so AppSession using req.session.id exists, but no SearchResults
              res.locals.searchResults = {};
              res.locals.searchResults = resetTemplateData();;
              res.render('index', res.locals.searchResults);

           }

        } else {

          // verified there is NO AppSessions matching req.session.id
          sequelizeDb.AppSessions.create(session)

           .then((AppSession) => {

               res.locals.searchResults = {};
               res.locals.searchResults = resetTemplateData();

               res.render('index', res.locals.searchResults);

           }).catch(err => {

               // console.log('Error setting up Session... ', err);
               next(new Error('Error setting up Session... ', err));

           });
        }

      });

});

// gets current weather route gecodes and gets weather data for each location
// renders home page with locationBars view added,
main.get('/weatherCurrent', (req, res, next) => {
  // gecodes req.query.searchInput, uses result to get forecast.io data
  // render home page view after data processing done

  res.locals.searchResults = resetTemplateData();
  res.locals.searchResults.geoCodeThis = req.query.geoCodeThis;

  sequelizeDb.AppSessions.findOne({
    where: {app_id: req.session.id}
  }).then(AppSession =>{

    if (AppSession) {

      if (AppSession.locationCount > 0){

        sequelizeDb.SearchResults.findOne({
          where: {app_id: req.session.id}
        }).then(SearchResults => {

          res.locals.searchResults = resetTemplateData();
          res.locals.searchResults.currentLocationData = SearchResults.data.currentLocationData;
          res.locals.searchResults.forecastData = SearchResults.data.forecastData;
          res.locals.searchResults.locationData = SearchResults.data.locationData;
          res.locals.searchResults.locationName = SearchResults.data.locationName;
          res.locals.searchResults.locationBarBackGround = SearchResults.data.locationBarBackGround;
          res.locals.searchResults.mainViewBackGround = SearchResults.data.mainViewBackGround;
          res.locals.searchResults.forecast = true;

          res.locals.searchResults.availLocationsArray.push({
                index: SearchResults.data.locationName.length - 1,
                locationName: SearchResults.data.currentLocationData.locationName,
                sunsetTime: SearchResults.data.currentLocationData.sunsetTime,
                sunriseTime: SearchResults.data.currentLocationData.sunriseTime,
                utcOffSet: SearchResults.data.currentLocationData.utcOffSet,
                liveFormattedTime: timeDate.getCurrentTimeAtLocation(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset),
                timezone: SearchResults.data.forecastData[0].data.offset,
                day: timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime),
                tempFahrenheit: Math.floor(SearchResults.data.forecastData[0].data.currently.temperature),
                tempCelsius: convertTemp.toCelsius(Math.floor(SearchResults.data.forecastData[0].data.currently.temperature)),
                icon:`${SearchResults.data.forecastData[0].data.currently.icon}`,
                wiClass: getWiClass(SearchResults.data.forecastData[0].data.currently.icon, timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime)),
                currentCondition:`${SearchResults.data.forecastData[0].data.currently.summary}`
              });
          // make async axios api calls to get and process location and forecast data
          // in this content we have a searchResults table...
          // so we'll be adding to the data column of gthe searchResults table
          // so we're setting the first argument, update, to true
          makeApiCalls(true, req, res, next);

        }).catch(err => {
          next(new Error(`finding SearchResults`, err))
        });


      } else {

        // make async axios api calls to get and process location and forecast data
        // in this context we'll be creating a new searchResults table...
        // so setting the first argument, update, to false
        makeApiCalls(false, req, res, next);
      }

    } else {

      // so some might try to browse directly to the /weatherCurrent first
      // in that case, just create a new session with the new req.session.id and continue
      const session = {app_id: req.session.id};
      sequelizeDb.AppSessions.create(session)

       .then((AppSession) => {

         // make async axios api calls to get and process location and forecast data
         // in this content we have a searchResults table...
         // so we'll be adding to the data column of gthe searchResults table
         // so we're setting the first argument, update, to true
         makeApiCalls(true, req, res, next);

       }).catch(err => {

           // console.log('Error setting up Session... ', err);
           next(new Error('Error setting up Session... ', err));

       });
    }


  });


});

main.get('/tempType/:type', (req, res, next) => {

    // this simply sets a tempType flag to be used by both locationBar and mainView templates...
    // to show tempaerture in Celsius or Fahrenheit degrees

    res.locals.searchResults = resetTemplateData();;

    sequelizeDb.SearchResults.findOne({
      where: {app_id: req.session.id}
    }).then(SearchResults => {

      res.locals.searchResults = resetTemplateData();
      res.locals.searchResults.currentLocationData = SearchResults.data.currentLocationData;
      res.locals.searchResults.forecastData = SearchResults.data.forecastData;
      res.locals.searchResults.locationData = SearchResults.data.locationData;
      res.locals.searchResults.locationName = SearchResults.data.locationName;
      res.locals.searchResults.locationBarBackGround = SearchResults.data.locationBarBackGround;
      res.locals.searchResults.mainViewBackGround = SearchResults.data.mainViewBackGround;
      res.locals.searchResults.forecast = true;

      res.locals.searchResults.availLocationsArray.push({
            index: SearchResults.data.locationName.length - 1,
            locationName: SearchResults.data.currentLocationData.locationName,
            sunsetTime: SearchResults.data.currentLocationData.sunsetTime,
            sunriseTime: SearchResults.data.currentLocationData.sunriseTime,
            utcOffSet: SearchResults.data.currentLocationData.utcOffSet,
            liveFormattedTime: timeDate.getCurrentTimeAtLocation(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset),
            timezone: SearchResults.data.forecastData[0].data.offset,
            day: timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime),
            tempFahrenheit: Math.floor(SearchResults.data.forecastData[0].data.currently.temperature),
            tempCelsius: convertTemp.toCelsius(Math.floor(SearchResults.data.forecastData[0].data.currently.temperature)),
            icon:`${SearchResults.data.forecastData[0].data.currently.icon}`,
            wiClass: getWiClass(SearchResults.data.forecastData[0].data.currently.icon, timeDate.checkDay(SearchResults.data.forecastData[0].data.currently.time, SearchResults.data.forecastData[0].data.offset, SearchResults.data.forecastData[0].data.daily.data[0].sunsetTime, SearchResults.data.forecastData[0].data.daily.data[0].sunriseTime)),
            currentCondition:`${SearchResults.data.forecastData[0].data.currently.summary}`
          });

      const updateTime = (object, index) => {
        // call back to map availLocationsArray with updated time
        object.liveFormattedTime = timeDate.getCurrentTimeAtLocation(new Date(), res.locals.searchResults.forecastData[0].data.offset);
        return object;
      };

      if (req.params.type) {
        if ( req.params.type == "Fahrenheit"){
        res.locals.searchResults.tempTypeFahrenheit = true;
        } else if (req.params.type == "Celsius"){
        res.locals.searchResults.tempTypeFahrenheit = false;
        }
      res.locals.searchResults.availLocationsArray = res.locals.searchResults.availLocationsArray.map(updateTime);
      } // other wise make no changes

      res.render('index', res.locals.searchResults);

    }).catch(err => {
      next(err)
    });



})

// selected location calls weatherForecast route
// renders main view or detail of weather forecast for that location
main.get('/weatherForecast/:indexNo', (req, res, next) => {
  // requires already gecoded location and forecast data
  // otherwise redirect to home page
  // else renders mainView

  // resetting res.locals so cant access data without a session.id
  res.locals.searchResults = resetTemplateData();;
  sequelizeDb.SearchResults.findOne({
    where: {app_id: req.session.id}
  }).then(SearchResults => {

    // if there are SearchResults... continue
    if (SearchResults){

        res.locals.searchResults = resetTemplateData();
        res.locals.searchResults.currentLocationData = SearchResults.data.currentLocationData;
        res.locals.searchResults.forecastData = SearchResults.data.forecastData;
        res.locals.searchResults.locationData = SearchResults.data.locationData;
        res.locals.searchResults.locationName = SearchResults.data.locationName;
        res.locals.searchResults.locationBarBackGround = SearchResults.data.locationBarBackGround;
        res.locals.searchResults.mainViewBackGround = SearchResults.data.mainViewBackGround;
        res.locals.searchResults.forecast = true;

        if (res.locals.searchResults.forecast){

          res.locals.searchResults.arrayIndexNo = req.params.indexNo;

          res.locals.searchResults = showForecastDetail(res.locals.searchResults.arrayIndexNo, res.locals.searchResults);

          res.render('mainView/detail.pug', res.locals.searchResults);

        } else {

          res.render('index', res.locals.searchResults);
        }
    } else {
      // so might try to goto /weatherForecast route first...
      // in that case, just create a new session with the new req.session.id and continue
      const session = {app_id: req.session.id};
      sequelizeDb.AppSessions.create(session)

       .then((AppSession) => {

         res.locals.searchResults = {};
         res.locals.searchResults = resetTemplateData();
         // make async axios api calls to get and process location and forecast data
         // in this content we have a searchResults table...
         // so we'll be adding to the data column of gthe searchResults table
         // so we're setting the first argument, update, to true
         makeApiCalls(false, req, res, next);

       }).catch(err => {

           // console.log('Error setting up Session... ', err);
           next(new Error('Error setting up Session... ', err));

       });
    }
  })


});

// removes the correspondong forecast data object from location and mainView arrays
// redirect to home page,
// which renders the existing locationBars minus removed location
main.get('/removeLocation/:indexNo', (req, res, next) => {

  sequelizeDb.SearchResults.findOne({
    where: {app_id: req.session.id}
  }).then(SearchResults => {

    if (SearchResults != null){

        if (req.params.indexNo != null && !isNaN(parseInt(req.params.indexNo))){

        const updateSearchResults = removeLocation(req.params.indexNo, SearchResults.data);

        SearchResults.update(updateSearchResults)
          .then(SearchResults => {

            res.locals.searchResults = resetTemplateData();
            res.locals.searchResults.currentLocationData = SearchResults.data.currentLocationData;
            res.locals.searchResults.forecastData = SearchResults.data.forecastData;
            res.locals.searchResults.locationData = SearchResults.data.locationData;
            res.locals.searchResults.locationName = SearchResults.data.locationName;
            res.locals.searchResults.locationBarBackGround = SearchResults.data.locationBarBackGround;
            res.locals.searchResults.mainViewBackGround = SearchResults.data.mainViewBackGround;
            if (res.locals.searchResults.forecastData.length > 0){
            res.locals.searchResults.forecast = true;
          } else {
            res.locals.searchResults.forecast = false;
          }

            res.render('index', res.locals.searchResults);

          }).catch(err => {
            next(Error(`error removing locationdata fron and updated SearchResults`, err));
          });

        }
    } else {
      // just in case someone tries this route first...
      res.render('index', res.locals.searchResults);

    }

  }).catch(err => {
    next(Error(`error finding SearchResults with that session id`, err));
  })


});

module.exports = main;
