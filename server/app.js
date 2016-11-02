const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const allowCrossOrigin = require('./middlewares/cors');
const timestamp = require('./middlewares/timestamp');
const disabledHeaders = require('./middlewares/disabledHeaders');
const logger = require('./logging');
const morgan = require('morgan');
/* eslint-disable no-unused-vars */
const isAuthenticated = require('./middlewares/authenticated');
const jwt = require('jsonwebtoken');
/* eslint-enable no-unused-vars */

// express main app
const app = express();

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
// app.use('/api/users', isAuthenticated, require('./routes/users'));
app.use('/api/users', require('./routes/users'));

// Module CRUD Routes

// Components CRUD Routes

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
