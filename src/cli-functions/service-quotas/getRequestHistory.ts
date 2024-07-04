import { Command } from '@tauri-apps/api/shell';


//  aws service-quotas list-requested-service-quota-change-history --service-code ec2 --region us-east-1 

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

        let errorOutput = '';
        let output = '';

      
        command.stderr.on('data', data => {
            errorOutput += data.toString();
        });

        
        command.stdout.on('data', data => {
            output += data.toString();
        });

        
        const child = await command.execute();

        
        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${errorOutput}`);
        }
        
        const response = JSON.parse(output);

        return response;
    } catch (error: any) {
        console.error('Error executing command:', error);
        throw new Error(`Failed to get EC2 service quotas: ${error.message}`);
    }
}