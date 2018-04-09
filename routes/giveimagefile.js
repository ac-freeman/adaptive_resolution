var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
var chunkingStreams = require('chunking-streams');
var cache = require('memory-cache');

router.post('/', function(req, res) {

    console.log('cachesize: ' + cache.size());
    img = cache.get('imagendarray');
    console.log("Got from cache");
    console.log(img.length);

    var shape = img.shape;
    var iWidth = shape[1];
    var iHeight = shape[0];

  var obj = {};
	console.log('body: ' + JSON.stringify(req.body));

  //first load
  if (Object.keys(req.body).length < 3) {
    var wWidth = req.body.width;
    var wHeight = req.body.height;

  var wShorter;
    if (wWidth > wHeight) {
      wShorter = wHeight;
    } else {
      wShorter = wWidth;
    }




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

    console.log(shape);

    img = nj.images.resize(img, wHeight,wWidth);

    nj.images.save(img, 'resized.png');
    console.log("Saved as png");

    var  filepath = path.join( __dirname, '/../resized.png');
    res.sendFile(filepath); // Set disposition and send it.
  } else {

    console.log("second load");
    var imgWidth = req.body.imgWidth;
    var imgHeight = req.body.imgHeight;
    var boxX = req.body.x;
    var boxY = req.body.y;
    var boxWidth = req.body.boxWidth;
    var boxHeight = req.body.boxHeight;
    var wWidth = req.body.wWidth;
    var wHeight = req.body.wHeight;

    // var xBuffer = (wWidth - imgWidth) / 2;
    // var xBuffer = 0;
    // boxX = boxX - xBuffer;
    console.log('boxX = ' + boxX);
    // var yBuffer = (wHeight - imgHeight) / 2;
    // var yBuffer = 0;
    // boxY = boxY - yBuffer;
    console.log('boxY = ' + boxY);

    // var wZoomScale = iWidth / imgWidth;
    var wZoomScale = req.body.wZoomScale;
    // var hZoomScale = iHeight / imgHeight;
    var hZoomScale = req.body.hZoomScale;

    // sliceX2 = iWidth - ((boxWidth + boxX) * wZoomScale);
    var sliceX1 = req.body.sliceX1;
    var sliceX2 = req.body.sliceX2;

    // sliceY2 = iHeight - ((boxHeight + boxY) * hZoomScale);
    var sliceY1 = req.body.sliceY1;
    var sliceY2 = req.body.sliceY2;

img = cache.get('imagendarray');
    console.log(img.shape);

      //the negative means you skip the last N rows/columns
    img = img.slice([sliceY1,-sliceY2],[sliceX1,-sliceX2]);

    var newWidth;
    var newHeight;
    if (boxWidth > boxHeight) {
      newWidth = wWidth;
      newHeight = parseInt((boxHeight/boxWidth)*newWidth);
    } else {
      newHeight = wHeight;
      newWidth = parseInt((boxWidth/boxHeight)*newHeight);
    }
    img = nj.images.resize(img, newHeight,newWidth);

    nj.images.save(img, 'resized.png');
    console.log("Saved as png");

    var  filepath = path.join( __dirname, '/../resized.png');
    res.sendFile(filepath); // Set disposition and send it.


  }

});


module.exports = router;
