
export const getLastSegment = (path: string): string => {
    return path.split(/[/\\]/).pop() || '';
};

export const efsMainScriptPath = (values: any) => {
    const projectName = values.project_name;
    const folderPathPython = values.folder_path_python;
    const pythonScriptPath = values.python_script_path;

    // Función para obtener el último segmento de una ruta
    const getLastSegment = (path: string) => {
        return path.split(/[/\\]/).pop();
    };

    let finalPath = '';

    if (!folderPathPython) {
        // Si folder_path_python está vacío, usar solo el nombre del script
        const scriptName = getLastSegment(pythonScriptPath);
        finalPath = `/mnt/efs/projects/${projectName}/${scriptName}`;
    } else {
        // Si folder_path_python no está vacío, concatenar el folder principal y el script
        const folderName = getLastSegment(folderPathPython);

        // Remover la ruta local de pythonScriptPath
        const scriptRelativePathArray = pythonScriptPath.split(/[/\\]/);
        const folderNameIndex = scriptRelativePathArray.findIndex((segment: string | undefined) => segment === folderName);

        // Si encontramos el folderName en la ruta del script, tomar los segmentos siguientes
        const scriptRelativePath = folderNameIndex !== -1
            ? scriptRelativePathArray.slice(folderNameIndex + 1).join('/')
            : pythonScriptPath;

        finalPath = `/mnt/efs/projects/${projectName}/${folderName}/${scriptRelativePath}`;
    }

    return finalPath;
};


export const efsBlenderFilePath = (values: any) => {
    const projectName = values.project_name;
    //   const folderPathBlender = form.watch('folder_path');
    const folderPathBlender = values.folder_path;
    //   const filePath = form.watch('file_path');
    const filePath = values.file_path;
    const fileName = getLastSegment(filePath);
    const folderName = getLastSegment(folderPathBlender);

    let finalPath = '';

    if (!folderPathBlender) {
        finalPath = `/mnt/efs/projects/${projectName}/${fileName}`;
    } else {
        const fileRelativePathArray = filePath.split(/[/\\]/);
        const folderNameIndex = fileRelativePathArray.findIndex((segment: string) => segment === folderName);
        const fileRelativePath = folderNameIndex !== -1
            ? fileRelativePathArray.slice(folderNameIndex + 1).join('/')
            : filePath;
        finalPath = `/mnt/efs/projects/${projectName}/${folderName}/${fileRelativePath}`;
    }

    return finalPath;
};
