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

const createLoctions = locationName  => {
  // locationBars
  locals.searchResults.locationBarArray.push({locationName: locationName, tempFahrenheit:0, tempCelsius:-34, locationBarBackGround:'locationBar-clearDay', liveFormattedTime:`12:00 PM`, currentCondition:'clearDay', wiClass:"wi wi-day-sunny"});
  // mainViews
  locals.searchResults.mainViewArray.push({location:{name:locationName}, currentConditions: {tempFahrenheit:0, tempCelsius:-34, locationBarBackGround:'locationBar-clearDay', liveFormattedTime:`12:00 PM`, currentCondition:'clearDay', wiClass:"wi wi-day-sunny"}});
}
// home page, renders index, or initialView
main.get('/', (req, res, next) => {
  // renders the a title bar  and navbar with tempType controls
  // locationBar only renders as response from /weatherCurren
  res.render('index', locals.searchResults)

});

// now which routes to use routers with
main.get('/weatherCurrent', (req, res, next) => {
  // gecodes req.query.searchInput, uses result to get forecast data
  // send data back to home page usign a redirect

  locals.searchResults.arrayLength = locals.searchResults.locationBarArray.length;
  locals.searchResults.currentIndex = locals.searchResults.arrayLength - 1;
  createLoctions(req.query.geoCodeThis);
  res.redirect('/')
});

main.get('/weatherForecast:indexNo', (req, res, next) => {
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

module.exports = main;
