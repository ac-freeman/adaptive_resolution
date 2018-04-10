window.addEventListener ?
window.addEventListener("load",getImageShape,false) :
window.attachEvent && window.attachEvent("onload",getImageShape);
var OGIMAGEURL;
var MOVECONSTANT = 500;
var fullImageWidth;
var fullImageHeight;

var imageSpecs = {sliceX1: 0, sliceX2:0, sliceY1:0,sliceY2:0,wZoomScale:0,hZoomScale:0};


var portWidth = parseInt(0.9 * $(window).width());
var portHeight = parseInt(0.9 * $(window).height());
var imageStack = [];
var imageSpecsStack = [];
imageSpecsStack.push(imageSpecs);
var img;

function getImageShape() {
  console.log("Window loaded");

  img = document.getElementById('currentImage');
  img.onload = function(){
    console.log("IN ON LOAD FUNCTION");
    if (img.naturalWidth*img.naturalHeight < portHeight*portWidth && img.src != "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=") {
      document.getElementById('messageText').innerHTML = "Zoomed in too far";
    } else {
      document.getElementById('messageText').innerHTML = "";
    }
  }
  fullImg = document.getElementById('fullImage');


  document.getElementById("resetZoomButton").addEventListener("click", function(){
    fullImg.src = OGIMAGEURL;
    img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    imageStack = [];
    imageSpecsStack = [];
    imageSpecsStack.push(imageSpecs);
  });


  document.getElementById("undoLastZoomButton").addEventListener("click", function(){
    if (img.src != OGIMAGEURL){
      console.log("UNDOING LAST ZOOM");
      var imgBlob = imageStack.pop();
      if (typeof imgBlob !== 'undefined') {
        console.log("imgBlob: " +imgBlob);
        if (imgBlob == "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=") {
          console.log("Undoing to original image");
          fullImg.src = OGIMAGEURL;
          img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        } else {
          console.log("NOT undoing to original image");
          img.src = imgBlob;
          }
      }
      imageSpecsStack.pop();
    }
  });

  document.getElementById("rightButton").addEventListener("click", function(){
    if (img.src != OGIMAGEURL){
      console.log("MOVING RIGHT");
      var imgBlob = imageStack.pop();
      var alreadyLast = false;

      var currentSpec = imageSpecsStack.pop();
      if (typeof currentSpec !== 'undefined') {
        var newSpec = currentSpec;
        if (newSpec.sliceX2 - MOVECONSTANT > 1) {
          newSpec.sliceX1 += MOVECONSTANT;
          newSpec.sliceX2 -= MOVECONSTANT;
        } else if (newSpec.sliceX2 != 1){
          newSpec.sliceX1 += currentSpec.sliceX2;
          newSpec.sliceX2 = 1;
        } else {
          alreadyLast = true;
        }

        if (!alreadyLast) {


          var coords2 = {};
          coords2.boxWidth = portWidth;
          coords2.boxHeight = portHeight;
          coords2.wWidth = portWidth;
          coords2.wHeight = portHeight
          coords2.wZoomScale = newSpec.wZoomScale
          coords2.hZoomScale = newSpec.hZoomScale;
          coords2.sliceX1 = newSpec.sliceX1;
          coords2.sliceX2 = newSpec.sliceX2
          coords2.sliceY1 = newSpec.sliceY1;
          coords2.sliceY2 = newSpec.sliceY2
          imageSpecsStack.push(currentSpec);
          imageSpecsStack.push(newSpec);
          imageStack.push(imgBlob);
          drawpage(coords2);
        } else {
          alert("Cannot move any more");
        }
      } else {
        imageSpecsStack.push(currentSpec);
      }

    }
  });

  document.getElementById("leftButton").addEventListener("click", function(){
    if (img.src != OGIMAGEURL){
      console.log("MOVING LEFT");
      var imgBlob = imageStack.pop();
      var alreadyLast = false;

      var currentSpec = imageSpecsStack.pop();
      if (typeof currentSpec !== 'undefined') {
        var newSpec = currentSpec;
        if (newSpec.sliceX1 - MOVECONSTANT > 1) {
          newSpec.sliceX1 -= MOVECONSTANT;
          newSpec.sliceX2 += MOVECONSTANT;
        } else if (newSpec.sliceX1 != 1){
          newSpec.sliceX2 += currentSpec.sliceX1;
          newSpec.sliceX1 = 1;
        } else {
          alreadyLast = true;
        }

        if (!alreadyLast) {


          var coords2 = {};
          coords2.boxWidth = portWidth;
          coords2.boxHeight = portHeight;
          coords2.wWidth = portWidth;
          coords2.wHeight = portHeight
          coords2.wZoomScale = newSpec.wZoomScale
          coords2.hZoomScale = newSpec.hZoomScale;
          coords2.sliceX1 = newSpec.sliceX1;
          coords2.sliceX2 = newSpec.sliceX2
          coords2.sliceY1 = newSpec.sliceY1;
          coords2.sliceY2 = newSpec.sliceY2
          imageSpecsStack.push(currentSpec);
          imageSpecsStack.push(newSpec);
          imageStack.push(imgBlob);
          drawpage(coords2);
        } else {
          alert("Cannot move any more");
        }
      } else {
        imageSpecsStack.push(currentSpec);
      }

    }
  });

  document.getElementById("upButton").addEventListener("click", function(){
    if (img.src != OGIMAGEURL){
      console.log("MOVING UP");
      var imgBlob = imageStack.pop();
      var alreadyLast = false;

      var currentSpec = imageSpecsStack.pop();
      if (typeof currentSpec !== 'undefined') {
        var newSpec = currentSpec;
        if (newSpec.sliceY1 - MOVECONSTANT > 1) {
          newSpec.sliceY1 -= MOVECONSTANT;
          newSpec.sliceY2 += MOVECONSTANT;
        } else if (newSpec.sliceY1 != 1){
          newSpec.sliceY2 += currentSpec.sliceY1;
          newSpec.sliceY1 = 1;
        } else {
          alreadyLast = true;
        }

        if (!alreadyLast) {


          var coords2 = {};
          coords2.boxWidth = portWidth;
          coords2.boxHeight = portHeight;
          coords2.wWidth = portWidth;
          coords2.wHeight = portHeight
          coords2.wZoomScale = newSpec.wZoomScale
          coords2.hZoomScale = newSpec.hZoomScale;
          coords2.sliceX1 = newSpec.sliceX1;
          coords2.sliceX2 = newSpec.sliceX2
          coords2.sliceY1 = newSpec.sliceY1;
          coords2.sliceY2 = newSpec.sliceY2
          imageSpecsStack.push(currentSpec);
          imageSpecsStack.push(newSpec);
          imageStack.push(imgBlob);
          drawpage(coords2);
        } else {
          alert("Cannot move any more");
        }
      } else {
        imageSpecsStack.push(currentSpec);
      }

    }
  });

  document.getElementById("downButton").addEventListener("click", function(){
    if (img.src != OGIMAGEURL){
      console.log("MOVING DOWN");
      var imgBlob = imageStack.pop();
      var alreadyLast = false;

      var currentSpec = imageSpecsStack.pop();
      if (typeof currentSpec !== 'undefined') {
        var newSpec = currentSpec;
        if (newSpec.sliceY2 - MOVECONSTANT > 1) {
          newSpec.sliceY1 += MOVECONSTANT;
          newSpec.sliceY2 -= MOVECONSTANT;
        } else if (newSpec.sliceY2 != 1){
          newSpec.sliceY1 += currentSpec.sliceY2;
          newSpec.sliceY2 = 1;
        } else {
          alreadyLast = true;
        }

        if (!alreadyLast) {


          var coords2 = {};
          coords2.boxWidth = portWidth;
          coords2.boxHeight = portHeight;
          coords2.wWidth = portWidth;
          coords2.wHeight = portHeight
          coords2.wZoomScale = newSpec.wZoomScale
          coords2.hZoomScale = newSpec.hZoomScale;
          coords2.sliceX1 = newSpec.sliceX1;
          coords2.sliceX2 = newSpec.sliceX2
          coords2.sliceY1 = newSpec.sliceY1;
          coords2.sliceY2 = newSpec.sliceY2
          imageSpecsStack.push(currentSpec);
          imageSpecsStack.push(newSpec);
          imageStack.push(imgBlob);
          drawpage(coords2);
        } else {
          alert("Cannot move any more");
        }
      } else {
        imageSpecsStack.push(currentSpec);
      }

    }
  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      var jsonresponse = JSON.parse(xhttp.responseText);
      fullImageWidth = jsonresponse.width;
      fullImageHeight = jsonresponse.height;
      console.log("WIDTH = " + fullImageWidth + "HEIGHT = " + fullImageHeight);

      drawpage({});
    }
  };
  xhttp.open("GET", "getimageshape", true);

  xhttp.send();
}

