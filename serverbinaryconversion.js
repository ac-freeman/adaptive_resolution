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


});
