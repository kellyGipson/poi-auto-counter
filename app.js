'use strict';

const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");
const packageJson = require("./package.json");

// start process argv

const args = process.argv
  .map((arg) => arg.split('='))
  .reduce((result, item) => {
    const [ key, value ] = item;
    result[key] = value;
    return result;
  });

// end process argv

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const isDev = (args?.APP_DEV || '') == "true";
  if (isDev) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.setMenu(null);
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/${packageJson.name}/browser/index.html`),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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
