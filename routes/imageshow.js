var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');

router.get('/:imageId', function(req, res, next) {
  console.log(req.url);
    // console.log("imageId is set to " + req.params.imageId);
    res.render('imagepage', { imageId: req.params.imageId});
});

module.exports = router;
