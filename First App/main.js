console.log("Started my app");

import electron from 'electron';
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
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname : path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }))

    //dev tool
    win.webContents.openDevTools();

    // event what will be emmited when closed is clicked
    win.on('closed',()=>{
        win = null;
    })
}

// we call the app only when the application is ready
app.on('ready',createWindow);