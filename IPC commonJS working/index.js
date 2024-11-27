// index.js (renderer process)
const { ipcRenderer } = require('electron');  // Use require instead of import

const errBtn = document.getElementById('errorBtn');
errBtn.addEventListener('click', () => {
  ipcRenderer.send('open-error-dialog');  // Send IPC message
});
