//  Wrapping server.js in Throng startFunction for cluster abstraction

// 1: after installing it, require it....
var throng = require('throng');

// 2: heroku dev docs indicate to check for process.env.WEB_CONCURRENCY
// also checking for process.env.PORT
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

// 3: setup a startFunction, imports the function to start the server
// using this method, each 'cluster worker', will start server that has it's own exclusive database
const startFunction = require('./server.js');

// 4: use throng to start CONCURRENCY number of servers, all listening on the same port
throng(CONCURRENCY, startFunction);
