import { Command } from "@tauri-apps/api/shell";


// update template ses

// aws ses update-template --cli-input-json file://render_completed.json --region us-east-1 --profile default

// args fn: templateName, templatePath, region, profile

export async function updateTemplate( templatePath: string, region: string, profile: string) {

    // console.log('Updating template...', templateName)
    
    try {
        const updateTemplateCommand = new Command('aws-cli', [
            "ses",
            "update-template",
            "--cli-input-json",
            `file://${templatePath}`,
            "--region",
            region,
            "--profile",
            profile
        ]);

        const updateTemplateOutput = await updateTemplateCommand.execute();
        const updateTemplateStderr = updateTemplateOutput.stderr?.toString() || '';

        if (updateTemplateOutput.code !== 0) {
            console.error(`Failed to update template with code ${updateTemplateOutput.code}`);
            console.error(`stderr: ${updateTemplateStderr}`);
            throw new Error(updateTemplateStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}