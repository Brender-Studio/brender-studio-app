import { Command } from "@tauri-apps/api/shell";

// ex: aws ses verify-email-identity --email-address test@gmail.com --profile test --region us-east-1

export async function verifyEmail(email: string, region: string, profile: string) {
    const command = new Command("aws-cli", [
        "ses",
        "verify-email-identity",
        "--email-address",
        email,
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
        throw new Error(String(error || 'Failed to verify email'));
    }
}