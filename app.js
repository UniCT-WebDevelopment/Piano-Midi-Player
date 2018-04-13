//app.js
const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//var validator= require ('express-validator');
var session = require('express-session');
//var passport = require ('passport');
const bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var registrazione = require ('./routes/registrazione');
var flash = require('connect-flash');

const app = express();

var Midi = require('jsmidgen');



app.loadAll = function(){


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(flash());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({secret:'ssshhhh'}));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(alidator({secret:'max', saveUninitialized:false, resave:false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app.use('/css',express.static('css'));
app.set('views', __dirname + '/views');
app.set('config',__dirname + '/config');
app.use('/song',express.static('song'));
app.use('/download',express.static('file_midi'));

app.use('/', index);
app.use('/users', users);
app.use('/registrazione',registrazione);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
}

module.exports = app;
