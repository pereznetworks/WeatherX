const express = require('express');
const main = express.Router();
const axios = require('axios');

// importing methods that access forecast.io and mapbox geocoding api
const getForecast = require('../dataSource').getForecast;
const getLocationCoordinates = require('../dataSource').getLocationCoordinates;
const manageDb = require('../dataSource').manageDb;
const sampleJson = require('../dataSource/models/sample.json');

    // the home or root route
    main.get('/', (req, res, next) => {
        res.json( [{"WeatherX notice":"authorized use only"}] );
        res.end();
    });

    // the weather route, returns current forecast
    main.get('/weather:location', (req, res, next) => {

        // console.log(req.body)
        let loc = getLocationCoordinates(req.params.location)
        // console.log(loc);
        let apicall = getForecast(loc);
        // console.log(apicall);

        if (apicall === `Opps, it seems we did not receive a valid location: place type a city, state or zipcode`){
              return new Error(`${apicall}`);
            }

        res.json(sampleJson);

        // axios.get(apicall)
        //       .then(response => {
        //         let forecast = response.data;
        //         return forecast;
        //       }).then(forecast => {
        //         const db = manageDb(forecast);  // will nedd to replace this with mongoose code
        //         res.json(db.current);
        //       }).catch(err => {
        //         console.log('Error fetching or parsing data', err);
        //         next(err);
        //       });
        // })
        // .catch(err => {
        //   console.log('Error getting location', error);
        //   next(err);
        // });

    });


module.exports = main;
