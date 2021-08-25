import { downloadFunction, superSizeRender } from "./modules/renderView.js";

let apiKey = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';
let cardGifoMyOwnGif;
let createdGifs = [];
let gifSourcesMyOwnGif = document.getElementById('gifSourcesMyOwnGif');
let showMore = document.getElementById('showMore');
let noOwnGifs = document.getElementById('noOwnGifs');

async function getImages() {
    createdGifs = JSON.parse(localStorage.getItem('mygifs'));
    if (!createdGifs){
        noMyGifs();
    }else{
    let response = await fetch(`https://api.giphy.com/v1/gifs?ids=${createdGifs}&api_key=${apiKey}`);
    let infoMyGif = await response.json();
    renderViewMyOwnGifs(infoMyGif);
    }
}
getImages();

function noMyGifs () {
    noOwnGifs.style.display = 'flex';
    showMore.style.display = 'none';
}

function renderViewMyOwnGifs(info) {
    for (let i = 0; i < createdGifs.length; i++) {
        cardGifoMyOwnGif = document.createElement('li');
        cardGifoMyOwnGif.className = 'cardGifoMyOwnGif';
        cardGifoMyOwnGif.innerHTML = `<img src="${info.data[i].images.original.url}" alt="imagen gif">
        <div class="overlayMyOwnGif">
            <div class="buttonsCardMyOwnGif">
            <button class="trash" id="trash_${[i]}"><img src="./assets/icon-trash-normal.svg" alt="borrar elemento"></button>
            <button class="download" id="download__${[i]}"><img src="./assets/icon-download.svg" alt="descargar"></button>
            <button class="superSize" id="superSize__${[i]}"><img src="./assets/icon-max-normal.svg" alt="maximizar gif"></button>
            </div>
            <div class="infoTextGifs">
                <p>${info.data[i].username}</p>
                <p>${info.data[i].title}</p>
            </div>
        </div>`;
       
        gifSourcesMyOwnGif.appendChild(cardGifoMyOwnGif);
       
        // Delete function
        let trash = document.getElementById(`trash_${[i]}`);
        trash.addEventListener('click', () => {
            createdGifs.splice(i, 1);
            localStorage.setItem('mygifs', JSON.stringify(createdGifs));
            getImages();
        });

        //download function
        let downloadbtn = document.getElementById(`download__${[i]}`);
        downloadFunction(i, downloadbtn,info);

        //superSize function
        let superSizebtn = document.getElementById(`superSize__${[i]}`);
        superSizeRender(i, info, superSizebtn);
    }

    noOwnGifs.style.display = 'none';
    showMore.style.display = 'block';
}