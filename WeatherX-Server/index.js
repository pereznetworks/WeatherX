// WeatherX server

'use strict'; // makes sure, among other things, that no unneeded errors creep into my code

// importing Express, and set the port it will accept connections on
const express = require('express');
// creating an Express 'server', don't want to confuse with 'front-end' part of this project
const server = express();

// for use when deploying into production, otherwise use env='development' and port='3000'
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 9999;

// setting up a routes module
const routes = require('./routes/index.js');

// require modules...
const jsonParser = require('body-parser').json; // importing body-parser's json method for parsing JSON data
const logger = require('morgan'); // import a middleware logger module.. see NPM's Morgan PKG page for details

// connect modules to express server, make available to all other Express server.methods
server.use(jsonParser()); // parse all req.body data as json and
server.use(logger('dev')); // Concise output colored by response status for development use.

// one secruity measure of many more unneeded
const helmet = require('helmet')
server.use(helmet());

// my own modular mongoose connection method and callbacks
const mongoConnect = require('./dataSource').connect;
const mongoOnErr = require('./dataSource').onErr;
const mongoOnceConnected = require('./dataSource').onceConnected;

// wrapped mongoose methods in my own promise-based modular methods
// not used in user routes but might in the future
const runFindQuery = require('./dataSource').runFindQuery;
const createNew = require('./dataSource').createNew;
const updateDoc = require('./dataSource').updateDoc;

// connecting to mongodb...
const db = mongoConnect();

// if error in connection...
db.on("error", function(err){
	mongoOnErr(err);
});

// if connected and all is good...
db.once("open", function(){
	mongoOnceConnected();
});

// // make mongoose connection available to all routes
// server.use(db);

// make mongoose document methods available to all routes
// server.use(runFindQuery);
// server.use(createNew);
// server.use(updateDoc);

// insert custom routes router here
server.use(routes);
server.use('/', routes);
server.use('/weather', routes);

// prevent favicon errors, may include a real favicon eventually
server.get('/favicon.ico', (req, res, next) => res.status(204));

// catch http 404 status code and forward to error handler
server.use(function(req, res, next){
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error Hander
server.use(function(err, req, res, next){
		res.status(err.status || 500);
		res.json({
			error: {
				message: err.message
			}
		});
});

// start the server
server.listen(port, function(){
	console.log('Express server listening on port', port);
});
