import { Command } from "@tauri-apps/api/shell";
import { getUserAwsId } from "../../user/getUserAwsId";
import { deployConfig } from "../deploy-config/deployConfig";
import { cdkBootstrapInlinePolicy } from "./roles/cdkBootstrapInlinePolicy";
import { ssmInlinePolicy } from "./roles/ssmInlinePolicy";
import { cdkInlinePolicy } from "./roles/cdkInlinePolicy";
import { trustPolicy } from "./roles/trustPolicy";

export async function createCodeBuildServiceRole(region: string, profile: string) {
    // console.log(`Creating CodeBuild service role in region ${region} and profile ${profile}...`);
    const roleName = deployConfig.iam.baseServiceRoleName + `-${region}`;


    const awsAccountId = await getUserAwsId(profile);
    if (!awsAccountId || typeof awsAccountId !== 'string') {
        console.error(`No AWS Account ID found.`);
        return false;
    }

    const inlinePolicy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Resource": [
                    `arn:aws:logs:${region}:${awsAccountId}:log-group:/aws/codebuild/*`,
                    `arn:aws:logs:${region}:${awsAccountId}:log-group:/aws/codebuild/*:*`
                ],
                "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ]
            },
            {
                "Effect": "Allow",
                "Resource": [
                    `arn:aws:s3:::codepipeline-${region}-*`
                ],
                "Action": [
                    "s3:PutObject",
                    "s3:GetObject",
                    "s3:GetObjectVersion",
                    "s3:GetBucketAcl",
                    "s3:GetBucketLocation"
                ]
            },
            {
                "Effect": "Allow",
                "Resource": [
                    `arn:aws:codecommit:${region}:${awsAccountId}:*`
                ],
                "Action": [
                    "codecommit:GitPull"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "codebuild:CreateReportGroup",
                    "codebuild:CreateReport",
                    "codebuild:UpdateReport",
                    "codebuild:BatchPutTestCases",
                    "codebuild:BatchPutCodeCoverages"
                ],
                "Resource": [
                    `arn:aws:codebuild:${region}:${awsAccountId}:report-group/*`
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "ec2:DescribeInstanceTypeOfferings"
                ],
                "Resource": "*"
            }
        ]
    };

    try {
        // 1. Create role
        const createRoleCommand = new Command('aws-cli', [
            "iam",
            "create-role",
            "--role-name", roleName,
            "--assume-role-policy-document", JSON.stringify(trustPolicy),
            "--region", region,
            "--profile", profile
        ]);

        const createRoleOutput = await createRoleCommand.execute();
        const createRoleStderr = createRoleOutput.stderr?.toString() || '';

        if (createRoleOutput.code !== 0) {
            console.error(`Failed to create role with code ${createRoleOutput.code}`);
            console.error(`stderr: ${createRoleStderr}`);
            throw new Error(createRoleStderr);
        }

        // 2. Attach inline policy to role
        const attachPolicyCommand = new Command('aws-cli', [
            "iam",
            "put-role-policy",
            "--role-name", roleName,
            "--policy-name", "CodeBuildServiceRolePolicy",
            "--policy-document", JSON.stringify(inlinePolicy),
            "--region", region,
            "--profile", profile
        ]);

        const attachPolicyOutput = await attachPolicyCommand.execute();
        const attachPolicyStderr = attachPolicyOutput.stderr?.toString() || '';

        if (attachPolicyOutput.code !== 0) {
            console.error(`Failed to attach policy to role with code ${attachPolicyOutput.code}`);
            console.error(`stderr: ${attachPolicyStderr}`);
            throw new Error(attachPolicyStderr);
        }
        // console.log('Policy attached.');

        // 3. Attach SSM policy to role

        const attachSsmPolicyCommand = new Command('aws-cli', [
            "iam",
            "put-role-policy",
            "--role-name", roleName,
            "--policy-name", "SSMServiceRolePolicy",
            "--policy-document", JSON.stringify(ssmInlinePolicy),
            "--region", region,
            "--profile", profile
        ]);

        const attachSsmPolicyOutput = await attachSsmPolicyCommand.execute();
        const attachSsmPolicyStderr = attachSsmPolicyOutput.stderr?.toString() || '';

        if (attachSsmPolicyOutput.code !== 0) {
            console.error(`Failed to attach SSM policy to role with code ${attachSsmPolicyOutput.code}`);
            console.error(`stderr: ${attachSsmPolicyStderr}`);
            throw new Error(attachSsmPolicyStderr);
        }

        // console.log('SSM Policy attached.');

        // 4. Attach CDK policy to role

        const attachCdkPolicyCommand = new Command('aws-cli', [
            "iam",
            "put-role-policy",
            "--role-name", roleName,
            "--policy-name", "CDKServiceRolePolicy",
            "--policy-document", JSON.stringify(cdkInlinePolicy),
            "--region", region,
            "--profile", profile
        ]);

        const attachCdkPolicyOutput = await attachCdkPolicyCommand.execute();
        const attachCdkPolicyStderr = attachCdkPolicyOutput.stderr?.toString() || '';

        if (attachCdkPolicyOutput.code !== 0) {
            console.error(`Failed to attach CDK policy to role with code ${attachCdkPolicyOutput.code}`);
            console.error(`stderr: ${attachCdkPolicyStderr}`);
            throw new Error(attachCdkPolicyStderr);
        }

        // console.log('CDK Policy attached.');

        // 5. Attach CDK Bootstrap policy to role

        const attachCdkBootstrapPolicyCommand = new Command('aws-cli', [
            "iam",
            "put-role-policy",
            "--role-name", roleName,
            "--policy-name", "CDKBootstrapServiceRolePolicy",
            "--policy-document", JSON.stringify(cdkBootstrapInlinePolicy),
            "--region", region,
            "--profile", profile
        ]);

        const attachCdkBootstrapPolicyOutput = await attachCdkBootstrapPolicyCommand.execute();
        const attachCdkBootstrapPolicyStderr = attachCdkBootstrapPolicyOutput.stderr?.toString() || '';

        if (attachCdkBootstrapPolicyOutput.code !== 0) {
            console.error(`Failed to attach CDK Bootstrap policy to role with code ${attachCdkBootstrapPolicyOutput.code}`);
            console.error(`stderr: ${attachCdkBootstrapPolicyStderr}`);
            throw new Error(attachCdkBootstrapPolicyStderr);
        }

        // console.log('CDK Bootstrap Policy attached.');

        return true;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}
