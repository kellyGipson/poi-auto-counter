import { ipcMain } from 'electron';
import screenshot from 'screenshot-desktop';
import { IpcChannels } from '../../app/infrastructure/electron/ipc-channels';

export const handleScreenshotChannels = () => {
	ipcMain.handle(IpcChannels.listDisplays, () => screenshot.listDisplays());
	ipcMain.handle(IpcChannels.screenshot, (e, ...args) => screenshot(args[0]));
};
