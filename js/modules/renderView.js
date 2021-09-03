let favouriteGifs = [];

export function renderView(info) {
    let gifSources = document.getElementById('gifSources');
    let cardGifo;
    for (let i = 0; i < 15; i++) {
        cardGifo = document.createElement('li');
        cardGifo.className = 'cardGifo';
        cardGifo.innerHTML = `<img id="imageId${[i]}" class="imagesTrendingGifos" src="${info.data[i].images.original.url}" alt="imagen gif">
        <div class="overlay">
            <div class="buttonsCard">
            <button id="favourite_${[i]}" class="favourite"><img src="./assets/icon-fav.svg" alt="guardar favorito"></button>
            <button id="download_${[i]}" class="download"><img src="./assets/icon-download.svg" alt="descargar"></button>
            <button id="superSize_${[i]}" class="superSize"><img src="./assets/icon-max-normal.svg" alt="maximizar gif"></button>
            </div>
            <div class="infoTextGifs">
                <p>${info.data[i].username}</p>
                <p>${info.data[i].title}</p>
            </div>
        </div>`;
        gifSources.appendChild(cardGifo);
        let superSizebtn = document.getElementById(`superSize_${[i]}`);
        let downloadbtn = document.getElementById(`download_${[i]}`);

        favouriteBottonAndSetStoragee(i, info);
        downloadFunction(i, downloadbtn,info);
        superSizeRender(i, info, superSizebtn);
    }
}

export function downloadFunction(i, downloadbtn,info) {
    downloadbtn.addEventListener('click', () => {
        let urlGifo = info.data[i].images.original.url;
        console.log('urlGifo', urlGifo);
        downloadFile(urlGifo, `${info.data[i].title}`);
    });
}

/* Download function */

export function downloadFile(url, filename) {
    fetch(url).then(
        (response) => {
            return response.blob().then(
                (response) => {
                    let newElement = document.createElement("a");
                    newElement.href = URL.createObjectURL(response);
                    newElement.setAttribute("download", filename);
                    console.log(newElement);
                    newElement.click();
                }
            )
        }
    )
}

export function superSizeRender(i, info, superSize) {
    let fullSizeOverlay = document.getElementById('fullSizeOverlay');
    let hideContent;
    // console.log(info.data[i].images.original.url);
    superSize.addEventListener('click', () => {
        fullSizeOverlay.style.display = 'flex';
        let gifoMax = document.createElement('div');
        gifoMax.className = 'fullSizeContent';
        gifoMax.innerHTML = `<button id="hideContent_${[i]}" class="hideContent"><img src="./assets/close.svg" alt="cerrar imagen maximizada"></button>
        <div class="imageInfoContainer" id="imageInfoContainer">
            <img class="superSizeImage" id="superSizeImage" src="${info.data[i].images.original.url}" alt="${info.data[i].title}">
            <div class="info">
                <div class="text">
                    <h3>${info.data[i].username}</h3>
                    <h4>${info.data[i].title}</h4>
                </div>
                <div class="buttons">
                    <button id="favourite___${[i]}" class="heart"><img src="./assets/icon-fav.svg" alt=""></button>
                    <button id="download___${[i]}" class="download"><img src="./assets/icon-download.svg" alt=""></button>
                </div>
            </div>
        </div>`
        fullSizeOverlay.appendChild(gifoMax);
        hideContent = document.getElementById(`hideContent_${[i]}`);
        let downloadbtn = document.getElementById(`download___${[i]}`);
        let favouritebutton = document.getElementById(`favourite___${[i]}`);
        renderizeActive(hideContent, superSize);
        favouriteBottonAndSetStoragee(i, info, favouritebutton);
        downloadFunction(i, downloadbtn, info, );
    });
}

/* Pop Up Full Size Image function */

let overlay = document.getElementById('fullSizeOverlay');

export function renderizeActive(hideContent, superSize) {
    superSize.addEventListener('click', () => {
        overlay.classList.add('active');
    });

    hideContent.addEventListener('click', () => {
        overlay.classList.remove('active');
        fullSizeOverlay.innerHTML = '';
        fullSizeOverlay.style.display = 'none';
    });
}

/*Load favourite gifs*/

export function loaddStorage() {
    if (localStorage.getItem('favourites')) {
        favouriteGifs = JSON.parse(localStorage.getItem('favourites'));
    }
}

loaddStorage();

/* Favourite function */

export function favouriteBottonAndSetStoragee(i, info, favouriteMax) {
    let favouriteBottons = document.getElementById(`favourite_${[i]}`);
    if(favouriteMax){
        favouriteMax.addEventListener('click', function favMax () {
            console.log(`You clicked on button ${i}`);
            favouriteMax.innerHTML = '<img src="./assets/icon-fav-active.svg" alt="guardar favorito">';
            favouriteGifs.push(info.data[i].id);
            localStorage.setItem('favourites', JSON.stringify(favouriteGifs));
            favouriteMax.removeEventListener('click', favMax);
        });
    }else{
        favouriteBottons.addEventListener('click', function favNormal () {
            console.log(`You clicked on button ${i}`);
            favouriteBottons.innerHTML = '<img src="./assets/icon-fav-active.svg" alt="guardar favorito">';
            favouriteGifs.push(info.data[i].id);
            localStorage.setItem('favourites', JSON.stringify(favouriteGifs));
            favouriteBottons.removeEventListener('click', favNormal);
        });
    }
    // hoverSection(favouriteBottons);
};

export function hoverSection(favouriteBottons) {
    //hover fav button
    favouriteBottons.addEventListener('mouseover', () => favouriteBottons.innerHTML = '<img src="./assets/icon-fav-hover.svg" alt="guardar favorito">');
    favouriteBottons.addEventListener('mouseout', () => favouriteBottons.innerHTML = '<img src="./assets/icon-fav.svg" alt="guardar favorito">');
};