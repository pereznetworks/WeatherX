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

// model associatons - table joins
db.Locations.hasOne(db.Forecasts);
db.Forecasts.belongsTo(db.Locations);

// export the db
module.exports = db;
