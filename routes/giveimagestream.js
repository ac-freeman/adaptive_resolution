var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');

router.get('/', function(req, res) {
  console.log("IN GIVE IMAGE STREAM");
    const options = {encoding: 'hex'};
    var rStream = fs.createReadStream('HEX.txt', options);
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
