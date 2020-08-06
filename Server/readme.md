# WeatherX Server

backend server to provide front-end WeatherX app with data from several external sources

## TODO

 - re-build rest-api
 - rebuild server-side-react components
 - update sequelize code and model to v6

## Testing:

# Cluster Server

  - Per Heroku Deployement Best Practice, Throng, is used for simple clustering abstraction

# Secure Headers & Auth

- Per Express.js Best Practice, using HELMET for basic secure Headers

  - Access-Control headers set to only allow specific host to make requests from server
    - Only allowed METHOD is `GET`  
    - path `/weather:location` yields json formatted forecast and location data

  - need to allow only the WeatherX front-end app to make requests

  - load the react front-end app from the WeatherX server itself..?


# Data Processing - short version

  - this data processing model is driven by TomTom and DarskSky API uage terms

  - sequelize, sequelize-cli

  - pg, pg-hstore
    - may try using pg-hstore to read, validate and process data from external sources

  - starting with fresh empty database
    - instance of Location table created and data processed
    - instance of Forecast table created and data processed
    - after res.json(data)
    - then both instances destoryed

  - no data is saved

  - manageLocData and manageForecastData object
    - these methods create a local scoped db object
    - which gets trashed after each get request

# Axios & Data processing:

  - used for `/weather:location`

  - 1st api call to TomTom
    - returns geocoded data for req.param.location
    - geocoded data used to create a Location sqlite doc instance

  - 2nd api call to DarskSky.net
    - response.coordinates from TomTom api call used as arg
    - forecast data used to create a Forecast sqlite doc instance

  - data from Location and Forecast instance ..
    - mapped into a json object, using manageLocData and manageForecastData methods
    - returned as res.json to get req

  - both sqlite Location and Forecast doc instances..
    - are destroyed

  - manageLocData and manageForecastData objects are set to null


# TODO: Connection Pooling for sequelize/sqlite?
```javascript

/* for production, pooling will need to addressed */

  {
    "production": {
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    }
  }
```

# TODO: Logging
  - for production, need to turn off all the console logging

```javascript
/* could bring log to file module from code-base
     then include option to :
       turn on verbose or debug mode
         default no logging */

```
