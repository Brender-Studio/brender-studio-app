import { Command } from "@tauri-apps/api/shell";

export async function checkCliInstallation() {
    try {
        const command = new Command('aws-cli', ['--version']);
        const output = await command.execute();

        // Extract the version from the output
        const versionMatch = output.stdout.match(/aws-cli\/(\d+(\.\d+)+)/);
        if (versionMatch) {
            const awsCliVersion = versionMatch[1];
            console.log('AWS CLI Version:', awsCliVersion);

            // Compare the major and minor version
            const [majorVersion, minorVersion] = awsCliVersion.split('.').map(Number);
            if (majorVersion > 2 || (majorVersion === 2 && minorVersion >= 14)) {
                console.log('Valid CLI version.');
                return {
                    cliInstalled: true,
                    cliVersion: awsCliVersion
                }
            } else {
                console.error('CLI version is not valid. Please update AWS CLI to version 2.10 or higher.');
                return {
                    cliInstalled: false,
                    cliVersion: awsCliVersion
                }
            }
        } else {
            console.error('Failed to get CLI version.');
            return {
                cliInstalled: false,
                cliVersion: null
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return {
            cliInstalled: false,
            cliVersion: null
        }
    }
}