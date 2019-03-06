# WeatherX Server

backend server to provide front-end WeatherX app with data from several external sources

[for detail on external source data and development roadmap see WeatherX app readme ](https:github.com/pereznetworks/TD-Project12/blob/master/WeatherX/README.md)

## TODO

Production and best-practice-security features needed for production build

## Status:

# Location and Forecast data processing:

  - starting with fresh empty database
    - instance of Location table created and data processed
    - instance of Forecast table created and data processed
    - after res.json(data)
    - then both instances destoryed

  - no data is saved

  - manageLocData and manageForecastData
    - these methods create a local scoped db object
    - which gets trashed after each get request

## To Do:

# the following items are still a work in progress...

# DEPLOYMENT BEST PRACTICE
  - already usng npm and git

  - already using npmrc

  - already using javascript es6

  - Clustering, see section below

  - use PostgreSQL instead of sqlite
    - the reasons for this are valid but do not apply to this server's REST-API implementation
    - no data from API SOURCES will be saved or stored
    - no auth or user data will ever need to be saved

# Clustering

 - Heroku deployment indicates that built-in clustering is BEST PRACTICE
  - some of the options are ....
    - CLUSTER
     - looks like a great cluster abstraction but,
     - does not run on node > v4, and hasn't updated in 2012
     - perhaps can look into forking the GITHUB repo for it and updating it
    - FORKY
      - embedding calls to node's cluster module in your code
      - manual management of processes
 - so for now ...
   - using the THRONG for cluster abstraction, even though last update was 2016
   - but using seems more straight-forward
   - and is still a choice of preference on Heroku's Dev Docs

# Connection Pooling
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

# Logging
  - for production, need to turn off all the console logging

```javascript
/* could bring log to file module from code-base
     then include option to :
       turn on verbose or debug mode
         default no logging */

```

# Per API usage terms, don't keep data
 - this one is working, but need a built in QA for this

```javascript

/* need a way to drop/delete a table after certain amount of time
   per API usage terms
     use modelInstance.Destroy ?
       apparently cant be used as async so cannt follow with .then().catch()
         but the destroy() returns num of del instances */

  sequelizeDb.model.create()
    .then(modelInstance => {
       do stuff
    }).then(() => {
      return sequelizeDb.model.destroy()
    }).then(numDels => {
       if error, does destroy() return an error instead of # deletes ?
      if (isNaN(numDels)){
        next(Error(`Oops, problems cleanning up model table`))
      } else {
         what to do with numDels
         need someway to QA this
        sequelizeDb.model.findAll()
          .then(found => {
            console.log(`found: ${found}\n`)
          })  should return found and blank space
      }

    }).catch(err => {
       response to and or log seqeulize create error
    })


```
