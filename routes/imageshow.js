var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var fs = require('fs');
// var canvas = require('canvas');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.url);
  // res.send('Show an image 2');
  // var pathh = path.join( __dirname, '/../public','javascripts', 'clientshowimage.js' );

  var aa = nj.array([2,3,4]);
  var imagesrc = path.join( __dirname, '/../public', 'images', 'IMG_7853-HDR.jpg');

  // loadImage(imagesrc);


  // var $image = new canvas.Image();
	// $image.crossOrigin = 'Anonymous';
  // $image.onload = function() {
    // var start = new Date().valueOf();
    // process images
    // var img = nj.images.read($image);

    // var img = nj.uint8(nj.images.read(imagesrc));
    var img = nj.images.read(imagesrc);
    var ogimageshape = img.shape;
    console.log(img);
    console.log(img.shape);

    img = img.slice([null,null,10],[null,null,10]);
    console.log(img);
    console.log("Shape: " + img.shape);

    var javaArr = img.tolist();
    // var uint8arr = Uint8Array.from(javaArr[0]);
    // console.log(javaArr);
    // console.log(javaArr instanceof Array);
    // console.log(javaArr instanceof Uint8Array);
    // console.log(uint8arr);
    // console.log(uint8arr instanceof Array);
    // console.log(uint8arr instanceof Uint8Array);


    const options = {encoding: 'hex'};
    const wStream = fs.createWriteStream('HEX.txt', options);
    for(var i = 0; i < javaArr.length; i++) {
    var row = javaArr[i];
    for(var j = 0; j < row.length; j++) {
        var uint8arr = Uint8Array.from(row[j]);
        var buf = Buffer.from(uint8arr);
        wStream.write(buf);
        // console.log(row[j]);
        }
    }
    wStream.end();
    wStream.on('finish', () => {
  console.error('All writes are now complete.');
  // const rStream = fs.createReadStream('binbin.txt', options);
  // streamToString(rStream, (data) => {
  //   console.log(data);
  // });


  // rStream.on("data", function (chunk) {
  //   chunks.push(chunk.toString);
  // });
  //
  // // Send the buffer or you can put it into a var
  // rStream.on("end", function () {
  //   // res.send(Buffer.concat(chunks));
  //     var ender = Buffer.concat(chunks);
  //     console.log(ender);
  // });


});

  // // const buf = Buffer.from(javaArr);
  // for (const b of buf) {
  //   console.log(b);
  // }


    // fs.writeFile('binimage.bin', javaArr, (err) => {
    //   if (err) throw err;
    //   console.log('Binary image saved.');
    // });
    // nj.images.save(img, 'img.png');


    var pathh = path.join( __dirname, '/../views', 'imagepage.jade' );
    var path2 = path.join('img.png');
    // res.render('imagepage', { name: 'examplenametest', aaa: aa, localimg: img, localimgshape: img.shape, pngimg: path2 });
    res.render('imagepage', { name: 'examplenametest', imgShape: img.shape});



    // res.sendFile(path2);
    // console.log('Sent file');
  // };
  // $image.src = imagesrc;


  // var pathh = path.join( __dirname, '/../views', 'imagepage.jade' );
  // res.render('imagepage', { name: 'examplenametest', aaa: aa, });
  // res.sendFile(pathh);
});



function streamToString(stream, cb) {
  const chunks = [];
  stream.on('data', (chunk) => {
    chunks.push(chunk.toString());
  });
  stream.on('end', () => {
    cb(chunks.join(''));
  });
}


function removeCols(matrix, step) {
    let newMatrix = matrix.filter(row => row.some(e => e != row[0]))  // filter the rows that have different values
                          .map(row => row.slice(0));                  // copy them into newMatrix (so the original matrix isn't affected by altering them (the rows))

    if(newMatrix.length === 0) return newMatrix;                      // if newMatrix turned out to be rowless (then just retrun it without attempting to clean the columns)

    for(var i = newMatrix[0].length - 1; i >= 0; i-=step) {               // for each column (looping backwards so that removing  column won't affect the index i)
          newMatrix.forEach(row => row.splice(i, 1));                 // then remove the i-th item (column) from each row
    }

    return newMatrix;
}


