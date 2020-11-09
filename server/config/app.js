//module for errors & logs
let createError = require('http-errors');
let logger = require('morgan');

//module for pathing and data
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');


// modules for authentication
let session = require('express-session');
let passport = require('passport');

// authentication strategy
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy; // Alias for the local strategy

// authentication messaging
let flash = require('connect-flash');

// user model
let user = require('../models/user')

// Routing modules
let indexRouter = require('../routes/server');
let usersRouter = require('../routes/users');
let user_collectionRouter = require('../routes/user_collection');


//Modules for databases
let app = express();
let mongoose = require('mongoose');
let DB = require('./DB');

//Console logs connection status
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
let dbConnection = mongoose.connection; // alias

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', ()=>{
  console.log('MongoDB Connection OPEN');
});

dbConnection.once('connected', ()=>{
  console.log('MongoDB Connected');
});

dbConnection.on('disconnected', ()=>{
  console.log('MongoDB Disconnected');
});

dbConnection.on('reconnected', ()=>{
  console.log('MongoDB Reconnected');
});


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

//Initializing Modules for site
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// setup express session
app.use(session({
  secret: DB.Secret,
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// configure our user model
let User = user.Model;

// implement a User Auth Strategy
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Initializing Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user-list', user_collectionRouter);

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
