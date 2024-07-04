export function getLastSegmentOfFolderPath(folderPath: string) {
    // Separar la ruta por los separadores de directorio (para Windows y Unix)
    const segments = folderPath.split(/[\\/]/);
    // Obtener el último segmento de la ruta
    const lastSegment = segments[segments.length - 1];
    return lastSegment;
}

export const getLastSegmentOfFilePath  = (filePath: string) => {
    // Separar la ruta por los separadores de directorio (para Windows y Unix)
    const segments = filePath.split(/[\\/]/);
    // Obtener el último segmento de la ruta
    const lastSegment = segments[segments.length - 1];
    return lastSegment;
}

// export function getSubPathFromFolderPath(filePath: string, folderName: string) {
//     // Reemplazar todas las barras invertidas ("\") por barras inclinadas hacia adelante ("/")
//     const normalizedFilePath = filePath.replace(/\\/g, '/');
//     // Eliminar la parte de la ruta que precede a la carpeta
//     const subPath = normalizedFilePath.split(folderName)[1];
//     // Eliminar el separador inicial, si existe
//     return subPath.startsWith('/') ? subPath.slice(1) : subPath;
// }

export function getSubPathFromFolderPath(folderPath: string, folderName: string, filePath: string) {
    // Normalizar la ruta
    const normalizedFolderPath = folderPath.replace(/\\/g, '/');
    const normalizedFilePath = filePath.replace(/\\/g, '/');
    // Encontrar la posición de la carpeta
    const folderIndex = normalizedFolderPath.indexOf(folderName);
    // Obtener la subruta completa desde la carpeta principal
    const subPath = normalizedFilePath.substring(folderIndex + folderName.length + 1); // folderName.length + 1 para eliminar el directorio raíz
    // Eliminar el separador inicial, si existe
    return subPath.startsWith('/') ? subPath.slice(1) : subPath;
}


