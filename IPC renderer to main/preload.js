// preload script is n


import { contextBridge, ipcRenderer } from 'electron'

// exposing setTitle API
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})