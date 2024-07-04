import { Command } from '@tauri-apps/api/shell';

// aws service-quotas list-service-quotas --service-code ec2 --region us-east-1 --query "Quotas[?QuotaName=='All G and VT Spot Instance Requests' || QuotaName=='Running On-Demand G and VT instances']"

export async function getEc2ServiceQuotasCpu(profile: string, region: string) {
    try {
        const command = new Command('aws-cli', [
            "service-quotas",
            "list-service-quotas",
            "--service-code",
            "ec2",
            "--region",
            region,
            "--profile",
            profile,
            "--query",
            "Quotas[?QuotaName=='Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances' || QuotaName=='All Standard (A, C, D, H, I, M, R, T, Z) Spot Instance Requests']",
            "--output",
            "json"
        ]);

        let errorOutput = '';

        command.stderr.on('data', data => {
            errorOutput += data.toString();
        });

        const child = await command.execute();

        // console.log('child', child.code, child.stdout.toString(), errorOutput);

        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${errorOutput}`);
        }

        const str = child.stdout.toString();
        // console.log('str', str);
        const response = JSON.parse(str);

        return response;
    } catch (error) {
        throw new Error(`Failed to get EC2 G5 service quotas: ${(error as Error).message}`);
    }
}