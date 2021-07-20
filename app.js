var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multiparty = require('multiparty');

// import cronjobs
require('./routes/cronjobs');

// importing routes
var indexRouter = require('./routes/index');
var transferRouter = require('./routes/transfer');
var authRouter = require('./routes/auth');


// start app
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware to accomodate cors
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Custom-Header, AuthToken");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Accept", "*/*");
  
  next();
});

// middleware to handle form fields and files
app.use(function (req, res, next) {
  // parse a file upload
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    if (err) console.error(`Multiparty Middleware Error: ${err.message}`);

    // parse fields
    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key)) {
        req.body[key] = fields[key][0];
      }
    }
    // console.log(files);
    req.files = files;
    next();
  });
});

// middleware to handle caching
// app.set('etag', false)
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store')
//   next()
// });

// routing
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/transfer', transferRouter);

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500)
    .send('500 - Server Error')
});

app.use(function (req, res) {
  res.status(404)
    .send('404 - Page Not Found');
})

module.exports = app;
