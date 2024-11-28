// index.js (renderer process)
const { ipcRenderer } = require('electron');  // Use require instead of import

const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => {
  ipcRenderer.send('start-game');  // send play signal
});
