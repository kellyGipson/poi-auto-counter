const { execSync } = require('child_process');
const { Logger } = require('../logging/logger');

const isFolderOpen = (folderPath) => {
	const powershellCommand = `powershell -Command "Get-Process | Where-Object { $_.MainWindowTitle -match '${folderPath.replace(/\\/g, '\\\\')}' }"`;

	let folderOpen = true;
	try {
		const cmdOutput = execSync(powershellCommand, { stdio: 'pipe', encoding: 'utf-8' });

		folderOpen = !!cmdOutput.trim();
	} catch (error) {
		Logger.error('Error while checking if folder already open', error?.stack);
	}

	return folderOpen;
}
module.exports = { isFolderOpen };
