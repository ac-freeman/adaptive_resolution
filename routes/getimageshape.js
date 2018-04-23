var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
var cache = require('memory-cache');
var app = express();

router.get('/:imageId', function(req, res) {

  var img = req.app.get(req.params.imageId);
  var shape = img.shape;

  res.json({width : shape[1], height : shape[0]});
});


module.exports = router;
