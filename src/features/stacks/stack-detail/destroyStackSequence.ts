import { destroyCodeBuild } from "@/cli-functions/destroy-stack/destroyCodeBuildProject";
import { destroyS3Codebuild } from "@/cli-functions/destroy-stack/destroyS3Codebuild";
import { destroyStackFn } from "@/cli-functions/destroy-stack/destroyStackFn";

export async function destroyStackSequence({ stackName, region, profile }: { stackName: string; region: string; profile: string }): Promise<boolean> {
    try {
        // 1. Destroy the stack
        const destroyStack = await destroyStackFn(stackName, region, profile);
        if (!destroyStack) {
            throw new Error('Failed to destroy stack');
        }

        // 2. Destroy all s3 buckets starting with brender-codebuild-

        const destroyS3Builds = await destroyS3Codebuild(region, profile);
        console.log('destroyS3Builds:', destroyS3Builds);
        if (!destroyS3Builds) {
            throw new Error('Failed to destroy s3 buckets');
        }

        // 3. Destroy codebuild project
        const destroyCodeBuildProject = await destroyCodeBuild(region, profile);
        if (!destroyCodeBuildProject) {
            throw new Error('Failed to destroy codebuild project');
        } else {
            // remove stack from local storage if it's the current stack in use
            const currentStack = localStorage.getItem('aws-stack');
            if (currentStack === stackName) {
                localStorage.removeItem('aws-stack');
            }
        }

        // Remove ses template
        // const deleteTemplateSes = await deleteTemplate(deployConfig.ses.renderCompletedTemplate, region, profile);
        // if (!deleteTemplateSes) {
        //     throw new Error('Failed to delete ses template');
        // }

        return true;
    } catch (error) {
        console.error('Error during stack destruction:', error);
        return false;
    }
}
