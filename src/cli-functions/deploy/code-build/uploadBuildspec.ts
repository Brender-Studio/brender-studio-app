import { readTextFile } from "@tauri-apps/api/fs";
import { deployConfig } from "../deploy-config/deployConfig";
import { resolveResource } from '@tauri-apps/api/path';
import { Command } from "@tauri-apps/api/shell";

export async function uploadBuildspec(region: string, profile: string) {

    const repoName = deployConfig.codecommit.repositoryName;
    const branchName = deployConfig.codecommit.branchName;

    const buildspecPath = await resolveResource("resources/deploy/buildspec.yml");

    // TESTING BUILD SPEC
    // const testingBuildspecPath = await resolveResource("resources/deploy/buildspec-testing.yml");
    // const buildspecPath = await resolveResource("resources/deploy/buildspec-test-refactor-anim.yml");
    // const buildspecPath = await resolveResource("resources/deploy/buildspec-test-custom-python.yml");
    // const buildspecPath = await resolveResource("resources/deploy/buildspec-test-ecr-repo.yml");
    // const buildspecPath = await resolveResource("resources/deploy/buildspec-test-refactor-maxvcpus.yml");
    // const buildspecPath = await resolveResource("resources/deploy/buildspec-test-python-path.yml");
    // const buildspecPath = await resolveResource("resources/deploy/buildspec-test-g6.yml");
    // const buildspecPath = await resolveResource("resources/deploy/buildspec-ses-refactor.yml");


    const buildspecContent = await readTextFile(buildspecPath);
    console.log('Buildspec content:', buildspecContent);
 
    const base64Buildspec = btoa(buildspecContent);
    console.log('Base64 buildspec:', base64Buildspec);

    try {

        const uploadBuildspecCommand = new Command('aws-cli', [
            "codecommit",
            "put-file",
            "--repository-name", repoName,
            "--branch-name", branchName,
            "--file-content", base64Buildspec,
            "--file-path", "buildspec.yml",
            "--region", region,
            "--profile", profile
        ]);

        const uploadOutput = await uploadBuildspecCommand.execute();

        // get commit id from output
        // Parse JSON to extract commit ID
        const uploadOutputJson = JSON.parse(uploadOutput.stdout?.toString() || '{}');
        const codeCommitCommitId = uploadOutputJson.commitId;

        console.log('Code Commit commit ID:', codeCommitCommitId);

        console.log('Upload output:', uploadOutput)

        const uploadStderr = uploadOutput.stderr?.toString() || '';

        if (uploadOutput.code !== 0) {
            console.error(`Failed to upload buildspec with code ${uploadOutput.code}`);
            console.error(`stderr: ${uploadStderr}`);
            throw new Error(uploadStderr);
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