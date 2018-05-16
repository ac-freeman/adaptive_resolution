window.addEventListener ?
window.addEventListener("load",getImageShape,false) :
window.attachEvent && window.attachEvent("onload",getImageShape);
var OGIMAGEURL;

var fullImageWidth;
var fullImageHeight;

var imageSpecs = {sliceX1: 0, sliceX2:0, sliceY1:0,sliceY2:0,wZoomScale:0,hZoomScale:0};


var portWidth = parseInt(0.9 * $(window).width());
var MOVECONSTANT_RL = parseInt(portWidth/2);
var portHeight = parseInt(0.9 * $(window).height());
var MOVECONSTANT_UD = parseInt(portHeight/2);

var MOVERATIO = 2;
var imageStack = [];
var imageSpecsStack = [];
var touchesStack = [];
var lastZoomDistance = 0;
imageSpecsStack.push(imageSpecs);
var img;
var fullImg;
var MOVING = false;
var TOTALBANDWIDTH = 0;
document.onkeydown = function(e) {
  e = e || window.event;
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  switch (charCode) {
    case 37:
      if(!MOVING){
        moveDirection('L');
      } else {
        console.log("ALREADY MOVING");
      }
      break;
    case 38:
      if(!MOVING){
        moveDirection('U');
      } else {
        console.log("ALREADY MOVING");
      }
      break;
    case 39:
      if (!MOVING){
        moveDirection('R');
      } else {
        console.log("ALREADY MOVING");
      }
      break;
    case 40:
      if(!MOVING){
        moveDirection('D');
      } else {
        console.log("ALREADY MOVING");
      }
      break;
  }
};

function getImageShape() {
  console.log("Window loaded");

  img = document.getElementById('currentImage');
  img.onload = function(){
    console.log("IN ON LOAD FUNCTION");
    if (img.naturalHeight < portHeight && img.naturalWidth < portWidth && img.src != "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=") {
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

  initiateButtonListeners();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      var jsonresponse = JSON.parse(xhttp.responseText);
      fullImageWidth = jsonresponse.width;
      fullImageHeight = jsonresponse.height;
      console.log("WIDTH = " + fullImageWidth + "HEIGHT = " + fullImageHeight);
      document.getElementById('infoText').innerHTML = "Orignal image resolution: " + fullImageWidth + " X " + fullImageHeight;

      drawpage({});
    }
  };

  var el = document.getElementById('canvas2');
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchmove", handleMove);
  el.addEventListener("touchend", handleEnd);
  el.addEventListener("touchcancel", handleCancel);




  xhttp.open("GET", "/../getimageshape/"+imageId, true);

  xhttp.send();
}

function handleStart(evt) {
  evt.preventDefault(); //prevent click events from firing also
  console.log("touchstart.");
  var el = document.getElementById('canvas2');
  // var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    console.log("touchstart:" + i + "..." + touches[i].clientX +", " + touches[i].clientY);
    touchesStack.push(copyTouch(touches[i]));
    console.log("num touches = " + touchesStack.length);

    // console.log("touchstart:" + i + ".");
  }
}
var prevXdistance = 0;
function handleMove(evt) {
  evt.preventDefault(); //prevent click events from firing also
  console.log("touchmove.");
  var el = document.getElementById('canvas2');
  // var ctx = el.getContext('2d');
  var touches = evt.changedTouches;



  if (touchesStack.length == 2) {
    //two-finger gesture, check for zoom

    for (var i = 0; i < touches.length; i++) {
      var idx = ongoingTouchIndexById(touches[i].identifier);
      console.log(touches[i].clientX);
      console.log(touchesStack[idx].clientX);
      touchesStack.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
    }

    var img;
    var currentImage = document.getElementById('currentImage');
    if (currentImage.src == "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=") {
      img = document.getElementById('fullImage'); //we are on the full image still
    } else {
      img = currentImage;
    }


    var whratio = img.width / img.height;
    var newXdistance = Math.abs(touchesStack[0].clientX - touchesStack[1].clientX);

    if (prevXdistance == 0) {
      prevXdistance = newXdistance;
    }
    else  {  //horizontal zoom in
        console.log("currentwidth = " +img.style.width);
        console.log("currentwidth = " +img.width);
        // var newWidth = img.width + Math.abs(x1move) + Math.abs(x2move);
        var newWidth = img.width + (newXdistance - prevXdistance);
        var newHeight = parseInt(newWidth / whratio);
        img.style.width = newWidth + 'px';
        img.style.height = newHeight;
        console.log("NEW WIDTH = " + newWidth + ",   NEW HEIGHT = " + newHeight);
        prevXdistance = newXdistance;
    }


  }
}
function handleEnd(evt) {
  evt.preventDefault(); //prevent click events from firing also
  console.log("touchend.");
  var el = document.getElementById('canvas2');
  // var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    console.log("touchend:" + i + "...");
    // ongoingTouches.push(copyTouch(touches[i]));
    var idx = ongoingTouchIndexById(touches[i].identifier);
    touchesStack.splice(idx, 1);  // remove from stack
    console.log("touchend:" + i + ".");
  }
  prevXdistance = 0;
}

