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
    // var fullwindowImg = document.querySelector('#fullwindow img');
    // var fullwindowCaption = document.querySelector('#fullwindow-caption');    
    document.body.style.position = 'relative';  /* reqd ios overflow: hidden */
    
    var windowfull = {
        images: [],
        currentIndex: false,
        elements: {
            container: null,
            img: null,
            caption: null,
            triggers: []
        },
        init: function(container, images=null, isGallery=false, displayCaption=false){
            if(!container) return;
            console.log(isGallery);
            this.elements.container = container;
            this.isGallery = isGallery;
            this.displayCaption = displayCaption;
            this.elements.container.dataset.isGallry = this.isGallery ? '1' : '0';
            this.images = images ?? document.querySelectorAll('img:not(.prevent-windowfull):not(.prevent-screenfull)');
            for(let i = 0; i < this.images.length; i++) 
                this.images[i].setAttribute('windowfull-index', i);
            this.renderElements();
            this.getElements();
            this.addListeners();
        },
        renderElements: function(){
            let html = '<div id="fullwindow-image-wrapper"><img id="fullwindow-image" class="prevent-windowfull fullwindow"></div>';
            if(this.isGallery) {
                html += '<div id="fullwindow-next-btn" class="fullwindow-control-btn"></div>';
                html += '<div id="fullwindow-prev-btn" class="fullwindow-control-btn"></div>';
                html += '<div id="close-fullwindow-btn" class="fullwindow-control-btn cross-btn"><img src="/media/svg/x-6-w.svg"></div>';
            }
            html += '<div id="fullwindow-caption" class="small white"></div>';
            
            if(this.displayCaption)
                html += '<div id="fullwindow-caption-btn" class="fullwindow-control-btn">CAPTION</div>';
            this.elements.container.innerHTML += html;
        },
        getElements: function(){
            this.elements.img = document.querySelector('#fullwindow-image-wrapper img');
            this.elements.caption = document.querySelector('#fullwindow-caption');
            
            if(this.isGallery) {
                this.elements.closeBtn = document.querySelector('#close-fullwindow-btn');
                this.elements.nextBtn = document.querySelector('#fullwindow-next-btn');
                this.elements.prevBtn = document.querySelector('#fullwindow-prev-btn');
            }
            if(this.displayCaption)
                this.elements.captionBtn = document.querySelector('#fullwindow-caption-btn');
        },
        addListeners: function(){
            for(let i = 0; i < this.images.length; i++ ){
                this.images[i].classList.add('fullwindow-trigger');
                this.images[i].addEventListener('click', function () {
                    this.launch(i);
                }.bind(this));
            }
            if(this.elements.closeBtn) this.elements.closeBtn.addEventListener('click', this.exit);
            if(this.isGallery) {
                this.elements.nextBtn.addEventListener('click', this.next.bind(this));
                this.elements.prevBtn.addEventListener('click', this.prev.bind(this));
                window.addEventListener('keydown', function(e){
                    if(!document.body.classList.contains('viewing-fullwindow')) return;
                    if(e.keyCode == 27) 
                        this.exit();
                    else if(e.keyCode == 39) 
                        this.next();
                    else if(e.keyCode == 37)
                        this.prev();
                }.bind(this));
            } else {
                this.elements.container.addEventListener('click', ()=>this.exit());
            }
            if(this.displayCaption) {
                this.elements.captionBtn.addEventListener('click', function(){
                    document.body.classList.toggle('viewing-fullwindow-caption');
                });
            }
            
            
        },
        request: function (element) {
            if(element.tagName.toLowerCase() !== 'img' || !this.elements.img || !this.elements.caption) return;
            this.elements.img.src = element.src;
            if(this.displayCaption) {
                if(element.getAttribute('caption')) {
                    this.elements.caption.innerHTML = element.getAttribute('caption');
                    this.elements.caption.classList.remove('empty');
                    this.elements.captionBtn.classList.remove('disabled');
                } else {
                    this.elements.caption.innerHTML = '';
                    this.elements.caption.classList.add('empty');
                    this.elements.captionBtn.classList.add('disabled');
                }
            }
            document.body.classList.add('viewing-fullwindow');
        },
        exit: function () {
            // if(element.tagName.toLowerCase() !== 'img' || !this.elements.img || !this.elements.caption) return;
            // document.body.style.overflow = 'initial';
            document.body.classList.remove('viewing-fullwindow-caption');
            document.body.classList.remove('viewing-fullwindow');
        },
        toggle: function (element) {
            if(element.tagName.toLowerCase() !== 'img' || !this.elements.img || !this.elements.caption) return;
            return this.isFullwindow ? this.exit(element) : this.request(element);
        },
        launch: function(i){
            this.currentIndex = i;
            if(this.isGallery)
                this.updateBtnStates();
            this.request(this.images[i]);
        },
        next: function(){
            if(this.currentIndex == this.images.length - 1) return;
            this.currentIndex ++;
            this.updateBtnStates();
            this.request(this.images[this.currentIndex]);
        },
        prev: function(){
            if(this.currentIndex == 0) return;
            this.currentIndex --;
            this.updateBtnStates();
            this.request(this.images[this.currentIndex]);
        },
        updateBtnStates: function(){
            if(this.currentIndex == 0) this.elements.prevBtn.classList.add('disabled');
            else this.elements.prevBtn.classList.remove('disabled');
            if(this.currentIndex == this.images.length - 1) this.elements.nextBtn.classList.add('disabled');
            else this.elements.nextBtn.classList.remove('disabled');
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
                return Boolean(document.body.classList.contains('block'));
            }
        }
    });

    if (isCommonjs) {
        module.exports = windowfull;
    } else {
        window.windowfull = windowfull;
    }
})();
