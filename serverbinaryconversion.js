var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
var cache = require('memory-cache');

var imagesrc = path.join( __dirname, '/public', 'images', 'IMG_7853-HDR.jpg');



  var img = nj.images.read(imagesrc);
  var ogimageshape = img.shape;
  console.log(img);
  console.log(img.shape);

  cache.put('imagendarray', img);
  console.log("it's in cache");

  // img = cache.get('imagendarray');
  // console.log("Got from cache");
  //
  // img = nj.images.resize(img, 489,349);
  // // img = img.slice([null,null,3],[null,null,3]);
  // // console.log(img);
  // // console.log("Shape: " + img.shape);
  //
  //
  // nj.images.save(img, 'img.png');
  // console.log("Saved as png");

  var javaArr = img.tolist();

  console.log("Converted to list");

  console.log('cachesize: ' + cache.size());



//   const options = {encoding: 'hex'};
//   const wStream = fs.createWriteStream('IMG_7853-HDR.txt', options);
//   for(var i = 0; i < javaArr.length; i++) {
//   var row = javaArr[i];
//   for(var j = 0; j < row.length; j++) {
//       var uint8arr = Uint8Array.from(row[j]);
//       var buf = Buffer.from(uint8arr);
//       wStream.write(buf);
//       // console.log(row[j]);
//       }
//   }
//   wStream.end();
//   wStream.on('finish', () => {
// console.error('All writes are now complete.');
//
//
// });
