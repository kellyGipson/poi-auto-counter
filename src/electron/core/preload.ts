import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannels } from '../../app/infrastructure/electron/ipc-channels';

const ipcExposedProps: any = {};

for (const [key, value] of Object.entries(IpcChannels)) {
	ipcExposedProps[key] = (...args: string[]) => ipcRenderer.invoke(value, ...args);
}

contextBridge.exposeInMainWorld('electronAPI', ipcExposedProps);
