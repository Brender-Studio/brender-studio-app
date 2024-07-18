import { formRenderSchema } from "@/schemas/formRenderSchema";
import { z } from "zod";

export const getLastSegment = (path: string): string => {
    return path.split(/[/\\]/).pop() || '';
};

export const efsMainScriptPath = (values: z.infer<typeof formRenderSchema>) => {
    const projectName = values.project_name;
    const folderPathPython = values.folder_path_python;
    const pythonScriptPath = values.python_script_path;


    const getLastSegment = (path: string) => {
        return path.split(/[/\\]/).pop();
    };

    let finalPath = '';

    if (!folderPathPython) {
        // If folder_path_python is empty, take the project name and the script name
        const scriptName = pythonScriptPath ? getLastSegment(pythonScriptPath) : '';
        finalPath = `/mnt/efs/projects/${projectName}/${scriptName}`;
    } else {
        // If folder_path_python is not empty, take the project name, the folder name and the script name
        const folderName = getLastSegment(folderPathPython);

        // Remove the project name from the path
        const scriptRelativePathArray = pythonScriptPath?.split(/[/\\]/) ?? [];
        const folderNameIndex = scriptRelativePathArray.findIndex((segment: string | undefined) => segment === folderName);

        // If the folder name is found, take the path from the folder name to the end
        const scriptRelativePath = folderNameIndex !== -1
            ? scriptRelativePathArray.slice(folderNameIndex + 1).join('/')
            : pythonScriptPath;

        finalPath = `/mnt/efs/projects/${projectName}/${folderName}/${scriptRelativePath}`;
    }

    return finalPath;
};


export const efsBlenderFilePath = (values: z.infer<typeof formRenderSchema>) => {
    const projectName = values.project_name;
    const folderPathBlender = values.folder_path;

    const filePath = values.file_path;
    const fileName = getLastSegment(filePath ?? '');
    const folderName = getLastSegment(folderPathBlender ?? '');

    let finalPath = '';

    if (!folderPathBlender) {
        finalPath = `/mnt/efs/projects/${projectName}/${fileName}`;
    } else {
        const fileRelativePathArray = filePath?.split(/[/\\]/) ?? [];
        const folderNameIndex = fileRelativePathArray.findIndex((segment: string) => segment === folderName);
        const fileRelativePath = folderNameIndex !== -1
            ? fileRelativePathArray.slice(folderNameIndex + 1).join('/')
            : filePath;
        finalPath = `/mnt/efs/projects/${projectName}/${folderName}/${fileRelativePath}`;
    }

    return finalPath;
};
