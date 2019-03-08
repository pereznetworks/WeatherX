# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# Status:

  - 1: Project Site Online : https://pereznetworks.github.io/TD-Project12/
  - 2: Security and Data-Processing
      - a: only the front-end server can make req from back-end server
        - i: security and access-control headers
              - allow only GET requests
              - allow only connection from WeatherX front-end host
        - ii no OAuth, no Geo-Location - so no user data to keep track of
      - b: Geo-Location, OAuth, db-server accessible via network port not implemented
        - i: using sequelize/sqlite, internal database only, which deletes all data every time
  - 3: Front-end features working:  
      - a: geocoding working
      - b: timeDisplay for each Location
      - c: current and forecast data for each location
      - d: add and removal of each location
      - e: form input validation before submitting location search
      - f: attributions in place
  - 4: Backend working:
      - a: returning forecast data
      - b: returning location data
      - c: security protocols in place

# To Do:
  - 1: get ready for production build and deployment to hosting


# My Captsone Project:  WeatherX : A Weather forecast service  

GeoCoding (Search) and Geo-Location Services

Get Time and Weather of a given location,

Display current and forecast weather stats, warning and alerts will be displayed on side-bar-like area.

# WeatherX app

[Details and Status of WeatherX App](https://github.com/pereznetworks/TD-Project12/tree/master/WeatherX/readme.md)

# WeatherX server

[Details and Status of WeatherX Server](https://github.com/pereznetworks/TD-Project12/tree/master/WeatherX-Server/readme.md)

# Technologies to be used:

Thanks to Team TreeHouse, https://teamtreehouse.com, a great place for makers, breakers, engineers... really anyone to brush-up on, gain new, or even get started in Software Development.

This project uses Node.js, https://nodejs.org/ and Express.Js,"https://expressjs.com/" for https server and routing.

For database using [Sequelize v4, SQLite v3 and Sequelize-CLI](http://docs.sequelizejs.com/)

React.Js, https://reactjs.org/ or front-end UI/UX, and Babel.js, https://babeljs.io/, for compiling JSX

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
