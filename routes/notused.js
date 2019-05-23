
// original functon from react version
// make api calls and process geocoded location and weather data
const getForecastOriginal = function(req, res, next){
  // resetting forecast flag just in case this is not the first forecast retreived
  res.locals.searchResults.forecast = false;

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

                    res.locals.searchResults.forecastData = [...res.locals.searchResults.forecastData, newForecast.data[1]];
                    res.locals.searchResults.locationData =  [...res.locals.searchResults.locationData, newForecast.data[0]];
                    res.locals.searchResults.locationName = [...res.locals.searchResults.locationName, `${newForecast.data[0].data.city}, ${newForecast.data[0].data.province}`];
                    res.locals.searchResults.currentLocationData = {
                      index: res.locals.searchResults.forecastData.length,
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
                    res.locals.searchResults.availLocationsArray = [...res.locals.searchResults.availLocationsArray, {
                      index: res.locals.searchResults.forecastData.length,
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
                    res.locals.searchResults.locationCount = res.locals.searchResults.locationCount + 1;
                    res.locals.searchResults.mainViewBackGround = [...res.locals.searchResults.mainViewBackGround, timeDate.mainView(newForecast.data[1].data)];
                    res.locals.searchResults.locationBarBackGround =  [...res.locals.searchResults.locationBarBackGround, timeDate.locationBar(newForecast.data[1].data)];

                    // doing this here means only a valid query will set forecast flag true
                    res.locals.searchResults.forecast = true;

                    res.render('index', res.locals.searchResults);

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
    res.render('index', res.locals.searchResults);
  }
};

// get search results by session id and index from seqeulize db
const getForecast = function(sessionId, location){

   if (sessionId){

       sequelizeDb.AppSessions.findOne({where: {app_session_id: sessionId}})
         .then(response => {
           console.log(`${response}\n, ${location}`);
           res.locals.searchResults = response;
           res.locals.searchResults.forecast = true;
         }).catch((err) =>{
           console.log(`Oops, we had problems finding a forecast for "${sessionId}":\n ${err}`);
           res.locals.searchResults.forecast = false;
         });
   }

   // // the increase indexs, save input to geoCodeThis array
   // res.locals.searchResults.arrayLength = res.locals.searchResults.locationBarArray.length;
   // res.locals.searchResults.currentIndex = res.locals.searchResults.arrayLength - 1;
};
