var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var dashRouter = require('./routes/dashboard');
var firebase = require('firebase');
var flash = require('connect-flash');
var app = express();
var session = require('express-session');

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

//app.use(md5());

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

//flash

app.use(flash(app));
app.use(function(req, res, next){
  res.locals.success = req.flash('success');
  res.locals.errors = req.flash('error');
  res.locals.message = req.flash('msg');
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashRouter);


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
