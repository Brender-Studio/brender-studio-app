interface BlendFile {
    name: string;
    path: string;
}

export interface FileStructure {
    name: string;
    path: string;
    children?: FileStructure[];
}

export const getBlendFiles = (files: FileStructure[]): BlendFile[] => {
    let blendFiles: BlendFile[] = [];
    
    for (const file of files) {
        if (file.name.endsWith('.blend')) {
            blendFiles.push({ name: file.name, path: file.path });
        }
        if (file.children) {
            blendFiles = blendFiles.concat(getBlendFiles(file.children));
        }
    }
    
    return blendFiles;
};