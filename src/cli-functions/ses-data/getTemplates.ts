import { Command } from "@tauri-apps/api/shell";


// C:\Users\dev-admin>aws ses list-templates --region us-east-1
// {
//     "TemplatesMetadata": [
//         {
//             "Name": "RenderFailedTemplate",
//             "CreatedTimestamp": "2024-05-06T11:43:41.086000+00:00"
//         },
//         {
//             "Name": "RenderCompletedTemplate",
//             "CreatedTimestamp": "2024-05-06T11:43:38.486000+00:00"
//         }
//     ]
// }


// fn args: region: string, profile: string


export async function getTemplates(region: string, profile: string) {
    const command = new Command("aws-cli", [
        "ses",
        "list-templates",
        "--region",
        region,
        "--profile",
        profile,
        "--output",
        "json"
    ]);

    try {
        const output = await command.execute();
        const stdout = output.stdout?.toString() || '';
        const stderr = output.stderr?.toString() || '';

        if (output.code !== 0) {
            console.error(`Command failed with code ${output.code}`);
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        // Parse the JSON output
        const templates = JSON.parse(stdout).TemplatesMetadata || [];

        // console.log('templates', templates)

        return templates;
    } catch (error) {
        console.error(error);
        throw error;
    }
}