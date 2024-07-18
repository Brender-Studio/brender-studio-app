import { Command } from "@tauri-apps/api/shell";

export async function checkSesTemplate(region: string, profile: string, templateName: string) {
    try {
        const listTemplatesCommand = new Command('aws-cli', [
            "ses",
            "list-templates",
            "--query",
            `TemplatesMetadata[?Name=='${templateName}']`,
            "--region", region,
            "--profile", profile
        ]);

        const templatesOutput = await listTemplatesCommand.execute();
        const templatesStderr = templatesOutput.stderr?.toString() || '';

        if (templatesOutput.code !== 0) {
            console.error(`Failed to list templates with code ${templatesOutput.code}`);
            console.error(`stderr: ${templatesStderr}`);
            throw new Error(templatesStderr);
        }

        const templates = JSON.parse(templatesOutput.stdout?.toString() || '[]');

        return templates.length > 0;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}