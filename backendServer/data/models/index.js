'use strict';

// code courtest\y Team Treehouse, from FSJS Project 10

// yes, will be parsing folder paths, loading and reading files
// const fs = require('fs');
// const path = require('path');

// get sequelize environment variables
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';

const env = 'development';
const config = require('../config/' + 'config.json')[env];
const db = {};

// set seqeulize so it can accesss the db using settings from config.json
let sequelize = new Sequelize(config.database, config.username, config.password, config);

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// use the settings captured above to check for existence of a db file
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// create a db object that matches the tables created from model definitions
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
