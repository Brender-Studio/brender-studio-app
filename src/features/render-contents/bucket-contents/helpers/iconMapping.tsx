import BlenderIcon from "@/components/custom/icons/BlenderIcon";
import { FileJson, Film, FolderArchive, Image } from "lucide-react";

export const iconMapping: { [key: string]: JSX.Element } = {
    'blend': <BlenderIcon />,
    'png': <Image size={18} />,
    'tif': <Image size={18} />,
    'jpeg': <Image size={18} />,
    'exr': <Image size={18} />,
    'jpg': <Image size={18} />,
    'cin': <Image size={18} />,
    'tiff': <Image size={18} />,
    'bmp': <Image size={18} />,
    'dpx': <Image size={18} />,
    'webp': <Image size={18} />,
    'jp2': <Image size={18} />,
    'zip': <FolderArchive size={18} />,
    'rar': <FolderArchive size={18} />,
    '7z': <FolderArchive size={18} />,
    'tar': <FolderArchive size={18} />,
    'gz': <FolderArchive size={18} />,
    'mp4': <Film size={18} />,
    'mov': <Film size={18} />,
    'avi': <Film size={18} />,
    'mkv': <Film size={18} />,
    'py': <FileJson size={18} />,
    // TODO: Add more file extensions
};