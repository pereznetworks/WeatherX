const express = require('express');
const main = express.Router();
const axios = require('axios');

// importing methods that access forecast.io and mapbox geocoding api
const getForecastApiCall = require('../dataSource').getForecastApiCall;
const getGeoCodeApiCall = require('../dataSource').getGeoCodeApiCall;
const manageForecastData = require('../dataSource').manageForecastData;
const manageLocData = require('../dataSource').manageLocData;
const sampleJson = require('../dataSource/models/sample.json');

    // the home or root route
    main.get('/', (req, res, next) => {
        res.json( [{"WeatherX notice":"authorized use only"}] );
        res.end();
    });

    // the weather route, returns current forecast
    main.get('/weather:location', (req, res, next) => {
        let removeLeading = /([^:])\w+/g;
        let locationArray = req.params.location.match(removeLeading);
        let locationString = locationArray.toString();
        let geoCodeApiCallUrl = getGeoCodeApiCall(locationString)

        if (!req.params.location || geoCodeApiCallUrl === 'Oops' ){
              let errorMsg = `Opps, it seems we did not receive a valid location: place type a city, state or zipcode, then a ',' followed by a country abbreviation`;
              next(new Error(`${errorMsg}`));
            }

        axios.get(geoCodeApiCallUrl)
          .then(response => {

                let longLat = response.data.results[0].position;
                let cityName = response.data.results[0].address.municipality;
                let province = response.data.results[0].address.countrySubdivision;
                let loc = {latitude:longLat.lat,longitude:longLat.lon, city: cityName, province: province };
                const db = manageLocData(loc);  // will nedd to replace this with mongoose code
                let forecastApiCallUrl = getForecastApiCall(db.mostRecentLocation.data);


                axios.get(forecastApiCallUrl)
                    .then(response => {
                    const db = manageForecastData(response.data);  // will nedd to replace this with mongoose code
                    res.json(db);
                }).catch(err => {
                    console.log('Error getting forecast data... ', err);
                      next(err);
                });

           }).catch(err => {
            console.log('Error geocding that location ... ', err);
            next(err);
          });
    });


module.exports = main;
