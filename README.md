# TD-Project12
Daniel Perez, Captsone - Team TreeHouse FSJS Project

Status:

  - 1: Front-end App and Back-end Server now working
      - a: security note: only the front-end server will be able to make requests from back-end server
        - i: allowing requests only from 1 specific ip address
        - ii: will have to keep this for production build 
  - 2: Front-end issue: fixed timezone issue
        - a: using my own custom code to adjust for timezone offset and format time displayed
        - b: may switch to dayjs-ext/momment-timezone depending on the progress either these modules
  - 3: backend issue: now able to return both geocoded and forecast results to front-end app
      - a: will need to switch to Mongod
      - b: want to be completely done with any changes to data models before switching to Mongod
  - 4: will need to switch away from [Weather-icons](https://www.npmjs.com/package/weather-icons)
      - a: since last publish was 4 years ago!

To Do:

  - front-end features:
    - 2: weather icons
    - 3: background animation of current weather at given location: raining, snowing, sunny, etc.

  - backend core:
    - 1: secure Mongod using mongoose.js
      - a: want to continue not using cookies if possible

  - production build and deployment to hosting


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

[MapBox](https://www.mapbox.com/) - for mapping services

[Forcast.io](https://darksky.net/dev/docs) - for weather forecast data


# Utility NPM packages to be used:

[Axios](https://www.npmjs.com/package/axios) - for making api calls

[Moment-timezone](https://github.com/moment/moment-timezone) - for converting date timestamps to given location timezone

[Weather-icons](https://www.npmjs.com/package/weather-icons) - for displaying icons to indicate forecasted weather conditions

# Standards:

Will be using javascript es6, web-apps best-practices, TLS2 security and web-standards!

# License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
