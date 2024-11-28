console.log("Started my app");

import electron from 'electron';

// ipc 
import { ipcMain as ipc } from 'electron';
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
          nodeIntegration: true,  // Allow access to Node.js APIs like ipcRenderer elase gives import error
          contextIsolation: false,  // Disable context isolation 
        }
      });

    win.loadURL(url.format({
        pathname : path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }))

    //dev tool
    win.webContents.openDevTools();

    // event that will be emmited when closed is clicked
    win.on('closed',()=>{
        win = null;
    })

}

// once it gets play signal from renderer
ipc.on('start-game', ()=>{
    let gameWin;
    gameWin = new BrowserWindow();

    gameWin.loadURL(url.format({
        pathname : path.join(__dirname,'game.html'),
        protocol: 'file',
        slashes: true
    }))
})

// we call the app only when the application is ready
app.on('ready',createWindow);


// For macOS
app.on('window-all-closed',()=>{
    if(process.platform!='darwin'){
        app.quit();
    }
})