export interface CommandClose {
    code: number;
}

export function handleCommandClose(data: CommandClose) {
    if (data.code !== 0) {
        throw new Error(`Command failed with code ${data.code}`);
    }
}

export function handleCommandError(error: Error | string) {
    console.error(`Command error: "${error}"`);
    throw error;
}

export function cleanOutput(output: string): string {
    return output.replace(/[\r\n]+/g, '\n');
}

export function cleanOutputProfiles(output: string): string | undefined {
    if (!output.trim()) {
        return undefined;
    }
    return output.replace(/[\r\n]+/g, '\n');
}


export interface CommandOutput {
    stdout: string | null;
    stderr: string | null;
}