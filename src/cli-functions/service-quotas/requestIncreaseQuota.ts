import { Command } from '@tauri-apps/api/shell';

// aws service-quotas request-service-quota-increase --service-code ec2 --quota-code L-DB2E81BA --desired-value 96 --region us-east-1

export async function requestIncreaseQuota(profile: string, region: string, serviceCode: string, quotaCode: string, desiredValue: number) {
    try {
        const command = new Command('aws-cli', [
            "service-quotas",
            "request-service-quota-increase",
            "--service-code",
            serviceCode,
            "--quota-code",
            quotaCode,
            "--desired-value",
            desiredValue.toString(),
            "--region",
            region,
            "--profile",
            profile,
            "--output",
            "json"
        ]);

        // console.log('command', command)

        let errorOutput = '';

        command.stderr.on('data', data => {
            errorOutput += data.toString();
        });

        const child = await command.execute();


        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${child.stderr}`);
        }

        const str = child.stdout.toString();

        const response = JSON.parse(str);

        return response;
    } catch (error) {
        throw new Error(`Failed to request quota increase: ${(error as Error).message}`);
    }
}