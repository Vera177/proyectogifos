let btnSwitch = document.getElementById('btnSwitch');
let imageLogo = document.getElementById('imageLogo');
let searchIcon = document.getElementById('searchIcon');
let createGifs = document.getElementById('createGifs');
//hamburguer
let arrowLeft = document.getElementById('arrowLeft');
let arrowRight = document.getElementById('arrowRight');
let hamIconImg = document.getElementById('hamIconImg');
//social media
let fb = document.getElementById('fb');
let tw = document.getElementById('tw');
let ig = document.getElementById('ig');
//Create gifs' elements
let cameraPicture = document.getElementById('cameraPicture');
let reelFilm = document.getElementById('reelFilm');

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
    
    if (document.body.classList.contains('dark')){
        localStorage.setItem('dark-mode', 'true');
        changeIconDarkMode();  
    }else{
        localStorage.setItem('dark-mode', 'false');
        changeIconDayMode();
    }
})

/* Saving nocturne mode in all webpages, include when recharging page */

if(localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    changeIconDarkMode();  
}else {
    document.body.classList.remove('dark');
    changeIconDayMode();
}

/* change images */

function changeIconDarkMode () {
    btnSwitch.innerHTML= 'MODO DIURNO';

    imageLogo.setAttribute('src', './assets/logo-mobile-modo-noct.svg');
    createGifs.setAttribute('src', './assets/CTA-crear-gifo-modo-noc.svg');
    hamIconImg.setAttribute('src', './assets/burger-modo-noct.svg');

    createGifs.addEventListener('mouseover', () => createGifs.setAttribute('src', './assets/CTA-crear-gifo-hover-modo-noc.svg'));
    createGifs.addEventListener('mouseout', () => createGifs.setAttribute('src', './assets/CTA-crear-gifo-modo-noc.svg'));

    if(cameraPicture){
        cameraPicture.setAttribute('src', './assets/camara-modo-noc.svg');
        reelFilm.setAttribute('src', './assets/pelicula-modo-noc.svg');
    }
    
    if(arrowRight){
        arrowLeft.addEventListener('mouseover', () => arrowLeft.setAttribute('src', './assets/button-slider-left-hover.svg'));
        arrowLeft.addEventListener('mouseout', () => arrowLeft.setAttribute('src', './assets/button-slider-left-md-noct.svg'));

        arrowLeft.setAttribute('src', './assets/button-slider-left-md-noct.svg');
        arrowRight.setAttribute('src', './assets/button-slider-right-md-noct.svg');

        arrowRight.addEventListener('mouseover', () => arrowRight.setAttribute('src', './assets/Button-Slider-right-hover.svg'));
        arrowRight.addEventListener('mouseout', () => arrowRight.setAttribute('src', './assets/button-slider-right-md-noct.svg'));
    }

    if (searchIcon) {
        searchIcon.setAttribute('src', './assets/icon-search-mod-noc.svg');
        searchIcon.addEventListener('click', () => 
        searchIcon.setAttribute('src', './assets/close-modo-noct.svg'));
    }
    
    fb.addEventListener('mouseover', () => fb.setAttribute('src', './assets/icon_facebook.svg'));
    fb.addEventListener('mouseout', () => fb.setAttribute('src', './assets/icon_facebook.svg'));

    tw.addEventListener('mouseover', () => tw.setAttribute('src', './assets/icon-twitter.svg'));
    tw.addEventListener('mouseout', () => tw.setAttribute('src', './assets/icon-twitter.svg'));

    ig.addEventListener('mouseover', () => ig.setAttribute('src', './assets/icon_instagram.svg'));
    ig.addEventListener('mouseout', () => ig.setAttribute('src', './assets/icon_instagram.svg'));
}

function changeIconDayMode () {
    btnSwitch.innerHTML= 'MODO NOCTURNO';
    
    imageLogo.setAttribute('src', './assets/logo-desktop.svg');
    createGifs.setAttribute('src', './assets/button-crear-gifo.svg');
    hamIconImg.setAttribute('src', './assets/burger.svg');

    createGifs.addEventListener('mouseover', () => createGifs.setAttribute('src', './assets/CTA-crear-gifo-hover.svg'));
    createGifs.addEventListener('mouseout', () => createGifs.setAttribute('src', './assets/button-crear-gifo.svg'));

    if(cameraPicture){
        cameraPicture.setAttribute('src', './assets/camara.svg');
        reelFilm.setAttribute('src', './assets/pelicula.svg');
    }
  

    if (searchIcon) {
        searchIcon.setAttribute('src', './assets/icon-search.svg');
        searchIcon.addEventListener('click', () => 
        searchIcon.setAttribute('src', './assets/close.svg'));
    }

    if(arrowRight){
        arrowLeft.addEventListener('mouseover', () => arrowLeft.setAttribute('src', './assets/button-slider-left-hover.svg'));
        arrowLeft.addEventListener('mouseout', () => arrowLeft.setAttribute('src', './assets/button-slider-left.svg'));

        arrowLeft.setAttribute('src', './assets/button-slider-left.svg');
        arrowRight.setAttribute('src', './assets/Button-Slider-right.svg');

        arrowRight.addEventListener('mouseover', () => arrowRight.setAttribute('src', './assets/Button-Slider-right-hover.svg'));
        arrowRight.addEventListener('mouseout', () => arrowRight.setAttribute('src', './assets/Button-Slider-right.svg'));
    }
    
    fb.addEventListener('mouseover', () => fb.setAttribute('src', './assets/icon_facebook_hover.svg'));
    fb.addEventListener('mouseout', () => fb.setAttribute('src', './assets/icon_facebook.svg'));

    tw.addEventListener('mouseover', () => tw.setAttribute('src', './assets/icon-twitter-hover.svg'));
    tw.addEventListener('mouseout', () => tw.setAttribute('src', './assets/icon-twitter.svg'));

    ig.addEventListener('mouseover', () => ig.setAttribute('src', './assets/icon_instagram-hover.svg'));
    ig.addEventListener('mouseout', () => ig.setAttribute('src', './assets/icon_instagram.svg'));
}

/* hover images */

createGifs.addEventListener('click', () => createGifs.setAttribute('src', './assets/CTA-crear-gifo-active.svg'));