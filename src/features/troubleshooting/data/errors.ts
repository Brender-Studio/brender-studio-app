

export const errors = [
    {
        title: 'Jobs stuck in a RUNNABLE status',
        id: 'jobs-error',
        description: `When submitting a rendering job, it may get stuck in the "Runnable/Pending" state due to various reasons.`,
        solution: [
            {
                solution_title: 'Lack of Instances (Spot/On-Demand)',
                solution_description: `This can occur if there are no instances available at that time, especially if spot instances are being used. It is recommended to wait for a while and try again. Alternatively, consider creating stacks in other regions to check for resource availability.`
            },
            {
                solution_title: 'Insufficient Quota',
                solution_description: `On GPU-based EC2 servers, it's common to face limitations on default quotas. It is suggested to request an increase in spot and on-demand instance quotas. Quotas are associated with specific regions and must be requested separately.`
            },
            {
                solution_title: 'Invalid Compute Environment',
                solution_description: `Check the status of compute environments and ensure they are all valid. In case of an invalid compute environment, it is recommended to delete and recreate the corresponding stack.`
            }
        ],
        web_docs_link: 'https://brenderstudio.com/docs/troubleshooting/jobs-stuck-runnable'
    },
    {
        title: 'Farm (stack) is not deploying correctly',
        id: 'stack-error',
        description: `Stack creation can fail due to errors during the build process, such as server issues or lack of resources in third-party repositories.`,
        solution: [
            {
                solution_title: 'Build Review',
                solution_description: `Check the status of builds and, in case of failure, delete the stack and recreate it.`
            },
            {
                solution_title: 'ROLLBACK_COMPLETE, ROLLBACK_FAILED, CREATE_FAILED  or other status errors',
                solution_description: `If the stack is in a failed state, it is recommended to delete it and recreate it.`
            },
            {
                solution_title: 'Availability of Resources in AWS regions',
                solution_description: `Check the availability of resources (logs) in the AWS region where the stack is being created. EC2 G5 intsances are only available in certain regions. If there are no resources available, consider creating stacks in other regions.`
            }
        ],
        web_docs_link: 'https://brenderstudio.com/docs/troubleshooting/farm-not-deploying'
    },
    {
        title: 'GPU rendering is not working',
        id: 'gpu-error',
        description: `Issues related to GPU instance service quotas.`,
        solution: [
            {
                solution_title: 'Insufficient Quota',
                solution_description: `Request an increase in spot and on-demand instance quotas to resolve this issue. We recommend starting with lower values and increasing them as needed.`
            }
        ],
        internal_link: '/service-quotas'
    },
    {
        title: 'App crashes when trying to read .blend files',
        id: 'crash-error',
        description: `Ensure that the Blender executable path is correctly configured and that the file version is compatible with the Blender version.`,
        solution: [
            {
                solution_title: 'Refer to Official Path',
                solution_description: `It is recommended to use the official Blender installation path to ensure proper functioning.`
            },

        ],
        internal_link: '/settings'
    },
    {
        title: 'I configured my AWS credentials but the app is not working, no data is being displayed',
        id: 'cli-profile-error',
        description: `Verify that the associated IAM user has the appropriate permissions, such as "Administrator Full Access," to interact with AWS services. Refer to the official documentation for more information on configuring the AWS CLI profile.`,
        solution: [
            {
                solution_title: 'AWS CLI Profile',
                solution_description: `Ensure that the AWS CLI profile is correctly configured and that the user has the necessary permissions to interact with AWS services.`
            },
            {
                solution_title: 'AWS CLI version',
                solution_description: `Ensure that the AWS CLI version is up to date. The minimum required version is 2.14.0.`
            }
        ],
        web_docs_link: 'https://brenderstudio.com/docs/troubleshooting/aws-credentials-configured-not-working'
    },
    {
        title: 'Why am I not receiving the notification email?',
        id: 'notification-email-error',
        description: `Several reasons can cause delays or failures in receiving the notification email when a job is completed.`,
        solution: [
            {
                solution_title: 'Delay in Email Delivery',
                solution_description: `Sometimes, there is a delay of a few minutes in sending the email.`
            },
            {
                solution_title: 'Spam Folder',
                solution_description: `Check the spam folder for the email, as it may have been marked as spam.`
            },
            {
                solution_title: 'Job Interrupted Mid-Process',
                solution_description: `The job may have stopped mid-process. The email is sent in the final job when the final renders are uploaded to S3. This can happen if the user manually terminates jobs/EC2 instances. Another possibility is a runtime error marking the job as failed, terminating dependent jobs.`
            },
            {
                solution_title: 'No SES Templates uploaded',
                solution_description: `Ensure that the SES templates are correctly uploaded. There are two templates: one for successful jobs (RenderCompletedTemplate) and another for failed jobs (RenderFailedTemplate). If these templates are not uploaded, the email will not be sent. You can re-upload the templates following the instructions in the documentation.`
            }
        ],
        web_docs_link: 'https://brenderstudio.com/docs/troubleshooting/not-receiving-emails',
        internal_link: '/email-notifications'
    },
    {
        title: 'Render fail: Out of memory Error',
        id: 'out-of-memory-error',
        description: `This error occurs due to the container configuration, where insufficient memory is allocated.`,
        solution: [
            {
                solution_title: 'Adjust Container Configuration',
                solution_description: `Ensure the container (CPU/GPU) configurations have enough memory to process heavy .blend scenes. This can be configured in the job submission form under Job settings > Container EC2 configuration.`
            }
        ],
        web_docs_link: 'https://brenderstudio.com/docs/troubleshooting/render-fail-out-of-memory'
    },
    {
        title: 'Cost Explorer is not showing data',
        id: 'cost-explorer-error',
        description: `The Cost Explorer may not show data due to the following reasons:`,
        solution: [
            {
                solution_title: '24 hours Delay',
                solution_description: `The Cost Explorer data is updated with a 24-hour delay.`
            },
            {
                solution_title: 'Incorrect Date Range',
                solution_description: `Ensure that the correct date range is selected in the Cost Explorer.`
            },
            {
                solution_title: 'Tag is Invalid - StackName',
                solution_description: `Brender Studio uses the tag "StackName" to identify the resources. If the tag is not present, the Cost Explorer will not display data. You can activate the cost allocation tags in the billing preferences in the AWS Management Console > Billing & Cost Management > Cost allocation tags.`
            }
        ],
        web_docs_link: 'https://brenderstudio.com/docs/troubleshooting/cost-explorer-not-showing-data'
    },
    {
        title: 'Forced Problem Solving',
        id: 'general-error',
        description: `Sometimes, errors related to lack of synchronization, creation, or updating of resources in AWS may arise.`,
        solution: [
            {
                solution_title: 'Delete Stack and ECR images',
                solution_description: `As a forced measure, delete a stack and all associated images in ECR to mitigate potential misconfiguration issues. It's important to note that if ECR images are deleted, all stacks will become unusable, and you will need to re-deploy them.`
            }
        ],
        // web_docs_link: 'https://brenderstudio.com/docs/troubleshooting/forced-troubleshooting'
    },
]