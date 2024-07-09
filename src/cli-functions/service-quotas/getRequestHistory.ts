import { Command } from '@tauri-apps/api/shell';

export async function getRequestHistory(profile: string, region: string) {
    try {
        const command = new Command('aws-cli', [
            "service-quotas",
            "list-requested-service-quota-change-history",
            "--service-code",
            "ec2",
            "--region",
            region,
            "--profile",
            profile,
            "--query",
            "RequestedQuotas[?QuotaName=='All G and VT Spot Instance Requests' || QuotaName=='Running On-Demand G and VT instances' || QuotaName=='Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances' || QuotaName=='All Standard (A, C, D, H, I, M, R, T, Z) Spot Instance Requests']",
            "--output",
            "json"
        ]);

        const child = await command.execute();

        // console.log('Command executed:', child.code, child.stdout, child.stderr);
        
        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${child.stderr}`);
        }

        if (!child.stdout) {
            throw new Error('No output received from command.');
        }

        const response = JSON.parse(child.stdout);

        return response;
    } catch (error) {
        console.error('Error executing command:', error);

        if (error instanceof Error) {
            throw new Error(`Failed to get EC2 service quotas: ${error.message}`);
        }

    }
}
