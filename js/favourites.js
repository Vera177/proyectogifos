import { superSizeRender, downloadFunction } from "./modules/renderView.js";

// Función cargar LocalStorage desde la array vacía. addEventListener sobre el botón me gusta. Eso lo agrega a una array vacía, que se va a pushear y de ahí cargar al LocalStorage
//Otra función para renderizar.
let apiKey = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';
let favouriteGifsOriginal = [];
let favouriteGifs = [];
let gifFavourites = document.getElementById('gifFavourites');
let noFavGifs = document.getElementById('noFavGifs');
let showMore = document.getElementById('showMore');

export async function getImagess() {

    favouriteGifsOriginal = JSON.parse(localStorage.getItem('favourites'));
    favouriteGifs = new Set (favouriteGifsOriginal);
    console.log("original", favouriteGifsOriginal, "sin repes", favouriteGifs);
    if (!favouriteGifs) {
        noFavAdded();
    } else {
        //forma1

        // for (let i = 0; i < JSON.parse(localStorage.getItem('favourites')).length; i++) {
        //     favouriteGifs.push(JSON.parse(localStorage.getItem('favourites'))[i]);
        // }
        // for (let i = 0; i < JSON.parse(localStorage.getItem('favouriteFromSearch')).length; i++) {
        //     favouriteGifs.push(JSON.parse(localStorage.getItem('favouriteFromSearch'))[i]);
        // }

        //forma 1a (original)

        // favouriteGifs = JSON.parse(localStorage.getItem('favourites')) || JSON.parse(localStorage.getItem('favouriteFromSearch'));
        // favouriteGifs += JSON.parse(localStorage.getItem('favouriteFromSearch'));

        //forma2

        // favouriteGifs = JSON.parse(localStorage.getItem('favourites')).concat(JSON.parse(localStorage.getItem('favouriteFromSearch')))

        // concat = función avanzada de js para concatenar arreglos.

        gifFavourites.innerHTML = '';

        let response = await fetch(`https://api.giphy.com/v1/gifs?ids=${favouriteGifs}&api_key=${apiKey}`);
        let infoMyGif = await response.json();
        renderViewFav(infoMyGif);
    }
}

getImagess();

function noFavAdded() {
    noFavGifs.style.display = 'flex';
    showMore.style.display = 'none';
}

function renderViewFav(infoMyGif) {
    let gifFavourites = document.getElementById('gifFavourites');
    let cardGifo;
    for (let i = 0; i < favouriteGifs.length; i++) {
        cardGifo = document.createElement('li');
        cardGifo.className = 'cardGifo';
        cardGifo.innerHTML = `<img src="${infoMyGif.data[i].images.original.url}" alt="imagen gif">
            <div class="overlayFavourite">
                <div class="buttonsCardFavourite">
                <button class="trash" id="trash_${[i]}"><img src="./assets/icon-trash-normal.svg" alt="borrar elemento"></button>
                <button class="download" id="download__${[i]}"><img src="./assets/icon-download.svg" alt="descargar"></button>
                <button class="superSize" id="superSize__${[i]}"><img src="./assets/icon-max-normal.svg" alt="maximizar gif"></button>
                </div>
                <div class="infoTextGifs">
                    <p>${infoMyGif.data[i].username}</p>
                    <p>${infoMyGif.data[i].title}</p>
                </div>
            </div>`;
        gifFavourites.appendChild(cardGifo);
        let superSizebtn = document.getElementById(`superSize__${[i]}`);

        //Delete function

        let trash = document.getElementById(`trash_${[i]}`);
        trash.addEventListener('click', () => {
            favouriteGifs.splice(i, 1);
            localStorage.setItem('favourites', JSON.stringify(favouriteGifs));
            getImagess();
            // localStorage.removeItem('favourites', JSON.stringify(favouriteGifs[i]));
        });

        //Download function
        let downloadbtn = document.getElementById(`download__${[i]}`);
        downloadFunction(i, downloadbtn,infoMyGif);

        //Super size images

        superSizeRender(i, infoMyGif, superSizebtn);
    }

    showMore.style.display = 'block';
}

let arr = [1,2,3,3,4,5,5,5,5,5];

let unicos = new Set(arr);

console.log("Unicos: ", [...unicos]);

let repes = ["hola", "hola", "Manuela", "eugenia"];
let unicoss = new Set(repes);
console.log(unicoss);