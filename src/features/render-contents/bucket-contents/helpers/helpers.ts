

export const convertSize = (size: number) => {
    const sizeInBytes = size
    const sizeInKb = sizeInBytes / 1024
    const sizeInMb = sizeInKb / 1024
    return sizeInMb || 0
}

export const getFileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};