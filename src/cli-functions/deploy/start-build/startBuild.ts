import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";
import { getCliCreds } from "../../user/getCliCreds";
import { getUserAwsId } from "../../user/getUserAwsId";

interface MaxvCpus {
    onDemandGPU: number;
    onDemandCPU: number;
    spotCPU: number;
    spotGPU: number;
}

interface SpotBidPercentage {
    spotCPU: number;
    spotGPU: number;
}

interface StartBuildResult {
    success: boolean;
    build: string;
    stackName: string;
}


export async function startBuild(
    region: string,
    profile: string,
    stackName: string,
    isPrivate: boolean,
    blenderVersions: string,
    maxvCpus: MaxvCpus,
    spotBidPercentage: SpotBidPercentage
): Promise<StartBuildResult> {

    // console.log('Region:', region);
    // console.log('Profile:', profile);
    // console.log('Stack name:', stackName);
    // console.log('Has NAT Gateway:', isPrivate);
    // console.log('Blender versions:', blenderVersions);
    // console.log('Max vCPUs:', maxvCpus);
    // console.log('Spot bid percentage:', spotBidPercentage);

    // Encapsulate blenderVersios into a string with the format "3.6.0,4.0.0,5.0.0"

    blenderVersions.toString();

    const projectBuildName = deployConfig.codeBuild.projectName;

    // console.log('Project build name:', projectBuildName);

    const awsCliCredentials = await getCliCreds(profile);

    if (!awsCliCredentials || typeof awsCliCredentials === 'string') {
        throw new Error(`No AWS CLI credentials found for profile ${profile}`);
    }

    const awsAccountId = await getUserAwsId(profile);
    // console.log('AWS Account ID:', awsAccountId)

    const cdkAction = 'deploy';

    try {

        const startBuildCommand = new Command('aws-cli', [
            "codebuild",
            "start-build",
            "--project-name", projectBuildName,
            "--region", region,
            "--profile", profile,
            "--environment-variables-override",
            `name=AWS_DEFAULT_REGION,value=${region},type=PLAINTEXT`,
            `name=AWS_ACCOUNT_ID,value=${awsAccountId},type=PLAINTEXT`,
            `name=STACK_NAME,value=${stackName},type=PLAINTEXT`,
            `name=IS_PRIVATE,value="${isPrivate}",type=PLAINTEXT`,
            `name=BLENDER_VERSIONS,value="${blenderVersions}",type=PLAINTEXT`,
            `name=CDK_ACTION,value=${cdkAction},type=PLAINTEXT`,
            `name=MAX_VCPUS,value='${JSON.stringify(maxvCpus)}',type=PLAINTEXT`,
            `name=SPOT_BID_PERCENTAGE,value='${JSON.stringify(spotBidPercentage)}',type=PLAINTEXT`
        ]);

        // console.log('Start build command:', startBuildCommand)

        const startBuildOutput = await startBuildCommand.execute();

        // console.log('Start build output:', startBuildOutput)

        const startBuildStderr = startBuildOutput.stderr?.toString() || '';

        if (startBuildOutput.code !== 0) {
            console.error(`Failed to start build with code ${startBuildOutput.code}`);
            console.error(`stderr: ${startBuildStderr}`);
            throw new Error(startBuildStderr);
        }

        // Return true & build object
        return {
            success: true,
            build: startBuildOutput.stdout?.toString() || '',
            stackName: stackName
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw new Error(`${(error as Error).message}`);
    }
}