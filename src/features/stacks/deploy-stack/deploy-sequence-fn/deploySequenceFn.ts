import { createCodeBuild } from "@/cli-functions/deploy/code-build/createCodeBuild";
import { createCodeBuildServiceRole } from "@/cli-functions/deploy/code-build/createCodeBuildRole";
import { createCodeCommit } from "@/cli-functions/deploy/code-commit/createCodeCommit";
import { getCodeBuild } from "@/cli-functions/deploy/code-build/getCodeBuild";
import { getCodeBuildRole } from "@/cli-functions/deploy/code-build/getCodeBuildRole";
import { getCodeCommit } from "@/cli-functions/deploy/code-commit/getCodeCommit";
import { uploadBuildspec } from "@/cli-functions/deploy/code-build/uploadBuildspec";
import { startBuild } from "@/cli-functions/deploy/start-build/startBuild";
import { PROGRESS_STEPS } from "@/constants/progress/progressConstants";
import { checkSesTemplate } from "@/cli-functions/ses-data/ses-deploy/checkSesTemplate";
import { deployConfig } from "@/cli-functions/deploy/deploy-config/deployConfig";
import { resolveResource } from "@tauri-apps/api/path";
import { uploadTemplate } from "@/cli-functions/ses-data/ses-deploy/uploadTemplate";
import { updateTemplate } from "@/cli-functions/ses-data/ses-deploy/updateTemplate";


interface DeploySequenceFnProps {
    formData: {
        stackName: string;
        region: string;
        profile: string;
        isPrivate: boolean;
        blenderVersions: string[];
        maxvCpus: {
            onDemandGPU: number;
            onDemandCPU: number;
            spotCPU: number;
            spotGPU: number;
        };
        spotBidPercentage: {
            spotCPU: number;
            spotGPU: number;
        };
    };
    progressCallback: (step: string) => void;
}

