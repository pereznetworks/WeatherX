# TD-Project12
Daniel Perez, Captsone - Team TreeHouse FSJS Project

Status:

  - 1: Front-end App and Back-end Server now working
      - a: security note: only the front-end server can make req from back-end server
        - i: allowing requests only from 1 specific ip address
        - ii: will have to keep this for production build
  - 2: Front-end features working:  
      - a: geocoding working
      - b: timeDisplay for each Location
      - c: current and forecast data for each location
      - d: add and removal of each location
      - e: form input validation before submitting location search
  - 3: Backend working:
      - a: now able to return both geocoded forecast results to front-end app
      - b: returning timezone, long/lat coordinates and location name

To Do:

  - 1: front-end features:
    - a: newer weather icon module
    - b: geolocation?  May leave for next version.
  - 2: backend core:
    - a: secure Mongod using mongoose.js
    - b: want to continue not using cookies if possible
  - 3: production build and deployment to hosting


# My Captsone Project:  Weather forecast service  

GeoCoding (Search) and Geo-Location Services

Get Time and Weather of a given location,

Display current and forecast weather stats, warning and alerts will be displayed on side-bar-like area.

# WeatherX app

[Details and Status of WeatherX App](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX/README.md)

# WeatherX server

[Details and Status of WeatherX Server](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX-Server/readme.md)

# Technologies to be used:

Thanks to Team TreeHouse, https://teamtreehouse.com, a great place for makers, breakers, engineers... really anyone to brush-up on, gain new, or even get started in Software Development.

This project uses Node.js, https://nodejs.org/ and Express.Js,"https://expressjs.com/" for https server and routing.

I use Mongoose, https://mongoosejs.com/", for db backend.

React.Js, https://reactjs.org/ and Babel.js, https://babeljs.io/, for front-end UI/UX.

# This project integrates data from several API sources:  

[TomTom](https://developer.tomtom.com/maps-sdk-web) - for geocoding/geolocation services

[Forcast.io](https://darksky.net/dev/docs) - for weather forecast data

# Utility NPM packages to be used:

[Axios](https://www.npmjs.com/package/axios) - for making api calls

[Weather-icons](https://www.npmjs.com/package/weather-icons) - for displaying icons to indicate forecasted weather conditions

I wrote my own Date and Time conversion methods

# Standards:

Will be using javascript es6, web-apps best-practices, TLS2 security and web-standards!

# License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
