var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var console = require('console');
var nj = require('numjs');
var fs = require('fs');
var cache = require('memory-cache');

var bodyParser = require("body-parser");
var increaseMemoryLimit = require("increase-memory-limit");

var index = require('./routes/index');
var imageshow = require('./routes/imageshow');
var imagestream = require('./routes/giveimagestream');
var giveimagefile = require('./routes/giveimagefile');
var getimageshape = require('./routes/getimageshape');


var app = express();




  console.log("ABOUT TO READ IMAGES");
  var imagesrc = path.join( __dirname, '/public', 'images', 'IMG_4003_stitch.jpg');
  var img = nj.images.read(imagesrc);
   app.set('image1', img);
   imagesrc = path.join( __dirname, '/public', 'images', 'IMG_7682.jpg');
   img = nj.images.read(imagesrc);
    app.set('image2', img);
    imagesrc = path.join( __dirname, '/public', 'images', 'IMG_7853-HDR.jpg');
    img = nj.images.read(imagesrc);
     app.set('image3', img);
     imagesrc = path.join( __dirname, '/public', 'images', 'IMG_8714_stitch.jpg');
     img = nj.images.read(imagesrc);
      app.set('image4', img);
      imagesrc = path.join( __dirname, '/public', 'images', 'IMG_5813.jpg');
      img = nj.images.read(imagesrc);
       app.set('image5', img);
       imagesrc = path.join( __dirname, '/public', 'images', 'IMG_8843.jpg');
       img = nj.images.read(imagesrc);
        app.set('image6', img);
        imagesrc = path.join( __dirname, '/public', 'images', 'IMG_9191_stitch.jpg');
        img = nj.images.read(imagesrc);
         app.set('image7', img);
         imagesrc = path.join( __dirname, '/public', 'images', 'IMG_8661_stitch.jpg');
         img = nj.images.read(imagesrc);
          app.set('image8', img);
          imagesrc = path.join( __dirname, '/public', 'images', 'IMG_5281-2_01.jpg');
          img = nj.images.read(imagesrc);
           app.set('image9', img);
           imagesrc = path.join( __dirname, '/public', 'images', 'IMG_3373_stitch-4.jpg');
           img = nj.images.read(imagesrc);
            app.set('image10', img);
  console.log('DONE READING IMAGES');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/imageshow', imageshow);
app.use('/img1', imagestream);
app.use('/img2', giveimagefile);
app.use('/getimageshape', getimageshape);

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




app.get('/original/image1', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_4003_stitch.jpg'))
});
app.get('/original/image2', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_7682.jpg'))
});
app.get('/original/image3', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_7853-HDR.jpg'))
});
app.get('/original/image4', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_8714_stitch.jpg'))
});
app.get('/original/image5', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_5813.jpg'))
});
app.get('/original/image6', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_8843.jpg'))
});
app.get('/original/image7', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_9191_stitch.jpg'))
});
app.get('/original/image8', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_8661_stitch.jpg'))
});
app.get('/original/image9', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_5281-2_01.jpg'))
});
app.get('/original/image10', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/images/IMG_3373_stitch-4.jpg'))
});

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
  console.log(err);
});

module.exports = app;
