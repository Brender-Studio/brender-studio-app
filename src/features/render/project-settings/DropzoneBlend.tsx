import { BaseDirectory, readDir } from '@tauri-apps/api/fs';
import { CheckCircle, PlusCircle, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useFormStore } from "@/store/useFormStore";
import { getBlendFiles } from "./helpers/getBlendFiles";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileBlendSelect from "../render-inputs/select/FileBlendSelect";
import { listen } from "@tauri-apps/api/event";
import { isFileOrDirectory } from "@/features/render/project-settings/helpers/isFileOrDir";
import { FileDropEvent } from "./ProjectSettings.types";
import { useEffect } from "react";
import { openFileDialog, openFolderDialog } from "./helpers/fileDialog";
import { readDirectory } from './helpers/fileSystem';
import { useFiledropHover } from '@/hooks/useFiledropHover';
import { Switch } from '@/components/ui/switch';

interface DropzoneProps {
    form: any
    isDataLoading: boolean
    setIsDataLoading: (value: boolean) => void
}

const DIALOG_TYPES = {
    FOLDER: "folder",
    FILE: "file"
};

const DropzoneBlend = ({ form, isDataLoading, setIsDataLoading }: DropzoneProps) => {
    const { clearAllFormStates, blendSelectOptions, setBlendSelectOptions, setSelectedPaths, selectedPaths, isFolder, setIsFolder, fileName, setFileName } = useFormStore()
    const { isHovering } = useFiledropHover()

    const handleDialogResult = async (result: any, type: string) => {
        try {
            setIsDataLoading(true);

            if (!result) return;

            if (type === DIALOG_TYPES.FOLDER) {
                const directoryPath = Array.isArray(result) ? result[0] : result;
                const files = await readDirectory(directoryPath);
                const blendFiles = getBlendFiles(files);

                setBlendSelectOptions(blendFiles);
                form.setValue("folder_path", directoryPath);
                form.setValue("file_path", blendFiles[0].path);

                setSelectedPaths({ ...selectedPaths, folderPath: directoryPath, filePath: blendFiles[0].path });
            } else {
                form.setValue("file_path", Array.isArray(result) ? result[0] : result);
                const filePath = Array.isArray(result) ? result[0] : result;
                const fileName = filePath?.split(/(\\|\/)/g).pop();
                setFileName(fileName || "");
                setSelectedPaths({ ...selectedPaths, filePath: Array.isArray(result) ? result[0] : result });
            }
        } catch (error) {
            handleDialogError(error);
        } finally {
            setIsDataLoading(false);
        }
    };

    const handleDialogError = (error: any) => {
        console.error('Error while handling dialog:', error);
        toast({ title: "An error occurred", description: "Failed to handle dialog", variant: "destructive" });
    };

    const openDialog = async (type: string) => {
        try {
            const dialogResult = type === DIALOG_TYPES.FOLDER ? await openFolderDialog() : await openFileDialog();
            await handleDialogResult(dialogResult, type);
        } catch (error) {
            handleDialogError(error);
        }
    };

    const handleResetDropzone = () => {
        clearAllFormStates()
        form.setValue('file_path', "")
        form.setValue('folder_path', "")
        setFileName("")
    }

    useEffect(() => {
        const fileDropListener = async (event: FileDropEvent) => {
            try {
                setIsDataLoading(true);

                if (event.payload.length === 0) return;

                const fileObjects = await Promise.all(event.payload.map(filePath => isFileOrDirectory(filePath)));

                const firstFile = fileObjects[0];

                if (firstFile.type === DIALOG_TYPES.FILE) {
                    setIsFolder(false);
                    form.setValue("is_folder", false);
                    form.setValue("file_path", firstFile.path);
                    setFileName(firstFile.path?.split(/(\\|\/)/g).pop() || "");
                    setSelectedPaths({ ...selectedPaths, filePath: firstFile.path });
                } else {
                    setIsFolder(true);
                    form.setValue("is_folder", true);
                    form.setValue("folder_path", firstFile.path);
                    const files = await readDir(firstFile.path, { dir: BaseDirectory.App, recursive: true });
                    const blendFiles = getBlendFiles(files);
                    setBlendSelectOptions(blendFiles);
                    form.setValue("file_path", blendFiles[0].path);
                    setSelectedPaths({ ...selectedPaths, folderPath: firstFile.path, filePath: blendFiles[0].path });
                }
            } catch (error) {
                handleDialogError(error);
            } finally {
                setIsDataLoading(false);
            }
        };

        // BUG: Large files can cause the app to crash, open dialog logic works fine! 
        const dropListener = listen("tauri://file-drop", fileDropListener);

        return () => {
            dropListener.then(unsubscribe => unsubscribe());
        };

    }, [form, isDataLoading, setIsDataLoading, setIsFolder, setFileName, setSelectedPaths, selectedPaths]);




    return (
        <div className="w-full relative">
            <FormField
                control={form.control}
                name="is_folder"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="flex justify-between items-center">
                                <div className="absolute top-0 right-0 flex items-center gap-2">
                                    <p className="text-xs text-muted-foreground">Folder</p>
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        onCheckedChange={
                                            (checked: boolean) => {
                                                field.onChange(checked)
                                                setIsFolder(checked)
                                                form.setValue("folder_path", "")
                                                form.setValue("file_path", "")
                                                clearAllFormStates()
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {
                isFolder ? (
                    <div>
                        <FormField
                            control={form.control}
                            name="folder_path"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Blender Project Folder Path</FormLabel>
                                    <FormControl>
                                        <div className="w-full">
                                            <Card className={`hover:bg-accent ${isDataLoading ? 'bg-accent animate-pulse' : ''} relative flex justify-center items-center p-4 h-40 border-dashed border-2 ${isHovering ? 'bg-accent ' : 'cursor-pointer'}`} onClick={() => openDialog("folder")}>
                                                {
                                                    selectedPaths.folderPath && (
                                                        <Button size='icon' variant='rounded' className="absolute top-3 right-3"
                                                            type="button"
                                                            onClick={handleResetDropzone}
                                                            disabled={isDataLoading || !selectedPaths.folderPath}
                                                        >
                                                            <X size={18} className="mx-auto my-2" />
                                                        </Button>
                                                    )
                                                }
                                                <div className="text-center">
                                                    {selectedPaths.folderPath ? <CheckCircle size={30} className="mx-auto my-2" /> : <PlusCircle size={30} className="mx-auto my-2" />}
                                                    <p className="text-sm font-semibold">
                                                        {selectedPaths.folderPath || "Select a folder"}
                                                    </p>
                                                    {!selectedPaths.folderPath && <p className="text-xs text-muted-foreground">Select a folder with Blender files to configure the project settings</p>}
                                                </div>
                                            </Card>
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-xs truncate">
                                        {selectedPaths.folderPath ? selectedPaths.folderPath : "Folder path for the Blender project Job"}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {blendSelectOptions && blendSelectOptions.length > 0 && (
                            <div className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="file_path"
                                    render={() => (
                                        <FormItem >
                                            <FormControl>
                                                <FileBlendSelect
                                                    fieldName="file_path"
                                                    form={form}
                                                    options={blendSelectOptions}
                                                    label="File Path"
                                                    isCustom={true}
                                                    setSelectedPaths={setSelectedPaths}
                                                    selectedPaths={selectedPaths}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs truncate">
                                                {selectedPaths.filePath ? selectedPaths.filePath : "File path Blender file (.blend)"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <FormField
                            control={form.control}
                            name="file_path"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Blender Project File Path</FormLabel>
                                    <FormControl>
                                        <div className="w-full">
                                            <Card className={`hover:bg-accent ${isDataLoading ? 'bg-accent animate-pulse' : ''} relative flex justify-center items-center p-4 h-40 border-dashed border-2 ${isHovering ? 'bg-accent' : 'cursor-pointer'}`} onClick={() => openDialog("file")}>
                                                {
                                                    selectedPaths.filePath && (
                                                        <Button size='icon' variant='rounded' className="absolute top-3 right-3"
                                                            type="button"
                                                            onClick={handleResetDropzone}
                                                            disabled={isDataLoading || !selectedPaths.filePath}
                                                        >
                                                            <X size={18} className="mx-auto my-2" />
                                                        </Button>
                                                    )
                                                }
                                                <div className="text-center">
                                                    {selectedPaths.filePath ? <CheckCircle size={30} className="mx-auto my-2" /> : <PlusCircle size={30} className="mx-auto my-2" />}
                                                    <p className="text-sm font-semibold">
                                                        {fileName || "Select a Blender file"}
                                                    </p>
                                                    {!selectedPaths.filePath && <p className="text-xs text-muted-foreground">Select a Blender file (.blend) to configure the project settings</p>}
                                                </div>
                                            </Card>
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        {selectedPaths.filePath ? selectedPaths.filePath : "File path for the Blender project Job"}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default DropzoneBlend;
