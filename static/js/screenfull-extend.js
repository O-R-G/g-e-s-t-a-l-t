/*
    O-R-G inc.

    windowfull object
    screenfull.js shim for iOS safari
    see https://github.com/sindresorhus/screenfull.js/
*/
class ScreenfullExtended {
    constructor(screenfull, container, images = null, isGallery = false, displayCaption = false) {
        if(!screenfull || typeof screenfull === 'undefined' || !screenfull.isEnabled) {
            console.log('screenfull is not defined');
            return;
        }
        if (!container) {
            console.log('container passed to ScreefullExtended is not found');
            return;
        }

        this.screenfull = screenfull;
        this.container = container;
        this.images = images ? images : document.querySelectorAll('img:not(.prevent-screenfull)');
        if (!this.images.length) return;

        this.currentIndex = false;
        this.isGallery = isGallery;
        this.displayCaption = displayCaption;
        this.timer = null;
        this.isMultiple = this.images.length !== 1;
        this.elements = {
            container: container,
            img: null,
            caption: null,
            closeBtn: null,
            nextBtn: null,
            prevBtn: null,
            captionBtn: null,
            triggers: []
        };

        this.assignImageIndexes();
        this.renderElements();
        this.getElements();
        this.addListeners();
        this.updateScreenfullState();
    }

    assignImageIndexes() {
        for (let i = 0; i < this.images.length; i++) {
            this.images[i].setAttribute('screenfull-index', i);
        }
    }
    renderElements() {
        this.elements.container.innerHTML += '<div id="screenfull-image-wrapper"><img id="screenfull-image" class="screenfull"></div>';
        if (this.isGallery) {
            this.elements.container.innerHTML += '<div id="screenfull-next-btn" class="screenfull-control-btn no-select"></div>';
            this.elements.container.innerHTML += '<div id="screenfull-prev-btn" class="screenfull-control-btn no-select"></div>';
        }
        this.elements.container.innerHTML += '<div id="screenfull-caption" class="white caption"></div>';
        this.elements.container.innerHTML += '<div id="close-screenfull-btn" class="screenfull-control-btn cross-btn"><img src="/media/svg/x-9-w.svg"></div>';

        if (this.displayCaption)
            this.elements.container.innerHTML += '<div id="screenfull-caption-btn" class="screenfull-control-btn">CAPTION</div>';
    }

    getElements() {
        this.elements.img = document.querySelector('#screenfull-image-wrapper img');
        this.elements.caption = document.querySelector('#screenfull-caption');
        this.elements.closeBtn = document.querySelector('#close-screenfull-btn');
        if (this.isGallery) {
            this.elements.nextBtn = document.querySelector('#screenfull-next-btn');
            this.elements.prevBtn = document.querySelector('#screenfull-prev-btn');
        }
        if (this.displayCaption)
            this.elements.captionBtn = document.querySelector('#screenfull-caption-btn');
    }

    addListeners() {
        for (let i = 0; i < this.images.length; i++) {
            const image = this.images[i];
            image.classList.add('screenfull-trigger');
            image.addEventListener('click', () => {
                this.extRequest(image);
            });
            this.elements.triggers.push(image);
        }

        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => {
                this.screenfull.extWxit();
            });
        }
        if (this.isGallery && this.elements.nextBtn && this.elements.prevBtn) {
            this.elements.nextBtn.addEventListener('click', () => this.next());
            this.elements.prevBtn.addEventListener('click', () => this.prev());
            window.addEventListener('keydown', (e) => {
                if (!document.body.classList.contains('viewing-screenfull')) return;
                if (e.key == 'ArrowRight')
                    this.next();
                else if (e.key == 'ArrowLeft')
                    this.prev();
            });
        }
        if(!this.isGallery) {
            this.container.addEventListener('click', ()=>{
                this.extExit();
            });
        }

        this.screenfull.on('change', () => {
            console.log(screenfull.isFullscreen);
            if (!screenfull.isFullscreen) {
                if (this.timer) clearTimeout(this.timer);
                document.body.classList.remove('viewing-screenfull-caption');
                document.body.classList.remove('viewing-screenfull');
            }
            this.updateScreenfullState();
        });

        if (this.displayCaption && this.elements.captionBtn) {
            this.elements.captionBtn.addEventListener('click', () => {
                document.body.classList.toggle('viewing-screenfull-caption');
            });
        }

        this.elements.container.addEventListener('mousemove', this.delayHidingControls.bind(this));
        this.elements.container.addEventListener('click', this.delayHidingControls.bind(this));
    }

    next() {
        if (!this.isMultiple && this.currentIndex === this.images.length - 1) {
            this.extExit();
            return;
        }
        this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
        this.updateBtnStates();
        this.extRequest(this.images[this.currentIndex]);
    }

    prev() {
        if (!this.isMultiple && this.currentIndex == 0) {
            this.extExit();
            return;
        }
        this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.updateBtnStates();
        this.extRequest(this.images[this.currentIndex]);
    }

    updateBtnStates() {
        if (!this.elements.prevBtn || !this.elements.nextBtn) return;
        if (this.currentIndex == 0) this.elements.prevBtn.classList.add('disabled');
        else this.elements.prevBtn.classList.remove('disabled');
        if (this.currentIndex == this.images.length - 1) this.elements.nextBtn.classList.add('disabled');
        else this.elements.nextBtn.classList.remove('disabled');
    }

    extRequest(element) {
        if (!element || element.tagName.toLowerCase() !== 'img' || !this.elements.img || !this.elements.caption) return;
        this.elements.img.src = element.src;
        this.currentIndex = parseInt(element.getAttribute('screenfull-index'));
        if (this.displayCaption && this.elements.caption && this.elements.captionBtn) {
            if (element.getAttribute('caption')) {
                this.elements.caption.innerHTML = element.getAttribute('caption');
                this.elements.caption.classList.remove('empty');
                this.elements.captionBtn.classList.remove('disabled');
            } else {
                this.elements.caption.innerHTML = '';
                this.elements.caption.classList.add('empty');
                this.elements.captionBtn.classList.add('disabled');
            }
        }
        document.body.classList.add('viewing-screenfull');
        document.body.classList.add('viewing-screenfull-caption');
        this.screenfull.request(this.container);
        this.updateScreenfullState();
    }

    extExit() {
        if (this.timer) clearTimeout(this.timer);
        document.body.classList.remove('viewing-screenfull-caption');
        document.body.classList.remove('viewing-screenfull');
        this.screenfull.exit();
        this.updateScreenfullState();
    }

    delayHidingControls() {
        this.elements.container.classList.remove('hiding-controls');
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.elements.container.classList.add('hiding-controls');
            this.timer = null;
            this.updateScreenfullState();
        }, 1500);
        this.updateScreenfullState();
    }

    updateScreenfullState() {
        this.screenfull.currentIndex = this.currentIndex;
        this.screenfull.elements = this.elements;
        this.screenfull.isGallery = this.isGallery;
        this.screenfull.displayCaption = this.displayCaption;
        this.screenfull.timer = this.timer;
        this.screenfull.images = this.images;
        this.screenfull.isMultiple = this.isMultiple;
        this.screenfull.extInstance = this;
    }
};
