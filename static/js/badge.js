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
var a = 1,
    b = 3,
    loops = 1.25,
    increment = -0.025;                     // aka rotate speed
var scaler = 1.0,                           // adjusts dynamically
    canvas_base = 350;                      // base canvas size for spiral

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

    // set spiral b size based on current canvas size
    scaler = canvas.width / canvas_base;

    badge_animate();
}


function badge_animate() {
    counter++;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(centerX, centerY);    // mv to abs. center
    context.rotate(increment * counter);    // rotate
    context.scale(scaler, scaler);          // adjust spiral size 
    context.beginPath();                    // draw spiral
    for (i = 0; i < 360 * loops; i++) {
        angle = 0.1 * i;
        x = (a + b * angle) * Math.cos(angle);
        y = (a + b * angle) * Math.sin(angle);
        context.lineTo(x, y);
    }
    context.strokeStyle = "#000";
    context.stroke();
    context.restore();

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
