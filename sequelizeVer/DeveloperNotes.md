
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

/* for production, need to turn off all the console logging
  // could bring log to file module from code-base
    // then include option to :
      // turn on verbose or debug mode
        // default no logging */

/* need a way to drop/delete a table after certain amount of time
  // per API usage terms
    // use modelInstance.Destroy ?
      // apparently cant be used as async so cannt follow with .then().catch()
        // but the destroy() returns num of del instances */

  sequelizeDb.model.create()
    .then(modelInstance => {
      // do stuff
    }).then(() => {
      return sequelizeDb.model.destroy()
    }).then(numDels => {
      // does destroy() return an error instead of # deletes ?
      if (isNaN(numDels)){
        next(Error(`Oops, problems cleanning up model table`))
      } else {
        // what to do with numDels
        // need someway to QA this
        sequelizeDb.model.findAll()
          .then(found => {
            console.log(`found: ${found}\n`)
          }) // should return found and blank space
      }

    }).catch(err => {
      // response to and or log seqeulize create error
    })


```
