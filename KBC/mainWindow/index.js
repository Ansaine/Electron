// index.js (renderer process)
const { ipcRenderer } = require('electron');  // Use require instead of import

const playBtn = document.getElementById('playBtn');
const captureBtn = document.getElementById('captureBtn');
const beforeStartForm = document.getElementById("beforeStartForm");
const afterStartForm = document.getElementById("afterStartForm");

playBtn.addEventListener('click', (event) => {
  event.preventDefault();           // flickering issue
  ipcRenderer.send('start-game');   // send play signal

  beforeStartForm.style.display='none';
  afterStartForm.style.display='block';

});

// send signal to capture image 
captureBtn.addEventListener('click',(event)=>{
  event.preventDefault();
  ipcRenderer.send('capture');
})

// receive image 
ipcRenderer.on('capture',(event,imageData)=>{
  document.getElementById('image').src=imageData
})

