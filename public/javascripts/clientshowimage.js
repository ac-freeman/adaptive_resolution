window.addEventListener ?
window.addEventListener("load",drawpage,false) :
window.attachEvent && window.attachEvent("onload",drawpage);

function drawpage(){
  console.log("Window loaded");

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
    console.log("Image loaded");
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
