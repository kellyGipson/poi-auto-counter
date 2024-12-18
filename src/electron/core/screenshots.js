const { ipcMain } = require('electron');
const { IpcChannels } = require('./ipc-channels');
const screenshot = require('screenshot-desktop');

const handleScreenshotChannels = () => {
	ipcMain.handle(IpcChannels.listDisplays, () => screenshot.listDisplays());
	ipcMain.handle(IpcChannels.screenshot, (e, ...args) => screenshot(args[0]));
};

module.exports = { handleScreenshotChannels };
