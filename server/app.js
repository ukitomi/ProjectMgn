var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
var bodyParser = require('body-parser');
var port = process.env.port || 3002;

var session  = require('express-session');
const passport = require('passport');
// const LocalStrategy = require('passport-local');
var flash    = require('connect-flash');

// Database connect configurations ====================================
const mysql = require('mysql');
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  passowrd: '',
  database: 'test_db'
});

// view engine setup ====================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// var routes = require('./routes/appRoutes.js'); //importing route
// routes(app);
require('./config/passport')(passport); // pass passport for configuration
require('./routes/passportRoutes.js')(app, passport); // pass passport for configuration

// Start the application ================================================
mc.connect();
app.listen(port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;

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