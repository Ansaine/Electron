import { ipcRenderer } from "electron";

const errorBtn = document.getElementById("errorBtn");

errBtn.addEventListener('click',()=>{
  const txt = document.getElementById("textInput").innerHTML;
  window.electronAPI.setTitle(title)

})