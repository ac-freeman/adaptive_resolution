var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
const eol = require('os').EOL;
var chunkingStreams = require('chunking-streams');
var cache = require('memory-cache');
var app = express();


//http://thisdavej.com/node-js-iot-logging-data-that-is-out-of-this-world/
const logDir = path.join(__dirname, 'logs');
function logToFile(logFileName, dataToWrite) {
    const logFilePath = path.join(logDir, logFileName);
    // const timestamp = new Date().getTime();
    // const data = `${timestamp}, ${dataToWrite}${eol}`;
    const data = `${dataToWrite}, ${eol}`;
    fs.appendFile(logFilePath, data, (error) => {
        if (error) {
            console.error(`Write error to ${logFileName}: ${error.message}`);
        }
    });
}

router.post('/', function(req, res) {
  var startTS = new Date().getTime();

// console.log('body: ' + JSON.stringify(req.body));
//       console.log("ABOUT TO READ IMAGE");

    var img = req.app.get(req.body.imageId);
    var shape = img.shape;
    var fullImageWidth = shape[1];
    var fullImageHeight = shape[0];

  var obj = {};


  //first load
  if (Object.keys(req.body).length < 4) {
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
    if (fullImageWidth > fullImageHeight) {
      isPortrait = false;
      ratio = fullImageHeight / fullImageWidth;
      wHeight = parseInt( wWidth * ratio);
      if (wHeight > req.body.height) {
        var shrinkRatio = (req.body.height) / wHeight;
        wHeight = req.body.height;
        wWidth = parseInt(wWidth * shrinkRatio);
      }
    } else {
      ratio = fullImageWidth / fullImageHeight;
      wWidth = parseInt(wHeight * ratio);
      if (wWidth > req.body.width) {
        var shrinkRatio = (req.body.width) / wWidth;
        wWidth = req.body.width;
        wHeight = parseInt(wHeight * shrinkRatio);
      }
    }



    img = nj.images.resize(img, wHeight,wWidth);

    nj.images.save(img, 'resized'+req.body.imageId+'.jpg');
    // console.log("Saved as jpg");
    // nj.images.save(img, 'resized.png');
    // console.log("Saved as png");
    const stats = fs.statSync('resized' + req.body.imageId +'.jpg');
    var  filepath = path.join( __dirname, '/../resized'+req.body.imageId+'.jpg');
    var doneProcessingTS = new Date().getTime();
    res.sendFile(filepath); // Set disposition and send it.
    logToFile("log_full.csv",startTS +"," + req.body.imageId+"," +fullImageWidth + "," +fullImageHeight + "," + req.body.width + "," + req.body.height + "," + wWidth + "," + wHeight + ","  + stats.size + "," + doneProcessingTS);
  } else {

    // console.log("second load");

    var boxWidth = req.body.boxWidth;
    var boxHeight = req.body.boxHeight;
    var wWidth = req.body.wWidth;
    var wHeight = req.body.wHeight;

    var sliceX1 = req.body.sliceX1;
    var sliceX2 = req.body.sliceX2;

    var sliceY1 = req.body.sliceY1;
    var sliceY2 = req.body.sliceY2;


    var shape = img.shape;

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

    if (newHeight < img.shape[0] && newWidth < img.shape[1]) {
        img = nj.images.resize(img, newHeight,newWidth);
    }


    nj.images.save(img, 'resized'+req.body.imageId+'.jpg');

    const stats = fs.statSync('resized' + req.body.imageId +'.jpg');
    var  filepath = path.join( __dirname, '/../resized'+req.body.imageId+'.jpg');
    var doneProcessingTS = new Date().getTime();

    res.sendFile(filepath); // Set disposition and send it.
    logToFile("log_cropped.csv", startTS +"," + req.body.imageId+"," +fullImageWidth + "," +fullImageHeight + "," + newWidth + "," + newHeight + "," +  boxWidth +"," + boxHeight + "," + sliceX1 + "," +sliceX2 + ","
    + sliceY1 + "," + sliceY2 + "," + stats.size + "," + doneProcessingTS);

  }

});


module.exports = router;
