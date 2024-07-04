import { destroyCodeBuild } from "@/cli-functions/destroy-stack/destroyCodeBuildProject";
import { destroyCodeCommit } from "@/cli-functions/destroy-stack/destroyCodeCommit";
import { destroyStackFn } from "@/cli-functions/destroy-stack/destroyStackFn";
// import { deployConfig } from "@/cli-functions/deploy/deploy-config/deployConfig";
// import { deleteTemplate } from "@/cli-functions/ses-data/ses-deploy/deleteTemplate";

export async function destroyStackSequence({ stackName, region, profile }: { stackName: string; region: string; profile: string }): Promise<boolean> {
    try {
        // 1. Destroy the stack
        const destroyStack = await destroyStackFn(stackName, region, profile);
        if (!destroyStack) {
            throw new Error('Failed to destroy stack');
        }

        // 2. Destroy codecommit repository
        const destroyCodeCommitRepo = await destroyCodeCommit(region, profile);
        if (!destroyCodeCommitRepo) {
            throw new Error('Failed to destroy codecommit repository');
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
