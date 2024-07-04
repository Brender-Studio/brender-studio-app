import ExternalLink from "../buttons/ExternalLink"

const JobsHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What are Jobs?</h3>
                <p className="text-xs text-muted-foreground">
                    Jobs represent the tasks executed by Brender Studio to render your Blender projects. When you submit a render job, it triggers a series of actions orchestrated by AWS Batch.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">What is AWS Batch?</h3>
                <p className="text-xs text-muted-foreground">
                    AWS Batch is a service provided by Amazon Web Services (AWS) that helps to efficiently run hundreds or thousands of batch computing jobs. Brender Studio utilizes AWS Batch to manage and execute the rendering tasks.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">Why Three Jobs?</h3>
                <p className="text-xs text-muted-foreground">
                    Each render job triggers three sequential jobs in Brender Studio's workflow.
                    <br />
                    <br />
                    1. The first job copies the Blender project files from Amazon S3 to the Elastic File System (EFS).
                    <br />
                    <br />
                    2. The second job renders the Blender scene using the files stored in EFS.
                    <br />
                    <br />
                    3. The third job uploads the rendered images from EFS back to Amazon S3 and sends an email notification using Amazon SES to inform you that the render is completed.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/render-jobs'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default JobsHoverCard