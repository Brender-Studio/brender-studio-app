

export const convertSize = (size: string) => {
    const sizeInBytes = parseInt(size)
    const sizeInKb = sizeInBytes / 1024
    const sizeInMb = sizeInKb / 1024
    return sizeInMb || 0
}

export const getFileExtension = (filename: string) => {
    // console.log(filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2))
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};