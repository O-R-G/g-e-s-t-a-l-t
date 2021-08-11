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

/*
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, thisStep, false);
    context.stroke();
*/

// https://stackoverflow.com/questions/6824391/drawing-a-spiral-on-an-html-canvas-using-javascript
    a = 1;
    b = 3;
    loops = 1.25;

    // context.rotate(1 * Math.PI / 180, centerX, centerY);
// rotate around center
// ** in process **

// https://stackoverflow.com/questions/37914999/how-to-rotate-a-canvas-object-around-its-center-following-mouse-move-event
// https://stackoverflow.com/questions/54487721/how-to-rotate-an-image-on-an-html5-canvas-around-center


/*
context.save();
context.translate(100 + width/2, 100 + height/2);
context.rotate(-angle);
context.translate(-width/2, -height/2);
context.strokeRect(0, 0, 100, 100);
context.restore();
*/

// dwg based on 
// https://stackoverflow.com/questions/6824391/drawing-a-spiral-on-an-html-canvas-using-javascript

    context.moveTo(centerX, centerY);
    context.beginPath();
    for (i = 0; i < 360 * loops; i++) {
        angle = 0.1 * i;
        x = centerX + (a + b * angle) * Math.cos(angle);
        y = centerY + (a + b * angle) * Math.sin(angle);

        context.lineTo(x, y);
    }
    context.strokeStyle = "#000";
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
