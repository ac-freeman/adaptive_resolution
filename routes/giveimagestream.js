var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
var chunkingStreams = require('chunking-streams');

var LineCounter = chunkingStreams.LineCounter;
var SeparatorChunker = chunkingStreams.SeparatorChunker;
var SizeChunker = chunkingStreams.SizeChunker;

router.get('/', function(req, res) {
  console.log("IN GIVE IMAGE STREAM");
    // const options = {encoding: 'hex',
    //                   highWaterMark: 3};

    // const options = {encoding: 'hex'};

    // var rStream = fs.createReadStream('IMG_7853-HDR.txt', options),
    // chunker = new SizeChunker({
    //   chunkSize: 3
    // });

    img = cache.get('imagendarray');
    console.log("Got from cache");

    img = nj.images.resize(img, 489,349);
    // img = img.slice([null,null,3],[null,null,3]);
    // console.log(img);
    // console.log("Shape: " + img.shape);


    nj.images.save(img, 'resized.png');
    console.log("Saved as png");
    // var rStream = fs.createReadStream('IMG_7853-HDR.txt', options);
    var rStream = fs.createReadStream('resized');

    // chunker.on('chunkStart', function(id, done) {
    //     // output = fs.createWriteStream('./output-' + id);
    //     // console.log("Chunk " + id);
    //     if(id % 5 == 0) {
    //       console.log("Chunk " + id);
    //     }
    //     done();
    // });
    //
    // chunker.on('chunkEnd', function(id, done) {
    //     // output.end();
    //     done();
    // });
    //
    // chunker.on('data', function(chunk) {
    //     // output.write(chunk.data);
    //
    //
    // });
    //
    // rStream.pipe(chunker);
    rStream.pipe(res);


    // or use event handlers
  // rStream.on('data', function(data) {
  //   res.write(data);
  // });

    rStream.on('error', function(error) {
            console.log("STREAM ERROR: " + error);
            // res.end();
        });
    // rStream.on('end', res.end());
});


module.exports = router;
