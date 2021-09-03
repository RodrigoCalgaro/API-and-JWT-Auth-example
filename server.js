var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var models = require("./models");
const passport = require('passport');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


//Sync Database
models.sequelize.sync({
  force: false
}).then(function () {
  console.log('Database Sync OK!');
}).catch(function (err) {
  console.log(err, "Error to sync database: " + err);
});

// Passport
require("./passport");

// Routing
require("./routes")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send('Internal Server Error');
});

module.exports = app;