function drawpage(coords){

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = portWidth;
  canvas.height = portHeight;

  //Draw rectangle
  ctx.beginPath();
  ctx.lineWidth="6";
  ctx.strokeStyle="red";
  ctx.rect(0,0,portWidth,portHeight);
  ctx.stroke();
  ctx.imageSmoothingEnabled = false;

  var data = {};
  data.width =    portWidth;// returns height of browser viewport
  data.height =  portHeight;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/img2', true);
  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.responseType = 'blob';

  xhr.onload = function(e) {
    if (this.status == 200) {
      var blob = this.response;

      if (typeof OGIMAGEURL === 'undefined') {
        OGIMAGEURL = window.URL.createObjectURL(blob);
        fullImg.src = OGIMAGEURL;
      } else {
        imageStack.push(img.src);
        fullImg.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        img.src = window.URL.createObjectURL(blob);
      }

      console.log("Image loaded");
    }
  };

  if (Object.keys(coords).length > 2) {
    coords.wWidth = portWidth;
    coords.wHeight = portHeight;
    console.log(JSON.stringify(coords));
    console.log("requesting with coords");
    xhr.send(JSON.stringify(coords));
  } else {

    console.log("requesting without coords");
    xhr.send(JSON.stringify(data));
  }
  var canvas2 = document.getElementById('canvas2');

  initDraw(canvas2, portWidth, portHeight);

};





