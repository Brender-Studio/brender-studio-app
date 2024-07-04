import WarnAlert from "@/components/custom/alerts/WarnAlert";
import SyntaxCode from "@/components/custom/code/SyntaxCode";
import { Info } from "lucide-react";
import { exampleArrayJob } from "../constants/codeSnippets";
import Section from "../components/Section";

const AWSArrayJobExplanation = () => {
    return (
        <div className="space-y-6">
            <Section title="AWS Array Job Explanation">
                <p className='text-muted-foreground text-sm'>
                    An "Array Job" in AWS Batch allows running multiple jobs in parallel, each performing a part of a larger task. This is particularly useful for tasks that can be divided into smaller, independent pieces, such as rendering different frames of an animation or processing chunks of data.
                </p>
            </Section>

            <Section title="Example using Blender (bpy)">
                <p className='text-muted-foreground text-sm'>
                    Here is an example of a Blender script that renders different frames of an animation based on the job index in the array. The job index helps to assign specific frames to each job in the array:
                </p>
                <SyntaxCode
                    language="python"
                    code={
                        exampleArrayJob
                    }
                />
            </Section>

            <Section title="Key Considerations for AWS Array Jobs">
                <p className='text-muted-foreground text-sm'>
                    When working with AWS Batch array jobs, keep the following points in mind:
                </p>
                <ul className='pl-6 pb-2 list-disc list-inside text-muted-foreground text-sm space-y-2'>
                    <li><strong>Array Size:</strong> Ensure the array size matches the number of partitions or tasks you want to process. For example, if rendering 100 frames with 10 frames per job, set the array size to 10.</li>
                    <li><strong>Environment Variables:</strong> Use environment variables to pass information to your scripts.</li>
                </ul>
            </Section>

            <Section title="Example using AWS CLI">
                <p className='text-muted-foreground text-sm'>
                    You can submit an array job using the AWS CLI with the following command:
                </p>
                <SyntaxCode
                    language="python"
                    code={`aws batch submit-job --job-name my-array-job --job-queue my-job-queue --job-definition my-job-definition --array-properties size=10`}
                />
            </Section>

                <WarnAlert
                    className="text-white"
                    variant="info"
                    icon={<Info size={16} />}
                    title="AWS CLI Array Job"
                    description="This command submits an array job with 10 sub-jobs. Each sub-job will receive a unique index, accessible via the AWS_BATCH_JOB_ARRAY_INDEX environment variable."
                />

        </div>
    );
}

export default AWSArrayJobExplanation;
