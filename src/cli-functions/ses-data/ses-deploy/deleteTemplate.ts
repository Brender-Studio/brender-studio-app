import { Command } from "@tauri-apps/api/shell";


// delete template ses

// aws ses delete-template --template-name templateName --region us-east-1 --profile default

// args fn: templateName, region, profile

export async function deleteTemplate(templateName: string, region: string, profile: string) {

    console.log('Deleting template...', templateName)
    
    try {
        const deleteTemplateCommand = new Command('aws-cli', [
            "ses",
            "delete-template",
            "--template-name",
            templateName,
            "--region",
            region,
            "--profile",
            profile
        ]);

        const deleteTemplateOutput = await deleteTemplateCommand.execute();
        const deleteTemplateStderr = deleteTemplateOutput.stderr?.toString() || '';

        if (deleteTemplateOutput.code !== 0) {
            console.error(`Failed to delete template with code ${deleteTemplateOutput.code}`);
            console.error(`stderr: ${deleteTemplateStderr}`);
            throw new Error(deleteTemplateStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}