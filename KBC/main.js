console.log("Started main.js");

import electron, { ipcMain } from 'electron';
import { ipcMain as ipc } from 'electron';
import path from 'path'
import url,{fileURLToPath} from 'url'
import { desktopCapturer } from 'electron';

//flags
const isMac = process.platform==='darwin'


// electron submodules
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
        pathname : path.join(__dirname,'mainWindow/index.html'),
        protocol: 'file',
        slashes: true
    }))

    win.webContents.openDevTools();
    win.on('closed',()=>{
        win = null;
    })
}



// once it gets play signal from renderer
ipc.on('start-game', ()=>{
    let gameWin;
    gameWin = new BrowserWindow({
        width: 400,
        height: 300
    });

    gameWin.loadURL(url.format({
        pathname : path.join(__dirname,'playWindow/game.html'),
        protocol: 'file',
        slashes: true
    }))

    gameWin.webContents.openDevTools();
})

//screenshot
ipc.on('capture',()=>{
    // returns array of windows/screen objects, from there we choose the first image
    desktopCapturer.getSources({types:['screen']}).then(sources=>{
        let image = sources[0].thumbnail.toDataURL();
        win.webContents.send('capture',image)
    })
})

// app Events

app.on('ready',createWindow);
app.on('window-all-closed',()=>{
    if(!isMac)  app.quit();
})