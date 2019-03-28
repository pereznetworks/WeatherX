# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# Status:

  - In Dec. 2018, I had a death in the family, I am finally getting back to finishing this project
     - I have recently been weighing decisions before finally publishing
       - I recently upgraded my project
         - implemented SSR for React front-end
         - combined React front-end with back-end code
         - [SSR-Planning notes](./SSR-PLANNING)
         - [SSR-Implementation notes](./SSR-Implementation)

# To Do:
  - 2: After a long detour, I am getting ready for production build and deployment to hosting
     - review HEROKU/Express/React Best Practices
     - compress or minify SSR React build, app.bundle.js and app.css
     - I am sure there are other production issues

# Current Features:

  - 1: Project Page : https://pereznetworks.github.io/TD-Project12/
  - 2: Security and Data-Processing
      - a: security and access-control headers
        - i: allow only GET requests
        - ii: allow only connection from WeatherX front-end host
        - iii: no OAuth, no Geo-Location - so no user data to keep track of
      - b: External REST API, is implemented and working
        - i: using sequelize/sqlite
          - deletes all data with each Search and response
          - per API usage terms
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

# My Captsone Project:  WeatherX : A Weather forecast service  

GeoCoding (Search) Services

Get Time and Weather of a given location,

Display current and forecast weather stats, warning and alerts will be displayed on side-bar-like area.

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

Although I used create-react-app to start the project...
- After a lot of agonizing and planning, I chose to leave it for a basic SSR Implementation.
  - [SSR-Planning notes](./SSR-PLANNING)
  - [SSR-Implementation notes](./SSR-Implementation)

# Standards:

Will be using javascript es6, web-apps best-practices, TLS2 security and web-standards!

# License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
