export function handleCommandClose(data: any) {
    if (data.code !== 0) {
        throw new Error(`Command failed with code ${data.code}`);
    }
}

export function handleCommandError(error: any) {
    console.error(`Command error: "${error}"`);
    throw error;
}

export function cleanOutput(output: string): string {
    return output.replace(/[\r\n]+/g, '\n');
}

export function cleanOutputProfiles(output: string): string | undefined {
    if (!output.trim()) {
        return undefined; // Retornar undefined si la salida está vacía
    }
    return output.replace(/[\r\n]+/g, '\n');
}