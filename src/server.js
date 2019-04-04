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

/* front-end modules and routes, using REACT SSR baseline */
/* REACT SSR baseline from https://github.com/alexnm/react-ssr  */
import 'ignore-styles';
import React from "react";
import { renderToString } from "react-dom/server";
import Start from "./app/Start";

app.use( express.static( path.resolve( __dirname, "../dist" ) ) );

const htmlTemplate = reactDom => {
    return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title>WeatherX by Daniel's AppWorks</title>
      <link rel="stylesheet" href="./app.css">
      </head>
      <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="app">${ reactDom }</div>
      <script src="./app.bundle.js"></script>
      </body>
      </html>
    `;
};

app.get( "/", ( req, res ) => {
  require ('ignore-styles');
  require ('@babel/register')({
    ignore: /\/(build|node_modules)\//,
    presets: ['env', 'react-app']
  });

  const jsx = (<Start />)
  // Render your application
  const reactDom = renderToString(jsx)

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( reactDom ) );
} );

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

// sync the sequelize database, then start the server
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Express server listening on port', 3000);
    });
  });
