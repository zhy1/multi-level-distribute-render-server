import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import settings from './service/env/settings'



let app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.set('view engine', 'xtpl');



/**
app.engine('.html', require('xtpl').renderFile);
app.set('view engine', 'html');

*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import index from './routes/index';
app.use('/', index);

import users from './routes/users';
app.use('/users', users);

import template from './routes/template';
app.use('/template', template);

import scan from './routes/scan';
app.use('/project', scan);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
  res.write(JSON.stringify({error: err}));
  res.end();
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
  settings.setDev();
}else{
  settings.setPrd();
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);/*
  res.render('error', {
    message: err.message,
    error: {}
  });*/
  //res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
  res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
  res.write(JSON.stringify({error: err.message}));
  res.end();
});


module.exports = app;
