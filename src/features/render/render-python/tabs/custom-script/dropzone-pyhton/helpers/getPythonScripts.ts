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

export const getPythonScripts = (files: any[]): any[] => {
    let pythonFiles = [];
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
