/*
  for producton
    pooling will need to addressed
*/

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

/* need a way to drop/delete a table after certain amount of time */
