const express = require('express');
const main = express.Router();

// importing static variables to pass to rendered view
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
  }
}

// convert Fahrenheit to Celsius and Celsius to Fahrenheit
const convertTemp = (tempType, tempNum) => {

  if (tempType  == "Celsius"){
    // so converting from Fahrenheit to Celsius
    return ((tempNum - 32 ) / 1.8).toPrecision(4);
  } else {
    // else converting to Fahrenheit from Celsius
    return (tempNum *  1.8) + 32;
  }

 // end convertTemp()
}

// create arrays containing current and forecast weather for requested locations
// add to locals
const createLoctions = locationName  => {
  let locationTemp = 0;
  // doing this here means only a valid query will set forecast flag true
  locals.searchResults.forecast = true;
  // locationBars
  locals.searchResults.locationBarArray.push(
    {
      locationName: locationName,
      tempFahrenheit:locationTemp,
      tempCelsius: convertTemp("Celsius", locationTemp),
      locationBarBackGround:'locationBar-clearDay',
      liveFormattedTime:`12:00 PM`, currentCondition:'clearDay',
      wiClass:"wi wi-day-sunny"
    }
  ); // end locationBarArray.push
  // mainViews
  locals.searchResults.mainViewArray.push(
    {
      location:
          {
            name:locationName
          },
       currentConditions:
          {
            tempFahrenheit:0,
            tempCelsius:-34,
            mainViewBackGround:'locationBar-clearDay',
            liveFormattedTime:`12:00 PM`,
            currentCondition:'clearDay',
            wiClass:"wi wi-day-sunny"
          }
    }
  ); // end mainViewArray.push

// end createLoctions()
}

const removeLocation = indexNo => {
  locals.searchResults.locationBarArray.splice(indexNo, 1);
  locals.searchResults.mainViewArray.splice(indexNo, 1);
}
// renders index, home page or initialView
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
  locals.searchResults.arrayLength = locals.searchResults.locationBarArray.length;
  locals.searchResults.currentIndex = locals.searchResults.arrayLength - 1;
  createLoctions(req.query.geoCodeThis);
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
