import { Command } from "@tauri-apps/api/shell";


// aws batch describe-jobs --jobs e9689703-16e6-48a7-a6e5-1abe4eb94b08

// debemos recibir un id de job para extraer la información de ese job

export async function describeJobs(jobId: string, region: string, profile: string) {
        
        try {
            const command = new Command("aws-cli", [
                "batch",
                "describe-jobs",
                "--jobs",
                jobId,
                "--region",
                region,
                "--profile",
                profile,
                "--output",
                "json"
            ]);
    
            // command.on('close', data => {
            //     console.log('data', data)
            // });
            // command.on('error', error => {
            //     console.log('error', error)
            // });
    
            const output = await command.execute();
            // console.log('describeJobs output', output)
    
            const stderr = output.stderr?.toString() || '';
    
            if (output.code !== 0) {
                console.error(`Command failed with code ${output.code}`);
                console.error(`stderr: ${stderr}`);
                throw new Error(stderr);
            }
    
            const stdout = output.stdout?.toString() || '';
    
            const jobs = JSON.parse(stdout) || [];
    
            // console.log('jobs', jobs)
    
            return jobs.jobs || [];
    
        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error.message)
                throw error;
            }
        }
    }