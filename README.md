# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# Status:
I:  - In Dec. 2018, I had a death in the family, I am finally getting back to finishing this project
  1:  - in March 2019, studied up on NPM packages vulnerabilities and updates
      A: - could no longer wait for all vulnerabilities in create-react-app to be patched
      B: - found all other vulnerabilities had been patched in @Babel/core and latest WebPack
      c: - needed to move to SSR anyway...
        i:    - to read of my agony on this, see SSR-Planning and Implementation notes below
  2:  - as of April 1st 2019
      A:  - All branches of modules and code are patched and updated to latest packages
      B:  - My Sequelize code has not been migrated to latest Sequelize yet
        i:    - sequelize is still 4.42.1",
        ii:   - sequelize-cli is v5.4.0",
        iii:  - sqlite3 is 4.0.6"
  3: - I recently upgraded my project so I now have 1 Express Server
      A:  - implemented SSR for React front-end
      B:  - combined React front-end with back-end code
        i:    - [SSR-Planning notes](./SSR-PLANNING.md)
        ii:   - [SSR-Implementation notes](./SSR-Implementation.md)
        iii:  - [Preserved branch that keeps Backend and FrontEnd Servers separate ][https://github.com/pereznetworks/TD-Project12/tree/separateFEandBEserver]

# To Do:
  - 1: implement OAuth and a basic built-in json view for displaying queried json data
    - users can use the WeatheX app with no login
      - to get a "behind-the-curtain-look" of json data, will need to OAuth login
    - change data displayed to be the custom data-set used by the WeatherX app
      - full Darksky and TomTom dataset will not be accessible
        - users will need their own Darksky and TomTom developers accounts for that
  - 2: get ready for production build and deployment to hosting
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
