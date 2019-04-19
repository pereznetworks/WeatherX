# WeatherX Server

backend server to provide front-end WeatherX app with data from several external sources

## TODO

 - prep for production build !
   - integrate with front-end server
 - Connection Pooling setting for sequelize ?
 - should I implement a better Logging module, besides to the console ?
   - I think Heroku's App management/dashboard may have some tools
   - preferable logging I can turn on and off,

- place api keys in a gitignored .env
  - file starting with each with REACT_APP_NAME_OF_KEY..
  - modify code use ...
`const REACT_APP_NAME_OF_KEY = process.env.REACT_APP_NAME_OF_KEY;`

## Working:

# Cluster Server

  - Per Heroku Deployement Best Practice, Throng, is used for simple clustering abstraction

# Secure Headers & Auth

  - Per Express.js Best Practice, using HELMET for basic secure Headers
  - Access-Control headers set to only allow specific host to make requests from server
  - Only allowed METHOD is `GET`  
  - path `/weather:location` yields json formatted forecast and location data

  - need to allow only the WeatherX front-end app to make requests

  - However, I may want to
    - load the react.js front-end app from the WeatherX server itself..?
    - but don't want to mistakenly publish my api keys

  - Current implementation means that
    - No matter where a user accesses the WeatherX front-end server from...
    - TomTom and DarskSky API's will only know the origin of requests as coming from WeatherX server
    - WeatherX front-end only communicates with the WeatherX Server  

# Data Processing - short version

  - this data processing model is driven by TomTom and DarskSky API uage terms

  - sequelize@4, sqlite@3 and sequelize-cli@4

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
