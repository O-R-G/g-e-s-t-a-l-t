/* 
    badge.js
    
    generic, should be replaced per site
    to draw and update the badge
*/

var canvas,
    context,
    step,
    steps,
    frames,
    delay;
var centerX,
    centerY,
    radius,
    direction;
var counter;

function badge_init() {
    var badge = document.getElementById("badge");
    canvas = badge.getElementsByTagName("canvas")[0];
    context = canvas.getContext("2d");

    // set canvas size based on container
    // canvas is always a square of the minimum dimension
    var computed_width = window.getComputedStyle(badge, null).getPropertyValue('width');
    var computed_width = parseFloat(computed_width, 10)
    var computed_height = window.getComputedStyle(badge, null).getPropertyValue('height');
    var computed_height = parseFloat(computed_height, 10)
    var min_ = Math.min(computed_width, computed_height);
    context.canvas.width = min_;
    context.canvas.height = min_;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    // debug
    console.log('computed_width = ' + computed_width);
    console.log('computed_height = ' + computed_height);
    console.log('canvas.width = ' + canvas.width);
    console.log('canvas.height = ' + canvas.height);
    console.log('centerX = ' + centerX);
    console.log('centerY = ' + centerY);

    context.fillStyle = "#FFFFFF";
    context.lineWidth = 8;
    context.strokeStyle = '#00F';
    counter = 0;
    radius = canvas.width / 2.25;
    // frames = 60;
    frames = 360;
    step = 2.0 * Math.PI / frames;
    // delay = 25; 
    delay = 10; 
    direction = 1;
    badge_animate();
}

function badge_animate() {
    counter++;
    context.clearRect(0, 0, canvas.width, canvas.height);
    var thisStep = (counter % frames) * step * direction;

    // change direction? in process
    // if (thisStep == 0) { direction = !direction; }
    // console.log(thisStep);

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, thisStep, false);
    context.stroke();
    t = setTimeout('badge_animate()', delay);
}

function badge_start_stop() {
    if (t) {
        clearTimeout(t);
        t = null;
    } else {
        setTimeout('badge_animate()', delay);
    }
}
