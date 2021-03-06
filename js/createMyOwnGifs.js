import { downloadFile } from "./modules/renderView.js";

/* Create gifs */

//start/recording variables
let apiKey = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';
let recorder, stream;
let form = new FormData();
let myGifs = [];
let info;
let response;
let btnStart = document.getElementById('btnStart');
let video = document.getElementById('videoElement');
let imageRecording = document.getElementById('resultRecording');
let titleCreateGifo = document.getElementById('titleCreateGifo');
let subtitleCreateGifo = document.getElementById('subtitleCreateGifo');
//butons 1,2 and 3
let step1 = document.getElementById('step1');
let step2 = document.getElementById('step2');
let step3 = document.getElementById('step3');
//overlay loading
let overlay = document.getElementById('overlay');
let loading = document.getElementById('loading');
let overlayLoadingText = document.getElementById('overlayLoadingText');
//chronometer variables
let h = 0, m = 0, s = 0, timeStarted = 0;
let time = document.getElementById("time");
let repeat = document.getElementById('repeat');
let chronometer = document.getElementById('chronometer');

/* check LocalStorage */

function loadStorage() {
  if (localStorage.getItem('mygifs')) {
    myGifs = JSON.parse(localStorage.getItem('mygifs'));
  }
}
loadStorage();

/*streaming*/

btnStart.addEventListener('click', cameraAcces);

//paso 1

function cameraAcces() {
  titleCreateGifo.innerHTML = '¿Nos das acceso <br> a tu cámara?';
  subtitleCreateGifo.innerHTML = 'El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.';
  step1.classList.add('stepActive');
  getStreamAndRecord();
}

//paso 2

function getStreamAndRecord() {
  repeat.style.display = 'none';
  time.style.display = 'block';
  imageRecording.classList.remove('showSomething');

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        step1.classList.remove('stepActive');
        step2.classList.add('stepActive');
        titleCreateGifo.innerHTML = '';
        subtitleCreateGifo.innerHTML = '';
        video.classList.add('showVideo');
        video.srcObject = stream;
        video.play();
        btnStart.innerHTML = 'GRABAR';
        btnStart.removeEventListener('click', cameraAcces);
        btnStart.addEventListener('click', startRecording);

        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function () {
            console.log('First recording succesfully started');
            chronometer.style.display = 'block';
            start();
            btnStart.innerHTML = 'FINALIZAR';
          },
          onGifPreview: function (gifURL) {
            imageRecording.src = gifURL;
          }
        });
      })
      .catch(function (err) {
        console.log("Something went wrong!");
      });
  }
}

// repeat function

function repeatGetStreamAndRecord() {
  console.log('Repeat recording step');
  recorder.clearRecordedData();
  btnStart.removeEventListener('click', uploadgGif);
  btnStart.innerHTML = 'GRABAR';
  repeat.style.display = 'none';
  imageRecording.classList.remove('showSomething');

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        step1.classList.remove('stepActive');
        step2.classList.add('stepActive');
        titleCreateGifo.innerHTML = '';
        subtitleCreateGifo.innerHTML = '';
        video.classList.add('showVideo');
        video.srcObject = stream;
        video.play();
        time.style.display = 'block';

        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function () {
            console.log('started');
            chronometer.style.display = 'block';
            start();
            btnStart.innerHTML = 'FINALIZAR';
          },
          onGifPreview: function (gifURL) {
            imageRecording.src = gifURL;
          }
        });
      })
      .catch(function (err) {
        console.log("Something went wrong!");
      });
  }
  btnStart.addEventListener('click', startRecording);
}

//step 3 > recording

function startRecording() {
  recorder.startRecording();
  recorder.camera = stream;
  btnStart.removeEventListener('click', startRecording);
  btnStart.addEventListener('click', stopRecordingCallback);
}

//step 4 > stop recording

