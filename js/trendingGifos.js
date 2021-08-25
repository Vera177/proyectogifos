import {renderView, downloadFunction, superSizeRender} from "./modules/renderView.js"; 

/* Trending gifOS */

let info;
let api_key = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';

async function getImages() {
    let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=25&rating=g`);
    info = await response.json();
    renderView(info);
}

getImages();

/* scroll left/right carrousel's images  */

let buttonSliderLeft = document.getElementById('buttonSliderLeft');
let buttonSliderRight = document.getElementById('buttonSliderRight');

buttonSliderLeft.addEventListener('click', () => gifSources.scrollLeft -= gifSources.offsetWidth);
buttonSliderRight.addEventListener('click', () => {
    gifSources.scrollLeft += gifSources.offsetWidth
    if (gifSources.scrollLeft === 4518) {
        gifSources.scrollLeft = 0;
    }
});



