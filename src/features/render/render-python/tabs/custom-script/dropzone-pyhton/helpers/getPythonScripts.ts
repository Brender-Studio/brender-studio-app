// export const getPythonScripts = (files: any[]): any[] => {
//     let pythonFiles = [];
//     for (const file of files) {
//         if (file.name.endsWith('.py')) {
//             pythonFiles.push(file);
//         }
//         if (file.children) {
//             pythonFiles = pythonFiles.concat(getPythonScripts(file.children));
//         }
//     }
//     return pythonFiles;
// };

export interface File {
    name: string;
    path: string;
    children?: File[];
}

export const getPythonScripts = (files: File[]): File[] => {
    let pythonFiles: File[] = [];
    for (const file of files) {
        if (file.name.endsWith('.py')) {
            pythonFiles.push(file);
        }
        if (file.children) {
            pythonFiles = pythonFiles.concat(getPythonScripts(file.children));
        }
    }
    return pythonFiles;
};
