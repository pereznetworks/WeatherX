
// create an express server
const express = require('express');
const path = require('path');
const server = express();

/* backend modules and routes  */

// require modules...
const jsonParser = require('body-parser').json; // importing body-parser's json method for parsing JSON data
const logger = require('morgan'); // import a middleware logger module.. see NPM's Morgan PKG page for details

// connect modules to express server, make available to all other Express server.methods
server.use(jsonParser()); // parse all req.body data as json and
server.use(logger('dev')); // Concise output colored by response status for development use.

// secruity measures
const helmet = require('helmet')
server.use(helmet());

// setting up a routes module
const routes = require('./Server/routes/index.js');

server.use(routes);
server.use('/weather', routes);

// module.exports = server;
