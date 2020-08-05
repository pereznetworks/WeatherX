
// code courtesy Team Treehouse, from FSJS Project 10
// removed fs, path - since will be using PostgreSQL, instead of sqlite3
// added custom code to build model assoications

// get sequelize environment variables
const Sequelize = require('sequelize');

// set NODE_ENV to 'production' and place DB_NAME, USER_NAME and PASSWORD in a .gitignored env
  // BE SAFE: when running this code ...
    // it's best, even for development and test purposes, to...
      // keep in a secured server-side app only
          // NEVER STORE THE DB_NAME, USER_NAME AND PASSWORD in code
            // place the DB_NAME, USER_NAME AND PASSWORD in .gitignored env
               // then when running npm start or npm run dev
                  // it'll pick-up, login and access the PostgreSQL database

const env = process.env.NODE_ENV || 'development';

// set a config object to pass to seqeulize
let config = {};

if (env === 'development'){
  config = require('../config/' + 'config.json')[env];
} else {
  config = require('../config/' + 'config.json')[env];
  config.database = process.env.DB_NAME;
  config.username = process.env.USER_NAME;
  config.password = process.env.PASSWORD;
}

// set seqeulize so it can accesss the db using settings from config
let sequelize = new Sequelize(config.database, config.username, config.password, config);

// create a db object that matches the tables created from model definitions
const db = {};
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// add the entire seqeulize library to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// importing models
// assigning these as part of db object
db.Forecasts = require('./forecastModel.js')(sequelize, Sequelize);
db.Locations = require('./locationModel.js')(sequelize, Sequelize);
db.AppSessions = require('./sessionModel.js')(sequelize, Sequelize);
db.SearchResults= require('./searchResultModel.js')(sequelize, Sequelize);

// model associatons - table joins

// associating SearchResults belong to AppSessions
// Forecasts belongTo Locations

// the 'CASCADE' setting allows foreignKey fields to be auto-updated when...
    // there is an onUpdate and onDelete event...
    // when fields from associated tables are changed

// data from TomTom and Forecast.io does not need to be validated
// so data retrieved from these sources is being stored in a JSON blob data-type field
// ADD ITEM TO WISH LIST : model and validate TomTom and Forecast.io data

db.Forecasts.belongsTo(db.Locations, {
      foreignKey: 'Locations_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

db.SearchResults.belongsTo(db.AppSessions, {
      foreignKey: 'AppSessions_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

// export the db
module.exports.Sequelize = Sequelize;
module.exports.db = db;