export async function deploySequenceFn({ formData, progressCallback }: DeploySequenceFnProps) {

    try {

        const blenderVersionsString = formData.blenderVersions.map(version => `${version}`).join(',');

        // Check if ses template exists, if not, create it or update it
        let sesRenderCompletedTemplateExists = false;

        const sesRenderOkTemplate = deployConfig.ses.renderCompletedTemplate;

        progressCallback(PROGRESS_STEPS.CHECKING_SES_TEMPLATES);
        try {
            console.log('Checking if sesRenderCompletedTemplate exists...');
            sesRenderCompletedTemplateExists = await checkSesTemplate(formData.region, formData.profile, sesRenderOkTemplate);
        } catch (error) {
            throw new Error('Error checking sesRenderCompletedTemplate');
        }

        // we need template name , json path template, region and profile
        const templateName = deployConfig.ses.renderCompletedTemplate
        console.log('Uploading template...', templateName)
        const jsonPathTemplate = await resolveResource("resources/ses-templates/render_completed.json");
        console.log('jsonPathTemplate:', jsonPathTemplate);


        if (!sesRenderCompletedTemplateExists) {
            // todo: create or update ses template
            console.log('sesRenderCompletedTemplate does not exist, creating it...');
            const res = await uploadTemplate(jsonPathTemplate, formData.region, formData.profile);
            console.log('Template uploaded:', res)
            progressCallback(PROGRESS_STEPS.CREATING_SES_TEMPLATE);
        } else {
            console.log('sesRenderCompletedTemplate exists, updating it...');
            const res = await updateTemplate(templateName, jsonPathTemplate, formData.region, formData.profile);
            console.log('Template updated:', res)
            progressCallback(PROGRESS_STEPS.CREATING_SES_TEMPLATE);
        }

        let sesRenderFailedTemplateExists = false;

        const sesRenderFailedTemplate = deployConfig.ses.renderFailedTemplate;
        
        try {
            console.log('Checking if sesRenderFailedTemplate exists...');
            sesRenderFailedTemplateExists = await checkSesTemplate(formData.region, formData.profile, sesRenderFailedTemplate);
        } catch (error) {
            throw new Error('Error checking sesRenderFailedTemplate');
        }


        const jsonPathFailedTemplate = await resolveResource("resources/ses-templates/render_failed.json");
        console.log('jsonPathFailedTemplate:', jsonPathFailedTemplate);

        if (!sesRenderFailedTemplateExists) {
            const res = await uploadTemplate(jsonPathFailedTemplate, formData.region, formData.profile);
            console.log('Template uploaded:', res)
            progressCallback(PROGRESS_STEPS.CREATING_SES_TEMPLATE);
        } else {
            const res = await updateTemplate(sesRenderFailedTemplate, jsonPathFailedTemplate, formData.region, formData.profile);
            console.log('Template updated:', res)
            progressCallback(PROGRESS_STEPS.CREATING_SES_TEMPLATE);
        }


        // 1. Check if Code Build Role exists, if not, execute createCodeBuildServiceRole(region) to create the Code Build Role in the region

        progressCallback(PROGRESS_STEPS.CHECKING_CODE_BUILD_ROLE);
        let codeBuildRoleExists = false;
        try {
            codeBuildRoleExists = await getCodeBuildRole(formData.region, formData.profile);
            console.log('Code Build Role exists:', codeBuildRoleExists);
        } catch (error) {
            console.error('Error checking Code Build Role:', error);
            // throw new Error(`${(error as Error)}`);
        }

        if (!codeBuildRoleExists) {
            try {
                progressCallback(PROGRESS_STEPS.CREATING_CODE_BUILD_ROLE);
                console.log('Creating Code Build Role...');
                await createCodeBuildServiceRole(formData.region, formData.profile);
                console.log('Code Build Role created');
            } catch (error) {
                console.error('Error creating Code Build Role:', error);
                throw new Error('Error creating Code Build Role');
            }
        } else {
            console.log('Code Build Role already exists');
            progressCallback(PROGRESS_STEPS.CREATING_CODE_BUILD_ROLE);
        }

        // 2. Check if Code Commit exists, if not, execute createCodeCommit(region) to create the Code Commit repository in the region

        progressCallback(PROGRESS_STEPS.CHECKING_CODE_COMMIT);
        let codeCommitExists = false;
        try {
            codeCommitExists = await getCodeCommit(formData.region, formData.profile);
            console.log('Code Commit exists:', codeCommitExists);
        } catch (error) {
            console.error('Error checking Code Commit:', error);
            // throw new Error(`${(error as Error).message}`);
        }

        if (!codeCommitExists) {
            try {
                progressCallback(PROGRESS_STEPS.CREATING_CODE_COMMIT);
                console.log('Creating Code Commit...');
                await createCodeCommit(formData.region, formData.profile);
                console.log('Code Commit created');
                progressCallback(PROGRESS_STEPS.UPLOADING_BUILDSPEC_YML);
                await uploadBuildspec(formData.region, formData.profile);
                console.log('Buildspec.yml uploaded');
            } catch (error) {
                console.error('Error creating Code Commit:', error);
                throw new Error(`${(error as Error).message}`);
            }
        } else {
            progressCallback(PROGRESS_STEPS.CREATING_CODE_COMMIT);
            progressCallback(PROGRESS_STEPS.UPLOADING_BUILDSPEC_YML);
            console.log('Code Commit already exists');
        }

        // 3. Check if Code Build Project exists, if not, execute createCodeBuild(region) to create the Code Build project in the region

        progressCallback(PROGRESS_STEPS.CHECKING_CODE_BUILD);
        let codeBuildExists = false;
        try {
            codeBuildExists = await getCodeBuild(formData.region, formData.profile);
            console.log('Code Build exists:', codeBuildExists);
        } catch (error) {
            console.error('Error checking Code Build:', error);
            throw new Error(`${(error as Error).message}`);
        }

        if (!codeBuildExists) {
            try {
                progressCallback(PROGRESS_STEPS.CREATING_CODE_BUILD);
                console.log('Creating Code Build...');
                await createCodeBuild(formData.region, formData.profile);
                console.log('Code Build created');
            } catch (error) {
                console.error('Error creating Code Build:', error);
                throw new Error(`${(error as Error).message}`);
            }
        } else {
            progressCallback(PROGRESS_STEPS.CREATING_CODE_BUILD);
            console.log('Code Build already exists');
        }

        // 4. Start the Code Build project

        console.log('Starting Code Build...');
        progressCallback(PROGRESS_STEPS.STARTING_CODE_BUILD);
        const startBuildTask = await startBuild(formData.region, formData.profile, formData.stackName, formData.isPrivate, blenderVersionsString, formData.maxvCpus, formData.spotBidPercentage);
        console.log('Code Build started:', startBuildTask);

        return { success: true, build: startBuildTask, stackName: formData.stackName };

    } catch (error) {
        console.error('Error during deploySequenceFn:', error);
        // return { success: false, error: (error as Error).message || error };
        throw new Error(`${(error as Error)}`);

    }
}
