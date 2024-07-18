export function getLastSegmentOfFolderPath(folderPath: string) {
    // Split the path by directory separators (for Windows and Unix)
    const segments = folderPath.split(/[\\/]/);
    // Get the last segment of the path
    const lastSegment = segments[segments.length - 1];
    return lastSegment;
}

export const getLastSegmentOfFilePath  = (filePath: string) => {
    // Split the path by directory separators (for Windows and Unix)
    const segments = filePath.split(/[\\/]/);
    // Get the last segment of the path
    const lastSegment = segments[segments.length - 1];
    return lastSegment;
}

export function getSubPathFromFolderPath(folderPath: string, folderName: string, filePath: string) {
    // Normalize the paths to use forward slashes
    const normalizedFolderPath = folderPath.replace(/\\/g, '/');
    const normalizedFilePath = filePath.replace(/\\/g, '/');
    // Find the index of the folder name in the normalized folder path
    const folderIndex = normalizedFolderPath.indexOf(folderName);
    // Get the subpath by removing the folder name and the preceding directory separator
    const subPath = normalizedFilePath.substring(folderIndex + folderName.length + 1); // folderName.length + 1 to remove root folder
    // Delete the leading directory separator if present
    return subPath.startsWith('/') ? subPath.slice(1) : subPath;
}


