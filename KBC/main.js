console.log("Started main.js");

import electron from 'electron';
import { ipcMain as ipc, dialog } from 'electron';
import path from 'path'
import fs from 'fs'
import url,{fileURLToPath} from 'url'
import { desktopCapturer } from 'electron';

//flags
const isMac = process.platform==='darwin'


const app = electron.app;                           // for events
const BrowserWindow = electron.BrowserWindow;       // for UI


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;
function createWindow(){
    win = new BrowserWindow({
        width: 1000,
        height: 700,
        title: 'Home Window',
        webPreferences: {
            sandbox: false,         // to allow screenshot
            nodeIntegration: true,  // Allow access to Node.js APIs like ipcRenderer elase gives import error
            contextIsolation: false,  // Disable context isolation 
        }
      });

    win.loadURL(url.format({
        pathname : path.join(__dirname,'mainWindow/index.html'),
        protocol: 'file',
        slashes: true
    }))

    // win.webContents.openDevTools();
    win.on('closed',()=>{
        win = null;
    })
}



// once it gets play signal from renderer
let gameWin;
ipc.on('start-game', ()=>{
    gameWin = new BrowserWindow({
        width: 750,
        height: 500,
        parent: win,
        modal: true,
        title: 'Game Window',
        webPreferences: {
            sandbox: false,         // to allow screenshot
            nodeIntegration: true,  // Allow access to Node.js APIs like ipcRenderer elase gives import error
            contextIsolation: false,  // Disable context isolation 
          }
    });

    gameWin.loadURL(url.format({
        pathname : path.join(__dirname,'playWindow/game.html'),
        protocol: 'file',
        slashes: true
    }))

    // gameWin.webContents.openDevTools();
})

// score update
ipc.on('increment-score', ()=>{
    win.webContents.send('increment-score')
})

// screenshot capture
let image;
ipc.on('capture',()=>{
    // returns array of windows/screen objects, from there we choose the first image
    desktopCapturer.getSources({types:['screen'],thumbnailSize: { width: 1280, height: 720 }}).then(sources=>{

        console.log(sources);
        // const targetSource = sources.find(source => source.name === 'Play');     // finding by title name
        // if (!targetSource)  console.error('Window named "Play" not found');

        image = sources[0].thumbnail.toDataURL();
        win.webContents.send('capture',image)
    })
})

//screenshot save 
ipc.on('save-image',async ()=>{
    try{
        // Ask the user for a file save location
        const result = await dialog.showSaveDialog({
            title: 'Save Screenshot',
            defaultPath: 'screenshot.png',
            filters: [
                { name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }
            ]
        });

        if (result.canceled) {
            console.log('Save operation canceled.');
            return;
        }

        const savePath = result.filePath;
        const base64Data = image.replace(/^data:image\/png;base64,/, ''); // Strip metadata prefix

        // Save the file
        await fs.promises.writeFile(savePath, base64Data, 'base64');

    }catch(err){
        console.error('Error while sacing image :', err);
    }
})

//game close 
ipc.on('close-game',()=>{
    gameWin.close();
})

// app Events

app.on('ready',createWindow);
app.on('window-all-closed',()=>{
    if(!isMac)  app.quit();
})