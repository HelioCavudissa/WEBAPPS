const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const hbs = require('hbs')
const bodyParser = require('body-parser')
const managementRouter = require('./routers/ManagmentRouter');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

// uncomment after placing your favicon in /public
app.use(bodyParser.urlencoded({ extended: false }))
app.use(favicon(path.join(__dirname, 'public', 'movie_favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(managementRouter)

app.get('/', (req, res, next) => {
  res.render('homeView') 
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if(err.status){
    res.locals.message = err.message
  }
  else {
    res.locals.message = "We are sorry. There has been a problem with our servers."
  }
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;