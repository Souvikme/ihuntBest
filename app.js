var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var firebase = require('firebase');

var app = express();

var firebaseConfig = {
  apiKey: "AIzaSyCw8-hNGsxX85nYx_tL2gHvJ0vW-yIdhto",
  authDomain: "ihuntbest-e7a51.firebaseapp.com",
  databaseURL: "https://ihuntbest-e7a51.firebaseio.com",
  projectId: "ihuntbest-e7a51",
  storageBucket: "ihuntbest-e7a51.appspot.com",
  messagingSenderId: "426927551189",
  appId: "1:426927551189:web:19d7357e066bb678"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
