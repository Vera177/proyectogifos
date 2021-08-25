import {favouriteBottonAndSetStoragee, downloadFunction, superSizeRender} from "./modules/renderView.js";

/* Search section */

let api_key = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';
let searchInput = document.getElementById('searchInput');
let searchIcon = document.getElementById('searchIcon');
let searchFailed = document.getElementById('searchFailed');
let search;
let suggestions = [];

//suggestions search

searchInput.addEventListener('keyup', () => {
    search = searchInput.value;
    getSearchSuggestions(search);
});

async function getSearchSuggestions(input) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${input}&offset=0&rating=g&lang=en&limit=4`);
    suggestions = await response.json();
    filterSuggestions(suggestions, input);
}

function filterSuggestions(suggestions, input) {
    let results = [];
    if (input.length) {
        for (let i = 0; i < 4; i++) {
            results.push(suggestions.data[i].title);
        }
        results.filter((item) => {
            return item.toLowerCase().includes(input.toLowerCase());
        });
    }
    renderResults(suggestions, results, input);
}

function renderResults(suggestions, results, input) {

    let thinLineSuggestion = document.getElementById('thinLineSuggestion');

    let content = results.map((item) => {
        return `<li class="suggestionWord"><img class="searchSuggestionsMagnifyLens" src='./assets/icon-search-gray.svg'>${item}</li>`;
    }).join('');
    //how map method and return works. Look for that.
    resultsWrapper.innerHTML = `<ul id="resultUl">${content}</ul>`;

    if (input.length) {
        searchIcon.setAttribute('src', './assets/icon-search-gray.svg');
        thinLineSuggestion.className = 'lineGray';
    } else {
        searchIcon.setAttribute('src', './assets/icon-search.svg');
        thinLineSuggestion.className = '';
    }

    let suggestionWordli = document.querySelectorAll('.suggestionWord');

    for (let i = 0; i < document.querySelectorAll('.suggestionWord').length; i++) {
        document.querySelectorAll('.suggestionWord')[i].addEventListener('click', () => {
            let contentSearch = suggestionWordli[i].textContent;
            searchInput.value = contentSearch;
            search = searchInput.value;
            trending.className = 'none';
            showMore.className = 'showMore';
            titleSearch.className = 'titleSearchedGifs';
            thinLine.className = 'thinLine';
            searchIcon.setAttribute('src', './assets/close.svg')
            inputSearch(search);
        });
    }
}

// event listener click

searchIcon.addEventListener('click', () => {
    search = searchInput.value;
    trending.className = 'none';
    showMore.className = 'showMore';
    titleSearch.className = 'titleSearchedGifs';
    thinLine.className = 'thinLine';
    searchIcon.setAttribute('src', './assets/close.svg');
    inputSearch(search);
});

async function inputSearch(search) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&offset=0&rating=g&lang=en`);
    let info = await response.json();
    if (!info.data[1]){
        noSearch();
    }
    else{
        renderViewCardsSearch(info);
    }
}

/* Renderization */

let gifCardsFounded = document.getElementById('gifCardsFounded');
let resultContainer = document.getElementById('resultContainer');
let titleSearch = document.getElementById('titleSearch');
let cardGifoFounded;
let ulContainer;
let thinLine = document.getElementById('thinLine');
let showMore = document.getElementById('showMore');
let initialPosition = 0;

function noSearch(){
    searchFailed.style.display = 'flex';
    showMore.style.display = 'none';
}

async function renderViewCardsSearch(infoAPI) {
    let i;
    let finalPosition = initialPosition + 12;

    if (initialPosition > finalPosition) {
        finalPosition = infoAPI.length;
    }

    titleSearch.innerHTML = search;

    for (i = initialPosition; i < finalPosition; i++) {
        console.log(initialPosition);
        cardGifoFounded = document.createElement('li');
        cardGifoFounded.className = 'cardGifoSearch';
        cardGifoFounded.innerHTML = `<img src="${infoAPI.data[i].images.original.url}" alt="imagen gif">
        <div class="overlayGifsSearch">
            <div class="buttonsCardSearch">
            <button class="favourite" id="favourite_${[i]}"><img src="./assets/icon-fav.svg" alt="guardar favorito"></button>
            <button class="download" id="download_${[i]}"><img src="./assets/icon-download.svg" alt="descargar"></button>
            <button class="superSize" id="superSize_${[i]}"><img src="./assets/icon-max-normal.svg" alt="maximizar gif"></button>
            </div>
            <div class="infoTextGifs">
                <p>${infoAPI.data[i].username}</p>
                <p>${infoAPI.data[i].title}</p>
            </div>
        </div>`;
        gifCardsFounded.appendChild(cardGifoFounded);
        let superSizebtn = document.getElementById(`superSize_${[i]}`);
        let downloadbtn = document.getElementById(`download_${[i]}`);
        favouriteBottonAndSetStoragee(i, infoAPI);
        downloadFunction(i, downloadbtn,infoAPI);
        superSizeRender(i, infoAPI, superSizebtn);
    }

    showMore.addEventListener('click', () => {
        initialPosition = finalPosition;
        renderViewCardsSearch(infoAPI);
    });

    searchFailed.style.display = 'none';
    showMore.style.display = 'block';
}

/* Trending searchs words */

// let trending = document.getElementById('trending');
let trendingSearchs = document.getElementById('trendingSearchs');
let trendingSearchsSuggestions = [];

async function getTrendingSearchs() {
    let response = await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${api_key}&limit=25&rating=g`)
    let info = await response.json();
    trendingSearchs.innerHTML = `<a class="trendingSearch">${info.data[0]}</a>,<a class="trendingSearch">${info.data[1]}</a>,<a class="trendingSearch">${info.data[2]}</a>,<a class="trendingSearch">${info.data[3]}</a>,<a class="trendingSearch">${info.data[4]}</a>`;
    trendingSearchs.addEventListener('click', (e) => {
        trending.className = 'none';
        showMore.className = 'showMore';
        titleSearch.className = 'titleSearchedGifs';
        thinLine.className = 'thinLine';
        searchIcon.setAttribute('src', './assets/close.svg');
        search = e.target.innerHTML;
        inputSearch(search);
    })
}

getTrendingSearchs();
