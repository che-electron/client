const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
<<<<<<< HEAD

  mainWindow = new BrowserWindow({width: 900, height: 680, 'web-preferences':{ 'web-security': true }, 'node-integration': 'iframe'});
  mainWindow.loadURL(isDev ? 'http://localhost:8000' : `file://${path.join(__dirname, '../build/index.html')}`);
=======
  mainWindow = new BrowserWindow({width: 900, height: 680, 'web-preferences':{ 'web-security': false }, 'node-integration': 'iframe'});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
>>>>>>> 61c823d6acca26312211e24b6682d93711e0c126
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});