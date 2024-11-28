console.log("Started my app");

import electron from 'electron';
import { ipcMain } from 'electron';
import { dialog } from 'electron';
import path from 'path'
import url,{fileURLToPath} from 'url'


// we need two submodules
const app = electron.app;                           // for events
const BrowserWindow = electron.BrowserWindow;       // for UI


// Manually define __dirname in ES Modules as it is normally for commonJS 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;
function createWindow(){
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,    // Allow access to Node.js APIs like ipcRenderer else gives import error
          contextIsolation: false,  
        }
      });

    win.loadURL(url.format({
        pathname : path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }))

    //dev tool
    win.webContents.openDevTools();

    // direct sending data to renderer 
    win.webContents.send('myChannel', 'Here is some data from Main!');


    // event that will be emmited when closed is clicked
    win.on('closed',()=>{
        win = null;
    })

}

ipcMain.on('akatsuki-channel', (event, message) => {
    console.log("Received message:", message);
    dialog.showMessageBox({message:message})
  });

// we call the app only when the application is ready
app.on('ready',createWindow);


// For macOS
app.on('window-all-closed',()=>{
    if(process.platform!='darwin'){
        app.quit();
    }
})