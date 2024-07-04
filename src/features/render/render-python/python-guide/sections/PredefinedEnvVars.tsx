import WarnAlert from "@/components/custom/alerts/WarnAlert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info } from "lucide-react";
import Section from "../components/Section";

const PredefinedEnvVars = () => {

    const environmentVars = [
        {
            name: "JOB_ACTION_TYPE",
            description: "Defines the job action type. Brender Studio Docker image uses this variable to determine the action type of the job.",
            envType: "Brender-Studio"
        },
        {
            name: "EFS_MAIN_SCRIPT_PATH",
            description: "Path to the main script in EFS.",
            envType: "Brender-Studio"
        },
        {
            name: "EFS_BLENDER_FILE_PATH",
            description: "Path to the .blend file in EFS.",
            envType: "Brender-Studio"
        },
        {
            name: "EFS_BLENDER_OUTPUT_FOLDER_PATH",
            description: "Path to the output folder in EFS. Useful for saving the rendered images using Brender Studio logic. All contents of this folder are uploaded to S3 after the job is completed.",
            envType: "Brender-Studio"
        },
        {
            name: "BLENDER_EXECUTABLE",
            description: "Path to the Blender executable.",
            envType: "Brender-Studio"
        },
        {
            name: "USE_EEVEE",
            description: "Determines if the Eevee render engine is used. Docker image activates a virtual display for Eevee rendering (xvfb).",
            envType: "Brender-Studio"
        },
        {
            name: "USE_GPU",
            description: "Determines if GPU is used for rendering. No logic is implemented in the Docker image to use the GPU. Users can use this variable to implement their own logic.",
            envType: "Brender-Studio"
        },
        {
            name: "BUCKET_NAME",
            description: "Name of the S3 bucket.",
            envType: "Brender-Studio"
        },
        {
            name: "BUCKET_KEY",
            description: "Project key in S3. It is the project name provided by the user in the form.",
            envType: "Brender-Studio"
        },
        {
            name: "AWS_BATCH_JOB_ARRAY_INDEX",
            description: "Index of the job in the AWS Batch job array. Useful for identifying the job in the array.",
            envType: "AWS Batch"
        },
        {
            name: "AWS_BATCH_JOB_ARRAY_SIZE",
            description: "Size of the job array in AWS Batch. Useful for identifying the size of the job array.",
            envType: "AWS Batch"
        },
        {
            name: "AWS_BATCH_JOB_ID",
            description: "ID of the AWS Batch job.",
            envType: "AWS Batch"
        },
        {
            name: "AWS_BATCH_JOB_ATTEMPT",
            description: "Attempt number of the AWS Batch job.",
            envType: "AWS Batch"
        },
        {
            name: "AWS_BATCH_CE_NAME",
            description: "Compute environment name of the AWS Batch job.",
            envType: "AWS Batch"
        },
        {
            name: "AWS_BATCH_JQ_NAME",
            description: "Job queue name of the AWS Batch job.",
            envType: "AWS Batch"
        }
    ];

    return (
        <div className="space-y-6">
            <Section title="Predefined Environment Variables">
                <p className='text-muted-foreground text-sm'>
                    Brender Studio provides a set of predefined environment variables that can be accessed in the Python scripts using the <code>os.environ.get()</code> method.
                </p>
            </Section>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Env Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {environmentVars.map((envVar) => (
                        <TableRow key={envVar.name}>
                            <TableCell>{envVar.name}</TableCell>
                            <TableCell>{envVar.description}</TableCell>
                            <TableCell>
                                <p className="text-muted-foreground">{envVar.envType}</p>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Section title="About AWS Batch Environment Variables">
                <p className='text-muted-foreground text-sm'>
                    AWS Batch provides a set of predefined environment variables that can be accessed in the Python scripts using the <code>os.environ.get()</code> method.
                    It's useful for identifying the job in the AWS Batch job array, job ID, attempt number, etc.
                    Not allways all the variables are available, it depends if the job is single or part of an array.
                </p>
                <p className='text-muted-foreground text-sm'>
                    In Blender it can be used to render different frames of an animation in parallel, render a range of frames, or render different scenes in parallel depending on the job index.
                </p>
            </Section>
            
            <div className="space-y-4">
                <WarnAlert
                    className="text-white"
                    variant="info"
                    icon={<Info size={16} />}
                    title="Note: AWS Batch Environment Variables"
                    description="You must choose array size greater or equal than 2 in the Brender Studio form to use the AWS Batch environment variables like AWS_BATCH_JOB_ARRAY_INDEX and AWS_BATCH_JOB_ARRAY_SIZE."
                />
                <p className="text-sm text-muted-foreground">
                    You can configure the array size in the Brender Studio form under <code>Job Settings {">"} Array Size (select)</code>
                </p>
            </div>
        </div>
    );
}

export default PredefinedEnvVars;
