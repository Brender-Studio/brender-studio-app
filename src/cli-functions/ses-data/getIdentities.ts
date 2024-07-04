import { Command } from "@tauri-apps/api/shell";


// example:  aws ses list-identities --identity-type EmailAddress --profile jer-info-dev --region us-west-2
// {
//     "Identities": [
//         "jernono2022@gmail.com",
//         "jer.info.dev@gmail.com"
//     ]
// }

// aws ses get-identity-verification-attributes --identities jernono2022@gmail.com --profile jer-info-dev --region us-west-2
// {
//     "VerificationAttributes": {
//         "jernono2022@gmail.com": {
//             "VerificationStatus": "Pending"
//         }
//     }
// }

export async function getIdentities(region: string, profile: string) {
    const command = new Command("aws-cli", [
        "ses",
        "list-identities",
        "--identity-type",
        "EmailAddress",
        "--profile",
        profile,
        "--region",
        region,
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
        const identities = JSON.parse(stdout).Identities || [];

        // console.log('identities', identities)

        // Get verification attributes for each identity
        const verificationAttributes = await Promise.all(identities.map(async (identity: string) => {
            const command = new Command("aws-cli", [
                "ses",
                "get-identity-verification-attributes",
                "--identities",
                identity,
                "--profile",
                profile,
                "--region",
                region,
                "--output",
                "json"
            ]);

            const output = await command.execute();
            const stdout = output.stdout?.toString() || '';
            const stderr = output.stderr?.toString() || '';

            if (output.code !== 0) {
                console.error(`Command failed with code ${output.code}`);
                console.error(`stderr: ${stderr}`);
                throw new Error(stderr);
            }

            // Parse the JSON output
            const attributes = JSON.parse(stdout).VerificationAttributes || {};

            return { identity, attributes, region, profile};
        }));

        return verificationAttributes;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An error occurred: ${error.message}`);
            throw error;
        }
    }
}
