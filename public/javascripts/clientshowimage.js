window.addEventListener ?
window.addEventListener("load",drawpage,false) :
window.attachEvent && window.attachEvent("onload",drawpage);
var OGIMAGEURL;

function drawpage(coords){
  console.log("Window loaded");

var canvas = document.getElementById('canvas');
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

    if (typeof OGIMAGEURL === 'undefined') {
      OGIMAGEURL = window.URL.createObjectURL(blob);
      img.src = OGIMAGEURL;
    } else {
      img.src = window.URL.createObjectURL(blob);
    }


    document.getElementById("resetZoomButton").addEventListener("click", function(){
      img.src = OGIMAGEURL;
    });

    console.log("Image loaded");


    // var img = container.getElementsByTagName('mainimg')[0];
    // img.onload = function(e) {
      // window.URL.revokeObjectURL(img.src); // Clean up after yourself.
    // };
    // img.src = window.URL.createObjectURL(blob);
    // document.body.appendChild(img);

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


            // canvas = document.getElementById('canvas2');


            // var context = this.canvas.getContext('2d');
            // context.clearRect(0, 0, canvas.width, canvas.height);

            canvas.style.cursor = "default";
            console.log("finished.");
            console.log("x="+mouse.startX+", y="+mouse.startY);
            console.log("x="+mouse.x+", y="+mouse.y);
            var img = document.getElementById('mainimage');
            var imgWidth = img.clientWidth;
            var imgHeight = img.clientHeight;
            var hToWRatio = canvas.height/canvas.width;
            var xBuffer = parseInt((0.05 * $(window).width()) + (canvas.width-imgWidth)/2);
            var yBuffer = parseInt((0.05 * $(window).height()) + (canvas.height-imgHeight)/2);
            var coords = {};
            coords.x = (mouse.startX < mouse.x) ? mouse.startX : mouse.x;
            coords.x -= xBuffer;
            coords.boxWidth = Math.abs(mouse.x - mouse.startX);
            coords.boxHeight = Math.abs(parseInt(hToWRatio * coords.boxWidth));
            coords.y = (mouse.startY < mouse.y) ? mouse.startY : mouse.startY - coords.boxHeight;
            coords.y -= yBuffer;

            coords.imgWidth = imgWidth;
            coords.imgHeight = imgHeight;
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
