import WarnAlert from "@/components/custom/alerts/WarnAlert";
import { Info } from "lucide-react";
import Section from "../components/Section";

const IntroductionPy = () => {
    return (
        <div className="space-y-6">
            <Section title="Introduction">
                <p className='text-muted-foreground text-sm'>
                    Brender Studio allows users to upload Python scripts to add custom logic when rendering Blender scenes using AWS Batch. Users can leverage predefined and custom environment variables to tailor the rendering process.
                </p>

                <p className='text-muted-foreground text-sm'>
                    AWS provides additional environment variables depending on the job type, such as <code>AWS_BATCH_JOB_ARRAY_INDEX</code> and <code>AWS_BATCH_JOB_ARRAY_SIZE</code>.
                </p>

                <div className='text-muted-foreground text-sm space-y-2'>
                    <p className='text-muted-foreground text-sm'>
                        For rendering, Brender Studio manages three sequential jobs. Before rendering starts, Brender Studio uploads the Python and .blend files to S3. The jobs are as follows:
                    </p>

                    <ol className="list-decimal pl-6 space-y-2 py-4">
                        <li><strong>Job 1:</strong> Copies the files from S3 to EFS at <code>mnt/efs/projects/YOUR_PROJECT_NAME</code>.</li>
                        <li><strong>Job 2:</strong> Renders the Blender scene with the custom Python script, saving the result to <code>mnt/efs/YOUR_PROJECT_NAME/output</code> in EFS, using the <code>EFS_BLENDER_OUTPUT_FOLDER_PATH</code> environment variable (if included in the script).</li>
                        <li><strong>Job 3:</strong> Copies the entire <code>mnt/efs/projects/YOUR_PROJECT_NAME/output</code> folder from EFS (containing all final renders) back to S3.</li>
                    </ol>

                    <WarnAlert
                        className="text-white"
                        variant="info"
                        icon={<Info size={16} />}
                        title="Note"
                        description="YOUR_PROJECT_NAME is the project name you provided in the form. Project names are also S3 folder names. Brender Studio replicates the folder structure in both EFS and S3."
                    />
                </div>
            </Section>

            <Section title="Why EFS?">
                <p className='text-muted-foreground text-sm'>
                    Amazon Elastic File System (EFS) is a scalable, fully managed, cloud-native NFS file system that can be shared across thousands of Amazon EC2 instances. EFS is used in Brender Studio to store project files and render outputs, ensuring files are accessible across all jobs and the rendering output is saved in a central location.
                </p>
            </Section>
        </div>
    );
}

export default IntroductionPy;
