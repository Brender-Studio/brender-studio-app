import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";

export async function getCodeBuildIds(region: string, profile: string) {
  try {
    const getProjectCommand = new Command('aws-cli', [
      "codebuild",
      "list-builds-for-project",
      "--project-name", 
      deployConfig.codeBuild.projectName,
      "--region", region,
      "--profile", profile
    ]);
     
    const projectOutput = await getProjectCommand.execute();

    // console.log('Project Output:', projectOutput);

    // const projectStderr = projectOutput.stderr?.toString() || '';

    // if (projectOutput.code !== 0) {
    //   // console.error(`Failed to get project with code ${projectOutput.code}`);
    //   // console.error(`stderr: ${projectStderr}`);
    //   throw new Error(projectStderr);
    // }

    const parsedOutput = JSON.parse(projectOutput.stdout || '{}');

    const ids = parsedOutput.ids || [];

    if (ids.length === 0) {
      console.log(`No builds found in CodeBuild.`);
      return false;
    }

    // The project was found
    return ids || [];

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    return false;
  }
}
