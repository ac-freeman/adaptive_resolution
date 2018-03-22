// document.write("5 + 6");

// $('#img').attr('src', "/img2");

// $.ajax({
//   url: "/img2",
//   type: "get", //send it through get method
//   data: {
//     ajaxid: 43210,
//   },
//   success: function(response) {
//     console.log('ajax success!');
//     //Do Something
//     loadImage2(response);
//   },
//   error: function(xhr) {
//     //Do Something to handle error
//     console.log('ajax FAIL');
//   }
// });

window.addEventListener ?
window.addEventListener("load",drawpage,false) :
window.attachEvent && window.attachEvent("onload",drawpage);

function drawpage(){
  console.log("loaded");

var cavas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// canvas.style.width='100%';
// canvas.style.height='100%';

// var padding = parseInt(0.1 * $(window).width());

var portWidth = parseInt(0.9 * $(window).width());
var portHeight = parseInt(0.9 * $(window).height());

//Set canvas drawing area width/height
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = portWidth;
canvas.height = portHeight;


//Draw rectangle
// context.rect(0, 0, portWidth, portHeight);
// context.fillStyle = 'yellow';
// context.fill();

//Draw rectangle
ctx.beginPath();
ctx.lineWidth="6";
ctx.strokeStyle="red";
ctx.rect(0,0,portWidth,portHeight); 
ctx.stroke();

var data = {};
					data.width =    portWidth;// returns height of browser viewport
					data.height =  portHeight;

var xhr = new XMLHttpRequest();
xhr.open('POST', '/img2', true);
//Send the proper header information along with the request
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.responseType = 'blob';

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = this.response;

    // var img = document.createElement('img');
    var img = document.getElementById('mainimage');
    // document.getElementById('mainimage').src = window.URL.createObjectURL(blob);
    // img.width = ;
    // img.height = portHeight;
    img.src = window.URL.createObjectURL(blob);
    // var img = container.getElementsByTagName('mainimg')[0];
    // img.onload = function(e) {
      // window.URL.revokeObjectURL(img.src); // Clean up after yourself.
    // };
    // img.src = window.URL.createObjectURL(blob);
    // document.body.appendChild(img);

  }
};

xhr.send(JSON.stringify(data));

};



//
// function loadImage2(imgg) {
//   console.log('in load image 2');
// // create an offscreen canvas
// var canvas=document.createElement("canvas");
//
// var ctx=canvas.getContext("2d");
//
// // size the canvas to your desired image
// canvas.width=400;
// canvas.height=800;
//
// // get the imageData and pixel array from the canvas
// var canvasData=ctx.getImageData(0,0,canvas.width,canvas.height);
// var data=canvasData.data;


// for(var j = 0; j < localimg2.length; j+=1){
//   var px = localimg2[j];
//   if(j == 0) {
//     console.log("pixel length: " + px.length);
//   }
//       data[j*4 ]= px[0];   // set every red pixel element to 255
//       data[j*4 + 1] = px[1];
//       data[j*4 + 2] = px[2];
//       data[j*4 + 3]=255; // make this pixel opaque
// }
// manipulate some pixel elements
// acount = 0;
// for(var i=0;i<data.length;i+=4){
//   // var px = localimg2[i];
//   // console.log(px.length)
//   data[i]= imageDataIntArray[i-acount];
//   data[i+1] = imageDataIntArray[i+1-acount];
//   data[i+2] = imageDataIntArray[i+2-acount];
//   data[i+3]=255; // make this pixel opaque
//   acount+=1;
// }

// put the modified pixels back on the canvas
// ctx.putImageData(canvasData,0,0);
// ctx.putImageData(localimg,0,0);

// create a new img object
// var image=new Image();
//
// // set the img.src to the canvas data url
// image.src=imgg;
//
//
// // append the new img object to the page
// document.body.appendChild(image);
//
// }


















// function getImageFromServer(callback) {
//   $(document).ready(function(){
//     $.ajax({
//       type: "GET",
//       url: "/img2",
//       dataType: "file",
//       success: function(result){
//       console.log("TRYING TO SET DIV")
//     // $("#div2").html(result);
//     callback(result);
//     }});
//     });
// }
// var aaa;
// getImageFromServer(aaa);
// console.log(aaa);

