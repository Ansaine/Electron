// index.js (ES module)
const errBtn = document.getElementById('errorBtn');
errBtn.addEventListener('click', () => {
    console.log(window.Electron);
    window.Electron.send('open-error-dialog');
});
