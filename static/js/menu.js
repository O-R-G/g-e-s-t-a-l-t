// hide_show_menu

var menu = document.getElementById('menu');
var main = document.getElementById('main');
var badge = document.getElementById('badge');
badge.addEventListener('click', hide_show_menu);

function hide_show_menu() {
    menu.classList.toggle("hidden");
    main.classList.toggle("hidden");
    badge_start_stop();
}

// stub

/*
function badge_start_stop() {
    // check if badge is started, then start or stop
    console.log('badge stopped');
    console.log('badge started');
}
*/
