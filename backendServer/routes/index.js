const express = require('express');
const main = express.Router();
const axios = require('axios');

// limiting /weather:location to only GET reqs from SAME-ORIGIN as SERVER

main.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET")
  next();
});

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

    // // the home or root route
    // main.get('/', (req, res, next) => {
    //     res.json( [{"WeatherX notice":"authorized use only"}] );
    //     res.end();
    // });

    // the weather route, returns current forecast
    main.get('/weather:location', (req, res, next) => {

      if (!req.params.location || geoCodeApiCallUrl === 'Oops' ){
        let errorMsg = `Opps, it seems we did not receive a valid location: place type a city, state or zipcode, then a ',' followed by a country abbreviation`;
        next(new Error(`${errorMsg}`));
      }

      console.log(`\n...processing new GET request...\n`);

      let removeLeading = /([^:])\w+/g;
      let locationArray = req.params.location.match(removeLeading);
      let locationString = locationArray.toString();
      let geoCodeApiCallUrl = getGeoCodeApiCall(locationString);

        axios.get(geoCodeApiCallUrl)
          .then(response => {

            sequelizeDb.Location.create(response)
              .then(Location => {

                let longLat = Location.dataValues.data.results[0].position;
                let cityName =  Location.dataValues.data.results[0].address.municipality;
                let province =  Location.dataValues.data.results[0].address.countrySubdivision;
                let loc = {latitude:longLat.lat,longitude:longLat.lon, city: cityName, province: province };
                const db = manageLocData(loc);
                let forecastApiCallUrl = getForecastApiCall(db.mostRecentLocation.data);

                axios.get(forecastApiCallUrl)
                    .then(response => {

                    sequelizeDb.Forecast.create(response)
                     .then( Forecast => {

                      const db = manageForecastData(Forecast.dataValues.data);
                      res.json(db);

                      // not keeping data, part of TomTom usage terms
                      sequelizeDb.Forecast.destroy({force:true,truncate:true});

                    }).then(()=>{
                       // prove that data in tables deleted, should console the word, 'found:' followed by nothng, twice
                        // may write this to a log instead of logging to console
                       sequelizeDb.Location.findAll().then(found => console.dir(`found: ${found}`)).catch(err => console.log(err));

                    }).catch( err => {
                        console.log('Error getting forecast data... ', err);
                        next(err);
                     });

                }).catch(err => {
                    console.log('Error getting location data... ', err);
                      next(err);
                });

              }).then(()=>{
                // not keeping data, part of DarkSky API usage terms
                sequelizeDb.Location.destroy({force:true,truncate:true})

              }).catch(function(error){
                console.log(`error: ${error}`);
              });

           }).catch(err => {
            console.log('Error geocding that location ... ', err);
            next(err);
          });
    });


module.exports = main;
