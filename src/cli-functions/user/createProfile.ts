import { Command } from "@tauri-apps/api/shell";


export async function createProfile(profileName: string, accessKey: string, secretKey: string) {
    try {
        // 1. Create the profile
        const createProfileCommand = new Command('aws-cli', [
            "configure",
            "set",
            "aws_access_key_id",
            accessKey,
            "--profile", profileName
        ]);
        console.log('Create profile command:', createProfileCommand);

        const createProfileOutput = await createProfileCommand.execute();
        console.log('Create profile output:', createProfileOutput);
        const createProfileStderr = createProfileOutput.stderr?.toString() || '';

        if (createProfileOutput.code !== 0) {
            console.error(`Failed to create profile with code ${createProfileOutput.code}`);
            console.error(`stderr: ${createProfileStderr}`);
            throw new Error(createProfileStderr);
        }

        // 2. Set the secret key
        const setSecretKeyCommand = new Command('aws-cli', [
            "configure",
            "set",
            "aws_secret_access_key",
            secretKey,
            "--profile", profileName
        ]);
        console.log('Set secret key command:', setSecretKeyCommand);

        const setSecretKeyOutput = await setSecretKeyCommand.execute();
        console.log('Set secret key output:', setSecretKeyOutput);
        const setSecretKeyStderr = setSecretKeyOutput.stderr?.toString() || '';

        if (setSecretKeyOutput.code !== 0) {
            console.error(`Failed to set secret key with code ${setSecretKeyOutput.code}`);
            console.error(`stderr: ${setSecretKeyStderr}`);
            throw new Error(setSecretKeyStderr);
        }

        return true;

    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return false;
    }
}