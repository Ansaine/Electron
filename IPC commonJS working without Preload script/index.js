// index.js (renderer process)
const { ipcRenderer } = require('electron');  // Use require instead of import

const errBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', () => {
  ipcRenderer.send('open-error-dialog');  // Send IPC message
});
