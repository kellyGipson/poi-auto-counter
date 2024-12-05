const { contextBridge, ipcRenderer } = require('electron');
const { IpcChannels } = require('./ipc-channels');

const ipcExposedProps = {};

for (const [key, value] of Object.entries(IpcChannels)) {
	ipcExposedProps[key] = (...args) => ipcRenderer.invoke(value, ...args);
}

contextBridge.exposeInMainWorld('electronAPI', ipcExposedProps);
