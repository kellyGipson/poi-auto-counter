'use strict';

import { randomUUID } from 'crypto';
import { app, BrowserWindow, ipcMain } from 'electron';
import url from 'url';
import path from 'path';
import packageJson from './package.json';
import { IpcChannels } from './src/electron/core/ipc-channels';
import { handleScreenshotChannels } from './src/electron/core/screenshots';
import { Logger } from './src/electron/logging/logger';
import { processArgv } from './src/electron/core/process-argv';
import { AppData } from './src/electron/app-data/app-data';
import { Trigger } from './src/app/hunts/counters/triggers/trigger';

const appDataFolder = new AppData();

const args = processArgv(process.argv);

let mainWindow: BrowserWindow;

const createWindow = () => {
  const isDev = args?.APP_DEV == 'true';
  const DEV_TOOLS_DEFAULT_WIDTH = 446;

  mainWindow = new BrowserWindow({
		width: 900 + (isDev ? DEV_TOOLS_DEFAULT_WIDTH : 0),
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'electron', 'core', 'preload.js'),
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.setMenu(null);
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/${packageJson.name}/browser/index.html`),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null as any;
  });

	mainWindow.webContents.on('did-start-loading', () => {
	});
}

app.whenReady().then(() => {
	ipcMain.handle(IpcChannels.getVersion, () => app.getVersion());
	ipcMain.handle(IpcChannels.getPollObject, () => ({
		logs: Logger?.logs || [],
		hunts: (appDataFolder?.huntsFolder?.hunts || []).map((appDataFile) => appDataFile?.contents || []),
	}));
	ipcMain.handle(IpcChannels.removeAllLogs, () => {
		Logger.removeAllLogs();
	});
	ipcMain.handle(IpcChannels.removeLog, (_, logId) => Logger.removeLog(logId));
	ipcMain.handle(IpcChannels.openHuntsFolder, () => {
		appDataFolder.huntsFolder.open();
	});
	ipcMain.handle(IpcChannels.reloadHuntsFolder, () => {
		appDataFolder.checkFolders();
	});
	ipcMain.handle(IpcChannels.addHunt, (_, hunt) => {
		appDataFolder.huntsFolder.addHunt(hunt);
		return hunt;
	});
	ipcMain.handle(IpcChannels.editHunt, (_, hunt) => {
		appDataFolder.huntsFolder.editHunt(hunt);
		return hunt;
	});
	ipcMain.handle(IpcChannels.deleteHunt, (_, huntId) => {
		appDataFolder.huntsFolder.deleteHunt(huntId);
		return huntId;
	});
	ipcMain.handle(IpcChannels.addTrigger, (_, huntId: string, counterId: string, trigger: Trigger) => {
		const errorDetails = 'huntId: ' + huntId + ', counterId: ' + counterId + ', trigger: ' + trigger.toString();
		if (!huntId) {
			Logger.error('addTrigger::no hunt id', errorDetails);
		}

		const hunt = appDataFolder.huntsFolder.hunts.find(h => h.contents?.id === huntId);
		if (!hunt) {
			Logger.error('addTrigger::hunt not found', errorDetails);
		}

		const counter = hunt?.contents?.counters.find(c => c.id === counterId); 
		if (!counter) {
			Logger.error('addTrigger::counter not found', errorDetails);
		}

		trigger.id = randomUUID();
		counter?.triggers.push(trigger);

		return trigger;
	});

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
