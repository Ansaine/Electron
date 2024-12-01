const { ipcRenderer } = require('electron');  

const playBtn = document.getElementById('playBtn');
const captureBtn = document.getElementById('captureBtn');
const beforeStartForm = document.getElementById("beforeStartForm");
const afterStartForm = document.getElementById("afterStartForm");
const scoreValue = document.getElementById("scoreValue");

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

//save image to file
saveBtn.addEventListener('click',(event)=>{
  event.preventDefault();
  ipcRenderer.send('save-image');
})

// receive image and only after that save button appears
ipcRenderer.on('capture',(event,imageData)=>{
  document.getElementById('image').src=imageData
  document.getElementById('saveBtn').style.display='block'
})

//score update
ipcRenderer.on('increment-score',(event,data)=>{
  scoreValue.innerHTML= Number(scoreValue.innerHTML)+1;
})

