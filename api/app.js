var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var homeRouter = require('./routes/home');
var indexRouter = require('./routes/index');
var landingRouter = require('./routes/landing');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');


var sequelize = require('./config/database');

var app = express();

// Sync Sequelize with database
sequelize.sync().then(() => {
    console.log('Database connected.');
}).catch((err) => {
    console.log('Error connecting to the database:', err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/home', homeRouter);
app.use('/', indexRouter);
app.use('/landing', landingRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use(function(req, res, next) {
    console.log(req.originalUrl);
    next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;