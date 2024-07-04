import { boto3CodeS3, boto3CodeSES, iamRolePolicy, s3Policy } from '../constants/codeSnippets'
import Section from '../components/Section'
import SectionWithCode from '../components/SectionWithCode'

const Boto = () => {
    return (
        <div className="space-y-6">

            <Section title="Using boto3">
                <p className="text-muted-foreground text-sm">
                    Boto3 is the AWS SDK for Python. It allows you to interact with AWS services using Python code. You can use boto3 to automate tasks, manage resources, and interact with AWS services programmatically.
                </p>

                <p className="text-muted-foreground text-sm">
                    AWS Batch containers have the boto3 library pre-installed, so you can use it in your Python scripts without any additional setup. Containers have permissions to interact with AWS S3 and SES services.
                </p>
            </Section>

            <SectionWithCode title="Example of using boto3 to interact with AWS S3" language='python' code={boto3CodeS3} />

            <SectionWithCode title="Example of using boto3 to interact with AWS SES" language='python' code={boto3CodeSES}>
                <p className="text-muted-foreground text-sm">
                    Remember to replace <code>your_email@example.com</code> and <code>recipient@example.com</code> with your actual email addresses. Ensure that the sender email is verified in AWS SES.
                </p>
            </SectionWithCode>

            <Section title="AWS Batch IAM Role Permissions">
                <p className="text-muted-foreground text-sm">
                The AWS Batch container is launched with an IAM role associated with each compute environment created in Brender Studio. This IAM role has permissions to interact with AWS Batch, S3, and SES services. You can customize the IAM role permissions to restrict or allow access to specific AWS services.
                </p>
            </Section>

            <SectionWithCode title="Current IAM Role Permissions for the AWS Batch container" language='json' code={iamRolePolicy} />

            <SectionWithCode title="S3 IAM attachment policy" language='json' code={s3Policy} />

        </div>
    )
}

export default Boto
