/*
    O-R-G inc.

    windowfull object
    screenfull.js shim for iOS safari
    see https://github.com/sindresorhus/screenfull.js/
*/

(function () {
    'use strict';

    var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
    var isCommonjs = typeof module !== 'undefined' && module.exports;
    var fullwindow = document.getElementById('fullwindow')            
    document.body.style.position = 'relative';  /* reqd ios overflow: hidden */

    var windowfull = {
        request: function (element) {
            document.body.style.overflow = 'hidden';
            fullwindow.style.display = 'block';
            element.classList.toggle('fullwindow');
            },
        exit: function (element) {
            document.body.style.overflow = 'initial';
            fullwindow.style.display = 'none';
            element.classList.toggle('fullwindow');
        },
        toggle: function (element) {
            return this.isFullwindow ? this.exit(element) : this.request(element);
        }
    };

    Object.defineProperties(windowfull, {
        isFullwindow: {
            get: function () {
                // check if currently fullwindow
                // (by presence of class?
                // or presence of div)
                // return true;
                // return Boolean(document[fn.fullscreenElement]);
                // return Boolean(!(document.getElementById('fullwindow')));
                // return Boolean(document.getElementById('fullwindow'));
                return Boolean(fullwindow.style.display == 'block');
            }
        }
    });

    if (isCommonjs) {
        module.exports = windowfull;
    } else {
        window.windowfull = windowfull;
    }
})();