/////////////////////////////////
// getImageFromServer( function (imageData) {
//   console.log("Response length: " + imageData.length);
//   console.log(imageData);
//
//   loadImage(imageData);
// });
/////////////////////////////////

// var responseArray;
// /////Has problems reading into decimal?
// var xhr = new XMLHttpRequest();
// xhr.open('GET', '/img1', true);
// xhr.responseType = 'arraybuffer';
//
// xhr.onload = function(e) {
//   // response is unsigned 8 bit integer
//   responseArray = new Uint8Array(this.response);
//   console.log(responseArray);
//   console.log(responseArray[0]);
// };
//
// xhr.send();


          // var name = "{{ name }}";
          // console.log(name);



          // $(document).ready(function () {
            //your code here
            // var localObj = JSON.parse($.ajax("{{ local_data }}").val());
            // var localObj = JSON.parse(local_data);
            // console.log(localObj.name);
            // document.write(localObj.name);
          // });


          // console.log(local_data);
          // console.log(local_arr);
// var localimg2 = flatten(JSON.parse(localimg));
// console.log(localpng);
// console.log(localimg2);
// console.log(localimgshape);

// localimg.shape = localimgshape;
// console.log(localimg);

// document.write(local_data);

// loadImage();

//  function flatten(arr, result = []) {
//   for (let i = 0, length = arr.length; i < length; i++) {
//     const value = arr[i];
//     if (Array.isArray(value)) {
//       flatten(value, result);
//     } else {
//       result.push(value);
//     }
//   }
//   return result;
// };
//
//
// function loadImage( imageData ) {
//
//   var imageDataArray = imageData.match(new RegExp('.{1,' + 2 + '}', 'g'));
//   var imageDataIntArray = new Uint8Array(imageDataArray.length);
//   for (let i = 0, length = imageDataArray.length; i < length; i++) {
//     imageDataIntArray[i] = parseInt(imageDataArray[i], 16);
//   }
//   console.log(imageDataIntArray);
//
//   var shape = [ imageDataIntArray.length, imageDataIntArray[0].length ];
//   console.log(imgShape);



  // var $image = new Image();
	// $image.crossOrigin = 'Anonymous';
  // $image.onload = function() {
    // var W, H;
    // if ($image.width < $image.height){
    //   W = ~~(size * $image.width / $image.height);
    //   H = ~~(size);
    // }
    // else{
    //   H = ~~(size * $image.height / $image.width);
    //   W = ~~(size);
    // }
    // var start = new Date().valueOf();
    // process images
    // var img = nj.images.read($image);//,
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
    /////////***// nj.images.save(localimg2, $original);

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

  // };

  // $image.src = src;









  // create an offscreen canvas
// var canvas=document.createElement("canvas");
//
// var ctx=canvas.getContext("2d");
//
// // size the canvas to your desired image
// canvas.width=imgShape[1];
// canvas.height=imgShape[0];
//
// // get the imageData and pixel array from the canvas
// var canvasData=ctx.getImageData(0,0,canvas.width,canvas.height);
// var data=canvasData.data;


// for(var j = 0; j < localimg2.length; j+=1){
//   var px = localimg2[j];
//   if(j == 0) {
//     console.log("pixel length: " + px.length);
//   }
//       data[j*4 ]= px[0];   // set every red pixel element to 255
//       data[j*4 + 1] = px[1];
//       data[j*4 + 2] = px[2];
//       data[j*4 + 3]=255; // make this pixel opaque
// }
// manipulate some pixel elements
// acount = 0;
// for(var i=0;i<data.length;i+=4){
//     // var px = localimg2[i];
//     // console.log(px.length)
//     data[i]= imageDataIntArray[i-acount];
//     data[i+1] = imageDataIntArray[i+1-acount];
//     data[i+2] = imageDataIntArray[i+2-acount];
//     data[i+3]=255; // make this pixel opaque
//     acount+=1;
// }
//
// // put the modified pixels back on the canvas
// ctx.putImageData(canvasData,0,0);
// // ctx.putImageData(localimg,0,0);
//
// // create a new img object
// var image=new Image();
//
// // set the img.src to the canvas data url
// image.src=canvas.toDataURL();


// append the new img object to the page
// document.body.appendChild(image);
// }
