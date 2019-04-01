/* BE server */

import express from "express";
import path from "path";

// create an express app/server
const app = express();

/* backend modules and routes  */

// require modules...
const jsonParser = require('body-parser').json; // importing body-parser's json method for parsing JSON data
const logger = require('morgan'); // import a middleware logger module.. see NPM's Morgan PKG page for details

// connect modules to express server, make available to all other Express server.methods
app.use(jsonParser()); // parse all req.body data as json and
app.use(logger('dev')); // Concise output colored by response status for development use.

// secruity measures
const helmet = require('helmet')
app.use(helmet());

// using sequelize for data ...
// importing from models/index.js
// .. which sets config, checks for or creates a db, imports models into sequelize
// .... then imported here
const sequelize = require('../backendServer/data/models').sequelize;

// setting up a routes module
const routes = require('../backendServer/routes/index.js');

app.use(routes);
app.use('/weather', routes);

// prevent favicon errors, may include a real favicon eventually
app.get('/favicon.ico', (req, res, next) => res.status(204));

// catch http 404 status code and forward to error handler
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
  err.message = "Oops, Please, use the syntax, weather:city, state or weather:city, country"
	next(err);
});

// Error Hander
app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json(
     {
		  	"error": {
			  	"message": `${err.message}`
			}
		 }
    );
});

// start server
app.listen(9999, () => {
  console.log('Express server listening on port', 9999);
});
