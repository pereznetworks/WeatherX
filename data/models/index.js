'use strict';

// code courtesy Team Treehouse, from FSJS Project 10
// removed fs, path and process.env
// dont need a db file, wont be storing data long term

// get sequelize environment variables
const Sequelize = require('sequelize');

// will have to figure out how to pass production environment variables ...
// const env = process.env.NODE_ENV || 'development';
const env = 'development';
const config = require('../config/' + 'config.json')[env];

// set seqeulize so it can accesss the db using settings from config.json
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
db.Forecasts = require('./forecastModel.js')(sequelize, Sequelize)
db.Locations = require('./locationModel.js')(sequelize, Sequelize);
db.AppSessions = require('./sessionModel.js')(sequelize, Sequelize);
db.SearchResults= require('./searchResultModel.js')(sequelize, Sequelize);

// model associatons - table joins

// moved these into the model definitions, becuase associated_table_id's were not being set, but are always null

// building table SearchResults so these first 2 associatons not needed
// db.AppSessions.hasMany(db.Locations);
// db.Locations.belongsTo(db.AppSessions);

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
