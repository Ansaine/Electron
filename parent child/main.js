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

let parent, child1,child2;

function createWindow(){

    parent = new BrowserWindow();
    child1 = new BrowserWindow({parent:parent,modal:true});
    child2 = new BrowserWindow({parent:parent});

    //parent
    parent.loadURL(url.format({
        pathname : path.join(__dirname,'parent.html'),
        protocol: 'file',
        slashes: true
    }))

    //child
    child1.loadURL(url.format({
        pathname : path.join(__dirname,'child1.html'),
        protocol: 'file',
        slashes: true
    }))

    //child
    child2.loadURL(url.format({
        pathname : path.join(__dirname,'child2.html'),
        protocol: 'file',
        slashes: true
    }))

    //dev tools
    parent.webContents.openDevTools();
    child1.webContents.openDevTools();
    child2.webContents.openDevTools();


    // event what will be emmited when closed is clicked
    // if parent is closed, the child dies
    parent.on('closed',()=>{
        parent = null;
        child1 = null;
        child2 = null;
    })

    child1.on('closed', () => {
        child1 = null;
    });

    child2.on('closed', () => {
        child2 = null;
    });
}

// we call the app only when the application is ready
app.on('ready',createWindow);