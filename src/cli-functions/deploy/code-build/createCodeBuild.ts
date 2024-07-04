import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";
import { getUserAwsId } from "../../user/getUserAwsId";


export async function createCodeBuild(region: string, profile: string) {

    try {

        let awsAccountId = '';

        awsAccountId = await getUserAwsId(profile);

        console.log('AWS Account ID:', awsAccountId)

        if (!awsAccountId) {
            throw new Error(`No AWS Account ID found.`);
        }

        console.log('AWS Account ID:', awsAccountId)

        const createProjectCommand = new Command('aws-cli', [
            "codebuild",
            "create-project",
            "--name", deployConfig.codeBuild.projectName,
            "--source", `type=CODECOMMIT,location=https://git-codecommit.${region}.amazonaws.com/v1/repos/${deployConfig.codecommit.repositoryName}`,
            "--artifacts", `type=NO_ARTIFACTS`,
            "--environment", deployConfig.codeBuild.environment,
            // "--service-role", deployConfig.codeBuild.roleArn,
            "--service-role", `arn:aws:iam::${awsAccountId}:role/AWSCodeBuildServiceRole-${region}`,
            "--region", region,
            "--profile", profile,
            // buildspec path
        ]);

        const projectOutput = await createProjectCommand.execute();
        const projectStderr = projectOutput.stderr?.toString() || '';

        if (projectOutput.code !== 0) {
            console.error(`Failed to create project with code ${projectOutput.code}`);
            console.error(`stderr: ${projectStderr}`);
            throw new Error(projectStderr);
        }

        return true;

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        // return false;
        throw new Error(`${(error as Error).message}`);
    }
}