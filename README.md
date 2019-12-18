# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# After a couple of months, I am back to finally finish this project.

[Project Site](./)

# Project Status: 12/15/2019
  - Reviewing project again
  - Reviewing deployment to Heroku
  - Once done, will see about submitting and finishing Tech Degree

# Project Status: 8/15/2019: Currently doing a complete review
  - I will still only use geo-coding, no geo-location.
  - I would like to apply more of an object-oriented approach
  - checking that app matches project instructions and scope
    - using 2 public api
    - using a rest-api
    - using a RWD front-end
    - using a secure session store to create an individualized app experience
    - html5 form input validation
  - npm packages
    - mainly need to watch for any vulnerabilities
  - security and best practices
    - using Express.js and Heroku recommendations
  - my code base
    - built custom method around Axios for server-side secure async external api calls
    - rest-api
      - routes for each view of the app
      - accessing any route first directs to home route to make sure users get a secure session id
    - database
      - fixed some minor differences between PostgreSQL and SQ-Lite
      - secure sessions and internal data
        - need to abide by DarkSky and TomTom api usage rules
        - have ditched SQL-Lite and now using PostgreSQL
          - Heroku has PostgreSQL as their free built-in db offering
    - front-End
      - dropped React.js, now PUG for rendering
  - unit tests
    - have to make sure the development unit tests I have been using can be used with project submission
  - hosting requirements
    - will be using Heroku

# PROJECT UPDATE: JUNE 2, 2019
- Development status for v.0.2.0: Complete
  - Session and Internal database using Sequelize, PostgreSQL Data Models, Methods
  - Web App and Routes enabled using Express.js for home, weatherCurrent, tempType, weatherForecast and removeLocation
  - Rendering using Pug, for Views and integration of data
  - some Front-end javascript for switching between Celsius and Fahrenheit, and a real-time clock display
  - HTML/CSS RWD layout for all basic device screen sizes

- DONE
  - verified project Expectations
    - use frameworks covered in the FSJS Techdegree Units  
    - Connect to at least two APIs
    - Display data from at least two other web sites by connecting to their API
    - Response Front-End design and layout
      - not using Bootstrap, (Extra credit #2)
      - instead using custom responsive CSS layout
    - using database
      - Sequelize, PostgreSQL for data-management and session-store
    - Check for using JSHint and fixed issues
    - using a GitHub repository
    - local clone runs using npm i and npm start
  - verified EXTRA CREDIT features match speqs
    - Use more than two APIs in your app
      - using axios to make secure api calls to ...
        - forecast.io, tomtom
    - Write custom CSS to layout and style your app
      - all css and html is custom
    - Use HTML5 validation
      - only have 1 input field, using required field for HTML validation

- TODO

  - Check EXTRA CREDIT features match speqs
    - Write unit tests for your code using Mocha.js
      - and an assertion library like Chai
  - LAST code-review
    - add DESTROY method so Forecast and Location table are deleted ...
      - each time SearchResults.data row is updated with new forecast and location data
    - add DESTROY method so SearchResults table is deleted when session.id is expired
      - then need remove that AppSession.id row
    - Re-check that code fits 'DRY' and is a modular a possible
  - Deploy project to Heroku and use a public URL, and submit the URL for review


# PROJECT UPDATE: May 1, 2019
  - Well after much consternation it looks like I will be dropping REACT... :disappointed_relieved:
    - then main issue is deploying a REACT app that accesses data using a server-side database
      - with only REACT, either WEBPACK/BABEL or CREATE-REACT-APP, and REACT-ROUTER on NODE.JS/EXPRESS using MONGOD or PostgreSQL or  MYSQL
        - main trouble is passing the data to the react components
        - where the /api route is not accessible via the internet (fetch/axios)
      - there may be solutions
        - which unfortunately are outside the scope of this project

# PROJECT 12 v.0.2.0 Strategy
  - So I will be implementing the views of my Weather App using PUG….
    - on the bright-side I will finally be deploying my app and submitting... :laughing:
  - so on my express server
    - the home page will be rendered with a simple app header and input form
    - ….after….location input is submitted
    - …the server receive the location input via get /:location route,  I think
    - the server will make the api calls, response will be stored, indexing of data using PostgreSQL db,
    - model validation and and data model methods will process the data
    - then data points will be dropped into HTML using PUG templates
    - the home view will re-rendered again, with a sub-view containing a location-Bar, for the weather forecast summary
    - I will not have a backend server…
    - just a front-end server with 2 routes:
      - 1 for home, which have the input search form as a sub-view
        - and also will also render the weather-summaries sub-view for each location…
        - and then the full weather-details view that is rendered when a location-weather-summary is clicked-on…
  - well that's it :sweat_smile:  
    - of course many details to work out…
    - but I now see light at the end of my tunnel…. :joy:


# GITHUB PROJECT DECISIONS FOR REACT-VERSION:
  - I will be preserving the current master branch as a branch or even a fork on another project github repo.
  - I will be implementing the same overall UI, css-grid, html, ui-color design and weather-icons, but using PUG templates

# STEPS:
  - I: review project standard and exceed requirements and re-design weather-app using EXPRESS, PUG and PostgreSQL
  - II: plan modules and write unit-tests using Mocha-Chai
  - III: add any custom code following the module-pattern and npm, so that these can be re-used, and as beginning of a code-base
  - IV: Rewrite project to use pug-html rendering and associated routes
  - V: use a Heroku supported PostgreSQL Implementation
  - VI: implement Heroku best practice in process of doing steps I through IV
  - VII: test and fix any UI and Server-side bugs
  - VII: perform Heroku and Express pre-deployment steps
  - IX: deploy to Heroku live - retest all modules and modiules of project
  - X: Finish Documentation and Submit project

# FINAL PUSH:
  - now for the final push on this project…. on your mark, get set.. :runner:

# PROJECT Documentation

  I of course will be rewriting the project-documentation and the project-site for this project

# License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