function handleCancel(evt) {
  evt.preventDefault(); //prevent click events from firing also
  console.log("touchcancel.");
  var el = document.getElementById('canvas2');
  // var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    console.log("touchcancel:" + i + "...");
    // ongoingTouches.push(copyTouch(touches[i]));
    console.log("touchcancel:" + i + ".");
  }
}

function copyTouch(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY, clientX: touch.clientX, clientY: touch.clientY};
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < touchesStack.length; i++) {
    var id = touchesStack[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

/////////////////////////////////////////////

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
  data.imageId = imageId;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/img2', true);
  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.responseType = 'blob';

  xhr.onload = function(e) {
    if (this.status == 200) {
      var blob = this.response;


      if (typeof OGIMAGEURL === 'undefined') {
        //request the full scaled image
        OGIMAGEURL = window.URL.createObjectURL(blob);
        fullImg.src = OGIMAGEURL;
      } else {
        //request a cropped image
        imageStack.push(img.src);
        fullImg.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        img.src = window.URL.createObjectURL(blob);
      }
      TOTALBANDWIDTH += blob.size;
      console.log('TOTAL BANDWIDTH = ' + TOTALBANDWIDTH);
      var bandwidth = TOTALBANDWIDTH/1024;
      if (bandwidth >= 1024) {
          bandwidth = Math.round((bandwidth/1024)*100)/100;
          document.getElementById('bandwidthText').innerHTML = "Total image bandwidth: " + bandwidth + "MB";
      }
      else {
        bandwidth = Math.round(bandwidth*100)/100;
        document.getElementById('bandwidthText').innerHTML = "Total image bandwidth: " + bandwidth + "KB";
      }
      console.log("Image loaded");
      MOVING = false;
    }
  };


  if (Object.keys(coords).length > 3) {
    coords.wWidth = portWidth;
    coords.wHeight = portHeight;
    coords.imageId = imageId;
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

    var img = document.getElementById('currentImage');
    if (img.src === "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=") {
      var img = document.getElementById('fullImage');
    }
    var imgWidth = img.clientWidth;
    var imgHeight = img.clientHeight;
    var xBuffer = parseInt((0.05 * $(window).width()) + (canvas.width-imgWidth)/2);
    var yBuffer = parseInt((0.05 * $(window).height()) + (canvas.height-imgHeight)/2);

    document.getElementById('coordinatesText').innerHTML = "X: " + mouse.x + ", Y: " + mouse.y;
    if (element !== null) {
      if (mouse.x < xBuffer) {
        mouse.x = xBuffer
      } else if (mouse.x > xBuffer + imgWidth -1) {
        mouse.x = xBuffer + imgWidth -1;
      }
      var xDiff = mouse.x - mouse.startX;
      var yDiff = mouse.y - mouse.startY;
      var width = Math.abs(xDiff);
      var height = width/ratio;
      if (yDiff < 0 && mouse.startY - height < yBuffer) {
        height = mouse.startY - yBuffer;
        width = height * ratio;
      } else if (yDiff >= 0 && mouse.startY + height > yBuffer + imgHeight) {
        height = imgHeight - mouse.startY - yBuffer;
        width = height * ratio;
      }

      element.style.width = width + 'px';

      element.style.height = height + 'px';
      console.log('height=' + height+' width=' + width);
      if (xDiff < 0) {
        mouse.x = mouse.startX - width;
      }
      if (yDiff < 0) {
        mouse.y = mouse.startY - height;
      }

      element.style.left = (xDiff < 0) ? mouse.x + 'px' : mouse.startX + 'px';
      element.style.top = (yDiff < 0) ? mouse.y + 'px' : mouse.startY + 'px';
    }
  }

  canvas.onclick = function (e) {
    var img = document.getElementById('currentImage');
    if (img.src === "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=") {
      var img = document.getElementById('fullImage');
    }
    var imgWidth = img.clientWidth;
    var imgHeight = img.clientHeight;
    var xBuffer = parseInt((0.05 * $(window).width()) + (canvas.width-imgWidth)/2);
    var yBuffer = parseInt((0.05 * $(window).height()) + (canvas.height-imgHeight)/2);
    if (element !== null) {

      var oldImageSpecs = imageSpecsStack.pop();

      canvas.style.cursor = "default";
      console.log("finished.");
      console.log("x="+mouse.startX+", y="+mouse.startY);
      console.log("x="+mouse.x+", y="+mouse.y);


      var hToWRatio = canvas.height/canvas.width;

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

      MOVECONSTANT_RL = parseInt((fullImageWidth - sliceX2 - sliceX1)/MOVERATIO);
      MOVECONSTANT_UD = parseInt((fullImageHeight - sliceY2 - sliceY1)/MOVERATIO);

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
      if (mouse.startX >= xBuffer && mouse.startX < xBuffer + imgWidth - 10 && mouse.startY >= yBuffer && mouse.startY <= yBuffer + imgHeight) {
        element = document.createElement('div');
        element.className = 'rectangle'
        element.style.left = mouse.x + 'px';
        element.style.top = mouse.y + 'px';
        canvas.appendChild(element)
        canvas.style.cursor = "crosshair";
      }
    }
  }

}


function initiateButtonListeners() {
  document.getElementById("rightButton").addEventListener("click", function(){
    moveDirection('R');
  });

  document.getElementById("leftButton").addEventListener("click", function(){
    moveDirection('L');
  });

  document.getElementById("upButton").addEventListener("click", function(){
    moveDirection('U');
  });

  document.getElementById("downButton").addEventListener("click", function(){
    moveDirection('D');
  });
}

function moveDirection(direction) {
  MOVING = true;
  if (img.src != OGIMAGEURL){
    console.log("MOVING " + direction);
    var imgBlob = imageStack.pop();
    var alreadyLast = false;

    var currentSpec = imageSpecsStack.pop();
    if (typeof currentSpec !== 'undefined') {
      let newSpec = Object.assign({}, currentSpec);


      switch(direction) {
        case 'L':
          if (newSpec.sliceX1 - MOVECONSTANT_RL > 1) {
            newSpec.sliceX1 -= MOVECONSTANT_RL;
            newSpec.sliceX2 += MOVECONSTANT_RL;
          } else if (newSpec.sliceX1 != 1){
            newSpec.sliceX2 += currentSpec.sliceX1;
            newSpec.sliceX1 = 1;
          } else {
            alreadyLast = true;
          }
          break;

        case 'R':
          if (newSpec.sliceX2 - MOVECONSTANT_RL > 1) {
            newSpec.sliceX1 += MOVECONSTANT_RL;
            newSpec.sliceX2 -= MOVECONSTANT_RL;
            console.log('currentSpec.sliceX1 = ' + currentSpec.sliceX1 + ',    newSpec.sliceX1 = ' + newSpec.sliceX1);
          } else if (newSpec.sliceX2 != 1){
            newSpec.sliceX1 += currentSpec.sliceX2;
            newSpec.sliceX2 = 1;
          } else {
            alreadyLast = true;
          }
          break;

          case 'D':
            if (newSpec.sliceY2 - MOVECONSTANT_UD > 1) {
              newSpec.sliceY1 += MOVECONSTANT_UD;
              newSpec.sliceY2 -= MOVECONSTANT_UD;
            } else if (newSpec.sliceY2 != 1){
              newSpec.sliceY1 += currentSpec.sliceY2;
              newSpec.sliceY2 = 1;
            } else {
              alreadyLast = true;
            }
            break;

          case 'U':
            if (newSpec.sliceY1 - MOVECONSTANT_UD > 1) {
              newSpec.sliceY1 -= MOVECONSTANT_UD;
              newSpec.sliceY2 += MOVECONSTANT_UD;
            } else if (newSpec.sliceY1 != 1){
              newSpec.sliceY2 += currentSpec.sliceY1;
              newSpec.sliceY1 = 1;
            } else {
              alreadyLast = true;
            }
          break;
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
        imageSpecsStack.push(coords2);
        imageStack.push(imgBlob);
        drawpage(coords2);
      } else {
        imageSpecsStack.push(currentSpec);
        MOVING = false;
        alert("Cannot move any more");
      }
    } else {
      MOVING = false;
      imageSpecsStack.push(currentSpec);
    }

  }
}
