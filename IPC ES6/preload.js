import { contextBridge, ipcRenderer } from 'electron';

// Expose ipcRenderer to the renderer process
window.Electron = {
    send: (channel, ...args) => {
        ipcRenderer.send(channel, ...args);
    },
};
