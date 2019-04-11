# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# Reviewers and Developers:
- To run this project yourself...

  A: - clone this repo and configure npm to not allow dependency drift
    - this to keep newer versions of dependencies from getting installed
      - which may cause the project to not run
     ```
       $ npm config set save=true
       $ npm config set save-exact=true
     ```
    - prove to yourself that the setting took
     ```
        $ cat ~/.npmrc
     ```
  B: - get a DarkSky API Key
  [DarkSky API](https://darksky.net/dev)
  C: - get a TomTom API Key to use their Search API
  [TomTom Search API](https://developer.tomtom.com/search-api/search-api-documentation)
  D: - place your keys in an index.js file in the folder path...
      - this file already has an entry in the project's .gitignore file
        - backendServer/config/index.js
    ```javascript
      module.exports.forecastKey = "0123456789abcdefghiklmnop"; // replace with your DarkSky key
      module.expports.geoCodeKey = "0123456789abcdefghiklmnop"; // replace with your TomTom key
    ```
  E: - from a unix shell prompt run npm i and npm start
    ```
        $ npm i
        $ npm start
    ```
  F: - browse to http://locahost:3000 to get the REACT APP
  G: - browse to http://localhost:3000/weather:location
      - replace the param, 'location', with a city, state or a city, country, like so...
        - London, England
        - Tokyo, Japan
        - New York, NY
        - Chicago, IL
  H: - or goto my hosted WeatherX site...
    [not Live yet](https://almostThere)

# GO-LIVE Date: May 1, 2019:

- STEPS
  - I: Recheck and complete all project requirements
  - II: Recheck and complete all project exceed requirements
  - III: Finish ToDo item # 1
  - IV: Finish ToDo item # 2 - Publish and GO-LIVE
  - V: Finish Documentation and Submit project

# To Do:
  - 1: Due to DarkSky and TomTom licensing and data usage terms....
    - need to move data integration modules from react-app src code to server code
    - react-app only needs to do the data integration once
      - react-app will get the time, day-of-week, day-or-night, timezone, etc...
        - already calculated in res.data from server  
        - and will be using custom types of my own
    - the data displayed in json format using api route, /weather:location, will be...
      - data derived from my custom code
        - so I will not need to worry about DarkSky/TomTom use-terms
        - since the data displayed is mostly my derived data not theirs
      - have calculated custom location, weather, timestamp types
        - this means....
          - others cannot simply use my api route as way around DarkSky/TomTom's developer licensing
    - some modules, live the live time-clock, will need to stay in react-app src code,
      - but will get the needed timestamp to start with

  - 3: get ready for production build and deployment to hosting
     - review HEROKU/Express/React Best Practices
     - compress or minify SSR React build, app.bundle.js and app.css
     - I am sure there are other production issues


# As of April 1st 2019: Death in the Family, 1 Server, 2 Routes
- I: In Dec. 2018, I had a death in the family, I am finally getting back to finishing this project
  - 1: I have been following create-react-app and NPM package vulnerabilities and updates
      - A: could no longer wait for all vulnerabilities in create-react-app to be patched
      - B: found all other vulnerabilities had been patched in @Babel/core and latest WebPack, etc..
      - C: needed to move to SSR anyway...
        - i: to read of my agony on this, see SSR-Planning and Implementation notes below
  - 2: as of April 1st 2019
      - A: For all branches, code migrated and modules are patched, updated to latest packages
      - B:  My Sequelize code has not been migrated to latest Sequelize yet
        - i: sequelize is still 4.42.1",
        - ii: sequelize-cli is v5.4.0",
        - iii:  sqlite3 is 4.0.6"
  - 3: also upgraded my project so I now have 1 Express Server
      - A: implemented SSR for React front-end
      - B: combined React front-end with back-end code
        - i:  [SSR-Planning notes](https://github.com/pereznetworks/TD-Project12/blob/master/SSR-PLANNING.md)
        - ii: [SSR-Implementation notes](https://github.com/pereznetworks/TD-Project12/blob/master/SSR-Implementaton.md)
        - iii: [Preserved branch that keeps Backend and FrontEnd Servers separate ](https://github.com/pereznetworks/TD-Project12/tree/separateFEandBEserver)
  - 4: 1 Server, 2 routes
      - A: the home, root, route responds with the WeatherX React app
      - B: the /weather:location route responds with forecast and location data in json format for given location
      - C: all other routes and path attempts route back to a friendly helper msg in json format

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
  - 5: Combined 3 and 4 into 1 Server, 2 routes
      - a: '/', runs React SSR, using only Babel/Webpack and 1 Webpack plugin
      - b: '/weather:location' routes is the REST API route

# My Captsone Project:  WeatherX : A Weather forecast service  

GeoCoding (Search) Services

Get Time and Weather of a given location,

Display current and forecast weather stats, warning and alerts will be displayed on side-bar-like area.

# Technologies to be used:

Thanks to [Team TreeHouse](https://teamtreehouse.com), a great place for makers, breakers, engineers... really anyone to brush-up on, gain new, or even get started in Software Development.

This project uses [Node.js](https://nodejs.org/) and [Express.Js](https://expressjs.com/) for https server and routing.

For database using [Sequelize v4, SQLite v3 and Sequelize-CLI](http://docs.sequelizejs.com/)

[React.Js](https://reactjs.org/) or front-end UI/UX, [Babel](https://babeljs.io/) and [WebPack](https://webpack.js.org/concepts) for compiling React Components after ejecting from react-scripts.

About SSR, although I used create-react-app to start the project...
- After a lot of agonizing and planning, I chose to leave it for a basic SSR Implementation.
  - [SSR-Planning notes](./SSR-PLANNING)
  - [SSR-Implementation notes](./SSR-Implementation)

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
