//  Wrapping the server-side express app in a Throng startServer for cluster abstraction

// 1: after installing it, require it....
const throng = require('throng');

// 2: heroku dev docs indicate to check for 2 environment variables...
// process.env.WEB_CONCURRENCY
// process.env.PORT
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

// 3: setup a startFunction, imports the function to start the server
// using this method, each 'cluster worker', will start server that has it's own exclusive database

const startServer = () => {

  /* required when implmenting Server-Side React
    babel pre-compiles the rehydrated react components */

  // require( "@babel/register" )( {
  //     presets: [ "@babel/preset-env" ],
  // } );

  require( "server" );
};

// 4: use throng to start CONCURRENCY number of servers, all listening on the same port

throng(CONCURRENCY, startServer);
