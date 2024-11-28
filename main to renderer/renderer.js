const { ipcRenderer } = require('electron');  // Use require instead of import

ipcRenderer.on('myChannel', (event, data) => {
  console.log(data); 
});