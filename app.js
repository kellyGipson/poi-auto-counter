'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const url = require("url");
const path = require("path");
const packageJson = require("./package.json");
const { IpcChannels } = require('./ipc-channels');
const { handleScreenshotChannels } = require('./screenshots');

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
  const isDev = (args?.APP_DEV || '') == "true";
  const DEV_TOOLS_DEFAULT_WIDTH = 446;

  mainWindow = new BrowserWindow({
    width: 800 + (isDev ? DEV_TOOLS_DEFAULT_WIDTH : 0),
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.width = mainWindow.width + DEV_TOOLS_DEFAULT_WIDTH;
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

app.whenReady().then(() => {
	ipcMain.handle(IpcChannels.getVersion, () => app.getVersion());
	handleScreenshotChannels();

	createWindow();
});

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
