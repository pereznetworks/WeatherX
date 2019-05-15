//require modules setup by express-generator
require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const session = require('express-session');

// creating the express app
const app = express();

// initalize sequelize and a session store using seqeulize
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Sequelize = require('./data/models');

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
const getUuid = require('./dataSource').getUuid; // randomized alphaNumeric uuid

app.use(session({ secret: 'donkey golf',
                  resave: false,
                  saveUninitialized: true,
                  cookie: { secure: true },
                  name: function(req) {
                    // session + a random alphaNumeric string as session name
                    return `sessionId`
                  },
                  genid: function(req) {
                     // use UUIDs for session IDs
                    return getUuid()
                  },
                  secure: true,
                  httpOnly: true,
                  domain: 'localhost',
                  path: '/',
                  expires: expiryDate,
                  unset: 'destroy',
                  store: new SequelizeStore({db: Sequelize})
               }));


// telling express app which modules and settings to use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// basic secruity measures
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// importing routes
const routes = require('./routes/index.js');

app.use('/', routes);
app.use('/weatherCurrent', routes);
app.use('/weatherForecast', routes);

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