function slice(dimensions, shape, args) {
  // var d = this.ndim;
  var d = dimensions;
  var hi = new Array(d);
  var lo = new Array(d);
  var step = new Array(d);
  var tShape = shape;

  for (var i = 0; i < d; i++) {
    var arg = args[i];
    if (typeof arg === 'undefined') { break; }
    if (arg === null) { continue; }
    if (_.isNumber(arg)) {
      lo[i] = (arg < 0) ? arg + tShape[i] : arg;
      hi[i] = null;
      step[i] = 1;
    } else if (arg.length === 4 && arg[1] === null && arg[2] === null) {
      // pattern: a[start::step]
      var s = (arg[0] < 0) ? arg[0] + tShape[i] : arg[0];
      lo[i] = s;
      hi[i] = null;
      step[i] = arg[3] || 1;
    } else {
      // pattern start:end:step
      var start = (arg[0] < 0) ? arg[0] + tShape[i] : arg[0];
      var end = (arg[1] < 0) ? arg[1] + tShape[i] : arg[1];
      lo[i] = end ? start : 0;
      hi[i] = end ? end - start : start;
      step[i] = arg[2] || 1;
    }
  }

  var slo = this.selection.lo.apply(this.selection, lo);
  var shi = slo.hi.apply(slo, hi);
  var sstep = shi.step.apply(shi, step);
  return new Array(sstep);
};



function loadImage(src) {
  var $image = new Image();
	$image.crossOrigin = 'Anonymous';
  $image.onload = function() {
    // var W, H;
    // if ($image.width < $image.height){
    //   W = ~~(size * $image.width / $image.height);
    //   H = ~~(size);
    // }
    // else{
    //   H = ~~(size * $image.height / $image.width);
    //   W = ~~(size);
    // }
    var start = new Date().valueOf();
    // process images
    var img = nj.images.read($image);//,
    	  // gray = nj.images.rgb2gray(img),
        // flipped = img.slice(null, [null,null,-1]),
        // scharr = nj.images.scharr(gray), // scharr is a edge detector, like sobel
        // resized = nj.images.resize(img, H / 2, W / 2),
        // zoomed = img.slice([img.shape[0] / 4 | 0, 3 * img.shape[0] / 4 | 0],
        //                    [img.shape[1] / 4 | 0, 3 * img.shape[1] / 4 | 0]),
    // var duration = new Date().valueOf() - start;

    // display images in canvas
    // var $original = document.getElementById('original');
    // // $original.width = W; $original.height = H;
    // nj.images.save(img, $original);

    // var $gray = document.getElementById('grayscale');
    // $gray.width = W; $gray.height = H;
    // nj.images.save(gray, $gray);
    //
    // var $edges = document.getElementById('edges');
    // $edges.width = W; $edges.height = H;
    // nj.images.save(scharr, $edges);
    //
    // var $flipped = document.getElementById('flipped');
    // $flipped.width = W; $flipped.height = H;
    // nj.images.save(flipped, $flipped);
    //
    // var $resized = document.getElementById('resized');
    // $resized.width = resized.shape[1]; $resized.height = resized.shape[0];
    // nj.images.save(resized, $resized);
    //
    // var $zoomed = document.getElementById('zoomed');
    // $zoomed.width = W; $zoomed.height  = H;
    // nj.images.save(zoomed, $zoomed);

    // document.getElementById('duration').textContent =''+duration;
    // document.getElementById('h').textContent =''+img.shape[0];
    // document.getElementById('w').textContent =''+img.shape[1];

  };

  $image.src = src;
}


module.exports = router;
