import { Command } from "@tauri-apps/api/shell";
import { deployConfig } from "../deploy-config/deployConfig";

export async function getCodeBuild(region: string, profile: string) {
  try {
    const getProjectCommand = new Command('aws-cli', [
      "codebuild",
      "batch-get-projects",
      "--names", deployConfig.codeBuild.projectName,
      "--region", region,
      "--profile", profile
    ]);

    const projectOutput = await getProjectCommand.execute();

    console.log('Project Output:', projectOutput);
    const projectStderr = projectOutput.stderr?.toString() || '';

    if (projectOutput.code !== 0) {
      console.error(`Failed to get project with code ${projectOutput.code}`);
      console.error(`stderr: ${projectStderr}`);
      throw new Error(projectStderr);
    }

    const parsedOutput = JSON.parse(projectOutput.stdout || '{}');
    const projectsNotFound = parsedOutput.projectsNotFound || [];

    if (projectsNotFound.length > 0) {
      console.log(`Project '${deployConfig.codeBuild.projectName}' not found in CodeBuild.`);
      return false;
    }

    // The project was found
    return true;

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw new Error(`${(error as Error).message}`);
  }
}
