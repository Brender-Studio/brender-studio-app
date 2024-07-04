import { Command } from "@tauri-apps/api/shell";

// we need template name , json path template, region and profile

// example:  aws ses create-template --cli-input-json file://render_completed.json --region us-west-2 --profile brender-studio

// args fn: templateName, templatePath, region, profile

export async function uploadTemplate(templateName: string, templatePath: string, region: string, profile: string) {

    console.log('Uploading template...', templateName)
    
    try {
        const uploadTemplateCommand = new Command('aws-cli', [
            "ses",
            "create-template",
            "--cli-input-json",
            `file://${templatePath}`,
            "--region",
            region,
            "--profile",
            profile
        ]);

        const uploadTemplateOutput = await uploadTemplateCommand.execute();
        const uploadTemplateStderr = uploadTemplateOutput.stderr?.toString() || '';

        if (uploadTemplateOutput.code !== 0) {
            console.error(`Failed to upload template with code ${uploadTemplateOutput.code}`);
            console.error(`stderr: ${uploadTemplateStderr}`);
            throw new Error(uploadTemplateStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}
