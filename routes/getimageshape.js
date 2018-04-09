var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
var cache = require('memory-cache');

router.get('/', function(req, res) {
  img = cache.get('imagendarray');
  console.log("Got from cache");
  console.log(img.length);

  var shape = img.shape;
  res.json({width : shape[1], height : shape[0]});
});


module.exports = router;
