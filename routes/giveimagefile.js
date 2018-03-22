var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
var chunkingStreams = require('chunking-streams');
var cache = require('memory-cache');
// var bodyParser = require("body-parser");



// var LineCounter = chunkingStreams.LineCounter;
// var SeparatorChunker = chunkingStreams.SeparatorChunker;
// var SizeChunker = chunkingStreams.SizeChunker;

router.post('/', function(req, res) {

  // console.log(req);
  console.log('TEEEEEEST' + req.body);
  console.log('TEEEEEEST' + req.body.testVar);

  var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
  var wWidth = req.body.width;
  var wHeight = req.body.height;

var wShorter;
  if (wWidth > wHeight) {
    wShorter = wHeight;
  } else {
    wShorter = wWidth;
  }


  // var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
console.log('cachesize: ' + cache.size());
  img = cache.get('imagendarray');
  console.log("Got from cache");
  console.log(img.length);

  var shape = img.shape;
  var iWidth = shape[1];
  var iHeight = shape[0];

  var isPortrait = true;
  var ratio;
  if (iWidth > iHeight) {
    isPortrait = false;
    ratio = iHeight / iWidth;
    wHeight = parseInt( wWidth * ratio);
  } else {
    ratio = iWidth / iHeight;
    wWidth = parseInt(wHeight * ratio);
  }

  // if (isPortrait) {
  //   wWidth = parseInt(wHeight * (iWidth/iHeight));
  // } else {
  //   wHeight = parseInt(wWidth * (iHeight/iWidth));
  // }
  console.log(shape);

  img = nj.images.resize(img, wHeight,wWidth);
// img = nj.images.resize(img, 490,350);

  // img = img.slice([null,null,3],[null,null,3]);
  // console.log(img);
  // console.log("Shape: " + img.shape);


  nj.images.save(img, 'resized.png');
  console.log("Saved as png");

  var  filepath = path.join( __dirname, '/../resized.png');
  res.sendFile(filepath); // Set disposition and send it.
});


module.exports = router;
