// WeatherX server

'use strict'; // makes sure, among other things, that no unneeded errors creep into my code

// for use when deploying into production, otherwise use env='development' and port=9999
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 9999;

// importing Express, and set the port it will accept connections on
const express = require('express');

// creating an Express 'server', don't want to confuse with 'front-end' part of this project
const server = express();

// setting up a routes module
const routes = require('./routes/index.js');

// require modules...
const jsonParser = require('body-parser').json; // importing body-parser's json method for parsing JSON data
const logger = require('morgan'); // import a middleware logger module.. see NPM's Morgan PKG page for details

// using sequelize for data ...
// importing from models/index.js
// .. which sets config, checks for or creates a db, imports models into sequelize
// .... then imported here
const sequelize = require('./data/models').sequelize;

// connect modules to express server, make available to all other Express server.methods
server.use(jsonParser()); // parse all req.body data as json and
server.use(logger('dev')); // Concise output colored by response status for development use.

// secruity measures
const helmet = require('helmet')
server.use(helmet());

// allow requests from specific host
server.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['http://10.100.10.102:3000']);
	res.append('Access-Control-Allow-Methods', ['GET']);
	res.append('Access-Control-Allow-Headers', ['Content-Type']);
	next();
});

// insert custom routes router here
server.use(routes);
server.use('/', routes);
server.use('/weather', routes);


// prevent favicon errors, may include a real favicon eventually
server.get('/favicon.ico', (req, res, next) => res.status(204));

// catch http 404 status code and forward to error handler
server.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error Hander
server.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			error: {
				message: err.message
			}
		});
});

// exporting as THRONG cluster module startFunction
module.exports = () => {

  // sync the database, then start the server
  sequelize
  	.sync()
  	.then(() => {
  				server.listen(port, () => {
  					console.log('Express server listening on port', port);
  				});
  			});
};
