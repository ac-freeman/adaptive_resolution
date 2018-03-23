var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
var chunkingStreams = require('chunking-streams');
var cache = require('memory-cache');

router.post('/', function(req, res) {

  // console.log(req);
  console.log('TEEEEEEST' + req.body);
  console.log('TEEEEEEST' + req.body.testVar);

  console.log('cachesize: ' + cache.size());
    img = cache.get('imagendarray');
    console.log("Got from cache");
    console.log(img.length);

    var shape = img.shape;
    var iWidth = shape[1];
    var iHeight = shape[0];

  var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
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

    var xBuffer = (wWidth - imgWidth) / 2;
    boxX = boxX - xBuffer;
    console.log('boxX = ' + boxX);
    var yBuffer = (wHeight - imgHeight) / 2;
    boxY = boxY - yBuffer;
    console.log('boxY = ' + boxY);

    var wZoomScale = iWidth / imgWidth;
    var hZoomScale = iHeight / imgHeight;

    sliceX2 = iWidth - ((boxWidth + boxX) * wZoomScale);
    sliceY2 = iHeight - ((boxHeight + boxY) * hZoomScale);


img = cache.get('imagendarray');
    console.log(img.shape);

    img = img.slice([(boxY * hZoomScale),-sliceY2],[(boxX * wZoomScale),-sliceX2]);

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
