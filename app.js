//require modules setup by express-generator
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// creating the express app
const app = express();

// routes go here

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// telling express app which modules and settings to use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// importing static variables to pass to rendered view
const locals = {
  searchResults: {
    forecast: false,
    initialView: require('./views/initialView/locals.js').homePg,
    locationBar: require(`./views/locationBarView/locals.js`).locationBar
  }
}

// home page, renders index, or initialView
app.get('/', (req, res, next) => {
  // renders the a title bar  and navbar with tempType controls
  // locationBar only renders if locationCityState is not blank
  console.log(locals.searchResults);
  res.render('index', locals.searchResults)

});


// now which routes to use routers with
app.get('/weather', (req, res, next) => {
  // gecodes req.query.searchInput, uses result to get forecast data
  // send data back to home page usign a redirect

  locals.searchResults.forecast = true;
  locals.searchResults.locationBar.locationCityState = req.query.geoCodeThis;
  res.redirect('/')
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
