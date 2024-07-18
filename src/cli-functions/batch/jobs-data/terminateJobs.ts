import { Command } from "@tauri-apps/api/shell";

export async function terminateJobs(jobIds: string[], region: string, profile: string) {

    // console.log('jobIds from fn', jobIds)

    try {
        for (let i = 0; i < jobIds.length; i++) {
            const command = new Command("aws-cli", [
                "batch",
                "terminate-job",
                "--job-id",
                jobIds[i],
                "--reason",
                "Job terminated by user",
                "--region",
                region,
                "--profile",
                profile,
                "--output",
                "json"
            ]);

            // console.log('command', command)

            const output = await command.execute();
            // console.log('terminateJobs output', output)

            const stderr = output.stderr?.toString() || '';

            if (output.code !== 0) {
                console.error(`Command failed with code ${output.code}`);
                console.error(`stderr: ${stderr}`);
                throw new Error(stderr);
            }

            const stdout = output.stdout?.toString() || '';

            if (stdout) {
                const job = JSON.parse(stdout);
                console.log('job', job);
            } else {
                console.log('No se recibió ningún dato JSON en la salida stdout');
            }
        }
        return jobIds;

    } catch (error) {
        if (error instanceof Error) {
            console.log('error', error.message)
            throw error;
        }
    }
}