//from http://jsfiddle.net/d9BPz/546/
function initDraw(canvas, portWidth, portHeight) {
  console.log(portWidth + ',' + portHeight);
  var ratio = portWidth/portHeight;

  canvas.width = portWidth;
  canvas.height = portHeight;

  function setMousePosition(e) {
    var ev = e || window.event; //Moz || IE
    if (ev.pageX) { //Moz
      mouse.x = ev.pageX + window.pageXOffset;
      mouse.y = ev.pageY + window.pageYOffset;
    } else if (ev.clientX) { //IE
      mouse.x = ev.clientX + document.body.scrollLeft;
      mouse.y = ev.clientY + document.body.scrollTop;
    }
  };

  var mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
  };
  var element = null;

  canvas.onmousemove = function (e) {
    setMousePosition(e);
    document.getElementById('coordinatesText').innerHTML = "X: " + mouse.x + ", Y: " + mouse.y;
    if (element !== null) {
      var xDiff = mouse.x - mouse.startX;
      var width = Math.abs(xDiff);
      element.style.width = width + 'px';
      // element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
      var height = Math.abs(xDiff)/ratio;
      element.style.height = height + 'px';
      console.log('height=' + height+' width=' + width);

      element.style.left = (xDiff < 0) ? mouse.x + 'px' : mouse.startX + 'px';
      element.style.top = (mouse.y - mouse.startY < 0) ? mouse.startY - height + 'px' : mouse.startY + 'px';
    }
  }

  canvas.onclick = function (e) {
    if (element !== null) {

      var oldImageSpecs = imageSpecsStack.pop();

      canvas.style.cursor = "default";
      console.log("finished.");
      console.log("x="+mouse.startX+", y="+mouse.startY);
      console.log("x="+mouse.x+", y="+mouse.y);
      var img = document.getElementById('currentImage');
      if (img.src === "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=") {
        var img = document.getElementById('fullImage');
      }
      var imgWidth = img.clientWidth;
      var imgHeight = img.clientHeight;
      var hToWRatio = canvas.height/canvas.width;
      var xBuffer = parseInt((0.05 * $(window).width()) + (canvas.width-imgWidth)/2);
      var yBuffer = parseInt((0.05 * $(window).height()) + (canvas.height-imgHeight)/2);
      var coords = {};
      var x = (mouse.startX < mouse.x) ? mouse.startX : mouse.x;
      x -= xBuffer;
      coords.boxWidth = Math.abs(mouse.x - mouse.startX);
      coords.boxHeight = Math.abs(parseInt(hToWRatio * coords.boxWidth));
      var y = (mouse.startY < mouse.y) ? mouse.startY : mouse.startY - coords.boxHeight;
      y -= yBuffer;

      if (oldImageSpecs.wZoomScale == 0 && oldImageSpecs.hZoomScale == 0) {
        coords.wZoomScale = fullImageWidth / imgWidth;  //every x pixel in canvas = this many pixels in orginal image
        coords.hZoomScale = fullImageHeight / imgHeight;
      } else {
        coords.wZoomScale = oldImageSpecs.wZoomScale;
        coords.hZoomScale = oldImageSpecs.hZoomScale;
      }

      if (oldImageSpecs.sliceX2 == 0) {
        var sliceX2 = fullImageWidth - ((coords.boxWidth + x) * coords.wZoomScale);
      } else {
        var sliceX2 = ((portWidth - (coords.boxWidth + x)) * coords.wZoomScale) + oldImageSpecs.sliceX2;
      }
      if (oldImageSpecs.sliceY2 == 0) {
        var sliceY2 = fullImageHeight - ((coords.boxHeight + y) * coords.hZoomScale);
      } else {
        var sliceY2 = ((portHeight - (coords.boxHeight + y)) * coords.hZoomScale) + oldImageSpecs.sliceY2;
      }
      coords.sliceX2 = sliceX2;

      coords.sliceY2 = sliceY2;

      if (oldImageSpecs.sliceX1 == 0) {
        var sliceX1 = (x * coords.wZoomScale);
      } else {
        var sliceX1 = oldImageSpecs.sliceX1 + (x * coords.wZoomScale);
      }
      if (oldImageSpecs.sliceY1 == 0) {
        var sliceY1 = (y * coords.hZoomScale);
      } else {
        var sliceY1 = oldImageSpecs.sliceY1 + (y * coords.hZoomScale);
      }

      coords.sliceX1 = sliceX1;
      coords.sliceY1 = sliceY1;

      hZoomScale = ((fullImageHeight - sliceY1 - sliceY2) / portHeight);
      console.log("fullImageHeight = " + fullImageHeight + ",    sliceY1 = " + sliceY1 + ",    sliceY2 = " + sliceY2 + ",    imgHeight = " + imgHeight + ",    portHeight = " + portHeight);
      console.log("new oldHZoomScale = " + hZoomScale);
      wZoomScale = ((fullImageWidth - sliceX1 - sliceX2) / portWidth);
      console.log("fullImageWidth = " + fullImageWidth + ",    sliceX1 = " + sliceX1 + ",    sliceX2 = " + sliceX2 + ",    imgWidth = " + imgWidth + ",    portWidth = " + portWidth);
      console.log("new oldWZoomScale = " + wZoomScale);

      imageSpecsStack.push(oldImageSpecs);
      var newImageSpecs = {sliceX1: sliceX1, sliceX2:sliceX2, sliceY1:sliceY1,sliceY2:sliceY2,wZoomScale:wZoomScale,hZoomScale:hZoomScale};
      imageSpecsStack.push(newImageSpecs);
      drawpage(coords);
      element.style.display = 'none';
      element = null;

    } else {
      console.log("begun.");
      console.log("x="+mouse.x+", y="+mouse.y);
      mouse.startX = mouse.x;
      mouse.startY = mouse.y;
      element = document.createElement('div');
      element.className = 'rectangle'
      element.style.left = mouse.x + 'px';
      element.style.top = mouse.y + 'px';
      canvas.appendChild(element)
      canvas.style.cursor = "crosshair";
    }
  }
}
