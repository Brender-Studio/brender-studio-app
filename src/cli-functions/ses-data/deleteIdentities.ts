import { Command } from "@tauri-apps/api/shell";

// ex:  aws ses delete-identity --identity jernono2022@gmail.com  --profile jer-info-dev --region us-west-2

// identities from args are an array of strings, we need to loop through them and delete them one by one

export async function deleteIdentities(identities: string[], region: string, profile: string) {
    for (const identity of identities) {
        const command = new Command("aws-cli", [
            "ses",
            "delete-identity",
            "--identity",
            identity,
            "--profile",
            profile,
            "--region",
            region
        ]);

        try {
            const output = await command.execute();
            // const stdout = output.stdout?.toString() || '';
            const stderr = output.stderr?.toString() || '';

            if (output.code !== 0) {
                console.error(`Command failed with code ${output.code}`);
                console.error(`stderr: ${stderr}`);
                throw new Error(stderr);
            }

            // console.log(stdout);
        } catch (error) {
            console.error(error);
            throw new Error(String(error || 'Failed to delete identity'));
        }
    }
}