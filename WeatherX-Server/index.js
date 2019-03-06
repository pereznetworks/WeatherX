// Heroku deployment indicates that built-in clustering is BEST PRACTICE
// some of the options are ....
// CLUSTER
// ... looks like a great cluster abstraction but,
// ... does not run on node > v4, and hasn't updated in 2012
// ... perhaps can look into forking the GITHUB repo for it and updating it
// the FORKY module requires
// ... embedding calls to node's cluster module in your code
// ... manual management of processes
// so for now ...
// using the THRONG for cluster abstraction, even though last update was 2016
// but using seems more straight-forward

// 1: after installing it, require it....
var throng = require('throng');

// 2: heroku dev docs indicate to check for process.env.WEB_CONCURRENCY
// also checking for process.env.PORT
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;
const port = process.env.PORT || 9999;

// 3: setup a startFunction, imports the function to start the server
// using this method, each 'cluster worker', will start server that has it's own exclusive database
// this is okay, because the api sources used by this server, require no data be saved or stored
// so each server's seqeulize-sqlite-model-instances are destroyed after res.json(data)
const startFunction = require('./server.js');

// 4: use throng to start CONCURRENCY number of servers, all listening on the same port
throng(CONCURRENCY, startFunction);
