
# Project Gotchas

- For this project to be deployed live, to Heroku or AWS or some other hosting service...
  - the following 2 problem needs to be solved ...
  - how to prevent the /api backend-server route from being accessed via the internet
  - how to get server-side data back to the react-app
    - not using a internet accessible /api route

- POSSIBLE SOLUTION  
  - other than using a framework or solution outside the scope of this project
  - ie...using only REACT, NODE.JS/NPM/EXPRESS, NOSQL-ORM
  - use a session-store-like process to generate a custom api-key
  - write a route handler that requires your custom api-key
  - then hide that custom api key in your react-app using env vars and REACT_APP declaration
  - from location input form make a AXIOS call to the backendServer
    - submitting the custom api-key
  - on the server-side, when a axios call is made...
    - check for an api key, send back a not-auth err msg
    - check that the api key is valid, if not valid, send back a not-auth err msg
    - if valid, process the request and send back the data
  - delete custom api keys when each app session dies
  - allow only current active session's api keys to be flagged as valid
  - valid custom api keys would be generated and packaged with each new react-app session
    - this means that each time that a request is made to the home route
      - and the react app needs rendered to a client browser
      - then the entire react app needs be compiled as a new app.bundle

- GOAL
  - when a non-auth'ed request is made to the backendServer's /api route  
    - then that request is redirected to the front-end Weather app

- 1 of the GOTCHAs
  - a hacker could possibly, browse to the front-end site, get the custom api key
  - then use the custom api key separately from the react-app, but while the react-app's session is still live
  - Heroku's method for hiding environment variables is supposed to prevent this...
    - but it still prints a WARNING
      - that private api keys should not be embedded in react app-builds
- 2nd of the GOTCHAs
  - the API sources used in by this project, FORBID from allowing non-licensed members from seeing their raw api data
  - those members that do allow this would have their membership terminated

#  Developers:
- To run this project yourself...

  A: - clone this repo and configure npm to not allow dependency drift

     - this to keep newer versions of dependencies from getting installed
     - not having this may cause npm to install packages that dont work with this project
     ```
       $ npm config set save=true
       $ npm config set save-exact=true
     ```
    - prove to yourself that the setting took
     ```
        $ cat ~/.npmrc
     ```
  B: - get a DarkSky API Key
  - [DarkSky API](https://darksky.net/dev)

  C: - get a TomTom API Key to use their Search API
  - [TomTom Search API](https://developer.tomtom.com/search-api/search-api-documentation)

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
     -  the browser will replace your spaces with %20's

      http://localhost:3000/weather:London,%20England

      http://localhost:3000/weather:Tokyo,%20Japan

      http://localhost:3000/weather:New%20York,%20NY

      http://localhost:3000/weather:Chicago,%20IL

  H: - or goto my hosted WeatherX site...
  - [not Live yet](https://almostThere)

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
