# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# GO-LIVE Date: May 1, 2019:  
[Project Site](./)

# PROJECT UPDATE:
  - Well after much consternation it looks like I will be dropping REACT... :disappointed_relieved:
    - then main issue is deploying a REACT app that access data using server-side database
      - with only REACT, either WEBPACK/BABEL or CREATE-REACT-APP, and REACT-ROUTER on NODE.JS/EXPRESS using MONGOD or PostgreSQL or  MYSQL
      - where the /api route is not accessible via the internet
      - there are many solutions, which unfortunately are outside the scope of this project

# PROJECT 12 v.0.0.2
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


# GITHUB PROJECT DECISIONS:
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
