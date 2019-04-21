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

    // the weather route, returns current forecast
    main.get('/weather:location', (req, res, next) => {

      if (!req.params.location || geoCodeApiCallUrl === 'Oops' ){
        let errorMsg = `Opps, it seems we did not receive a valid location: place type a city, state or zipcode, then a ',' followed by a country abbreviation`;
        next(new Error(`${errorMsg}`));
      }

      console.log(`\n...processing new GET request...\nusing async functions, some of the following logs may seem to be out of order\n`);

      let removeLeading = /([^:])\w+/g;
      let locationArray = req.params.location.match(removeLeading);
      let locationString = locationArray.toString();
      let geoCodeApiCallUrl = getGeoCodeApiCall(locationString);

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
                let forecastApiCallUrl = getForecastApiCall(db[0].data);

                axios.get(forecastApiCallUrl)
                    .then(response => {

                    sequelizeDb.Forecasts.create(response)
                     .then( Forecast => {

                      db.push(manageForecastData(Forecast.dataValues.data));
                      res.json(db);

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

              }).catch(function(error){
                console.log(`error: ${error}`);
              });

           }).catch(err => {
            console.log('Error geocding that location ... ', err);
            next(err);
          });
    });


module.exports = main;