function stopRecordingCallback() {
  video.classList.remove('showVideo');
  imageRecording.classList.add('showSomething');
  recorder.stopRecording(() => {
    imageRecording.src = URL.createObjectURL(recorder.getBlob());
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'));
    btnStart.innerHTML = 'SUBIR GIFO';
    console.log(recorder);

    // recorder.camera.stop();
    // recorder.destroy();
    // recorder = null;
  });
  reset();
  btnStart.removeEventListener('click', stopRecordingCallback);
  btnStart.addEventListener('click', uploadgGif);
}

//Step 5 > upload gif

function uploadgGif() {
  step2.classList.remove('stepActive');
  step3.classList.add('stepActive');
  overlay.style.display = 'flex';

  let send = fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}&file=${form}`, { method: 'POST', body: form });

  send.then(
    (sucess) => {
      return sucess.json();
    }
  ).then(
    (response) => {
      // console.log(response)
      // console.log(response.data.id);
      info = response.data.id;
      myGifs.push(info);
      localStorage.setItem('mygifs', JSON.stringify(myGifs));
      imageUploadingGif();
    }
  )
}

async function imageUploadingGif() {
 
  loading.setAttribute('src', './assets/ok.svg');
  overlayLoadingText.innerHTML = 'GIFO subido con éxito';
  console.log('Gif uploaded succesfully!');

  let request = await fetch(`https://api.giphy.com/v1/gifs/${info}?api_key=${apiKey}`);
  response = await request.json();
  let urlGif = response.data.images.original.url;

  console.log(response);

  let buttonsUpload = document.createElement('div');
  buttonsUpload.className = "buttonsUpload";
  buttonsUpload.innerHTML = `<button id="download" class="download"><img src="./assets/icon-download.svg" alt="descargar"></button>
  <button id="link" class="link"><a href="${urlGif}" target="_blank"><img src="./assets/icon-link-normal.svg" alt="enlace a imagen"></a></button>`;
  overlay.appendChild(buttonsUpload);

  let downloadbtn = document.getElementById('download');
  downloadbtn.addEventListener('click', () => downloadFunction(response, urlGif));
}

/* download function */

async function downloadFunction(response, urlGif) {

  downloadFile(urlGif, `${response.data.title}`);

    // .then((response) => {
    // console.log(response);
    // console.log(getImage);
    // .then((response) => {
    //   let urlGifo = response.json();
    //   console.log(response, urlGifo);
    // });
  // console.log(idGifo);

  // downloadbtn.addEventListener('click', () => {
  //   let res = fetch(`https://api.giphy.com/v1/gifs/${info}?api_key=${apiKey}`)
  //   // .then((response) => {
  //   // console.log(response);
  //   // console.log(getImage);
  //   .then((response) => {
  //     let urlGifo = response.json();
  //     console.log(response, urlGifo);
  //   });
  //   let idGifo = urlGifo;
  //   console.log(idGifo);
  //   idGifo = info.data.images.original.url;
  //   console.log('urlGifo', idGifo);
  //   downloadFile(idGifo, `${info.data.title}`);
  //   // })
  //   // .catch((error) => {
  //   //   console.error(error);
  //   // });
  // });
}

/* Chronometer */

function write() {
  let ht, mt, st;
  s++;

  if (s > 59) {
    m++;
    s = 0;
  }
  if (m > 59) {
    h++;
    m = 0;
  }
  if (h > 24) h = 0;

  st = ('0' + s).slice(-2);
  mt = ('0' + m).slice(-2);
  ht = ('0' + h).slice(-2);

  time.innerHTML = `${ht}:${mt}:${st}`;
}

function start() {
  write();
  timeStarted = setInterval(write, 1000);
  time.removeEventListener("click", startRecording);
}

function reset() {
  clearInterval(timeStarted);
  time.innerHTML = "00:00:00"
  h = 0;
  m = 0;
  s = 0;
  imageRecording.classList.add('showSomething');
  time.style.display = 'none';
  repeat.style.display = 'block';
  repeat.addEventListener("click", repeatGetStreamAndRecord);
}