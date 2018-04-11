var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
var cache = require('memory-cache');
var app = express();

router.get('/', function(req, res) {
  // img = cache.get('imagendarray');
  // console.log("Got from cache");
  // console.log(img.length);

  // var imagesrc = path.join( __dirname, '/../public', 'images', 'IMG_5813.jpg');
  // // var imagesrc = path.join( __dirname, '/public', 'images', 'paint.jpg');
  //
  //   console.log("ABOUT TO READ IMAGE");
  //   var img = nj.images.read(imagesrc);
  //   // var ogimageshape = img.shape;
  // var shape = img.shape;
  // var shape = cache.get('imgshape');
  var img = req.app.get('img');
  var shape = img.shape;
  res.json({width : shape[1], height : shape[0]});
});


module.exports = router;
