var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

require('dotenv').config();

var users  = require('./routes/users');
var routes = require('./routes/index');
// var reports  = require('./routes/reports');

var app = express();

app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layouts/layout' });

hbs.registerPartials(__dirname + '/views/partials');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', users);
// app.use('/', routes);
// app.use('/reports', reports);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
