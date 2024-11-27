console.log("Started my app");

import { app, BrowserWindow, ipcMain as ipc, dialog } from 'electron';
import path from 'path';
import url, { fileURLToPath } from 'url';

// Manually define __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;
function createWindow() {

    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Link to preload script
            contextIsolation: false,  
            nodeIntegration: true,  
        },
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true,
        })
    );

    // Dev tools
    win.webContents.openDevTools();

    // Event when 'closed' is clicked
    win.on('closed', () => {
        win = null;
    });
}

// IPC Communication
ipc.on('open-error-dialog', () => {
    dialog.showErrorBox("An Error has occurred", "Err description");
});

// App lifecycle events
app.on('ready', createWindow);

// For macOS
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
