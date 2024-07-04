import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";

export async function getCodeBuildRole(region: string, profile: string) {
    try {
        const getRoleCommand = new Command('aws-cli', [
            "iam",
            "get-role",
            "--role-name",
            deployConfig.iam.baseServiceRoleName + `-${region}`,
            "--region", region,
            "--profile", profile
        ]);

        const roleOutput = await getRoleCommand.execute();
        const roleStderr = roleOutput.stderr?.toString() || '';

        if (roleOutput.code !== 0) {
            console.error(`Failed to get role with code ${roleOutput.code}`);
            console.error(`stderr: ${roleStderr}`);
            throw new Error(roleStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}