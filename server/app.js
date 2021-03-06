/* eslint-disable one-var */
const express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  allowCrossOrigin = require('./middlewares/cors'),
  timestamp = require('./middlewares/timestamp'),
  disabledHeaders = require('./middlewares/disabledHeaders'),
  logger = require('./logging'),
  morgan = require('morgan'),
  isAuthenticated = require('./middlewares/authenticated'),
  /* eslint-disable no-unused-vars */
  jwt = require('jsonwebtoken');
  /* eslint-enable no-unused-vars */

// express main app
const app = express();
/* eslint-disable one-var */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if (process.env.APP_DEBUG) {
  app.use(morgan(process.env.APP_DEBUG_FORMAT, { stream: logger.stream }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cookieParser());

app.use(disabledHeaders);
app.use(allowCrossOrigin);
app.use(timestamp);
app.use(require('node-compass')({ mode: 'expanded' }));
app.use(express.static(path.join(__dirname, 'public')));

// APPLICATION ROUTES GOES HERE

/*
**********************
* UnProtected Routes *
**********************
*/
app.use('/api', require('./routes'));

/*
********************
* Protected Routes *
********************
*/
// User CRUD Routes
app.use('/api/users', isAuthenticated, require('./routes/users'));
app.use('/api/users', require('./routes/users'));

// Module CRUD Routes

// Components CRUD Routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
