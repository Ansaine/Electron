const { ipcRenderer } = require('electron');  // Use require instead of import


sendBtn.addEventListener('click', () => {
  const message = document.getElementById('textInput').value;
  ipcRenderer.send('akatsuki-channel', message);  
});
