export const getBlendFiles = (files: any[]): any[] => {
    let blendFiles = [];
    for (const file of files) {
        if (file.name.endsWith('.blend')) {
            blendFiles.push(file);
        }
        if (file.children) {
            blendFiles = blendFiles.concat(getBlendFiles(file.children));
        }
    }
    return blendFiles;
};