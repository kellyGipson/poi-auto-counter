import { execSync } from 'child_process';
import { Logger } from '../logging/logger';

export const isFolderOpen = (folderPath: string) => {
	const powershellCommand = `powershell -Command "Get-Process | Where-Object { $_.MainWindowTitle -match '${folderPath.replace(/\\/g, '\\\\')}' }"`;

	let folderOpen = true;
	try {
		const cmdOutput = execSync(powershellCommand, { stdio: 'pipe', encoding: 'utf-8' });

		folderOpen = !!cmdOutput.trim();
	} catch (error: any) {
		Logger.error('Error while checking if folder already open', error?.stack);
	}

	return folderOpen;
}
