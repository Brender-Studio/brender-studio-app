import { Card } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useFormStore } from "@/store/useFormStore"
import { FileJson, Folder } from "lucide-react"
import { openFileDialog, openFolderDialog } from "./helpers/openDialogByType"
import { readDirectory } from "@/features/render/project-settings/helpers/fileSystem"
import { getPythonScripts } from "./helpers/getPythonScripts"
import FileScriptSelect from "./components/FileScriptSelect"
import { toast } from "@/components/ui/use-toast"
import { useEffect } from "react"

interface DropzonePythonScriptProps {
  form: any
}

const DIALOG_TYPES = {
  FOLDER: "folder",
  FILE: "file"
};


const DropzonePythonScript = ({ form }: DropzonePythonScriptProps) => {
  const { pythonSelectOptions, setPythonSelectOptions, setIsFolderPython, selectedPathsPython, setSelectedPathsPython } = useFormStore()

  const handleDialogResult = async (result: any, type: string) => {
    try {

      if (!result) return;

      if (type === DIALOG_TYPES.FOLDER) {
        const directoryPath = Array.isArray(result) ? result[0] : result;
        const files = await readDirectory(directoryPath);
        const pythonScripts = getPythonScripts(files);
        console.log("Python scripts: ", pythonScripts);

        console.log("Folder path: ", directoryPath);
        console.log("Files: ", files);

        form.setValue("folder_path_python", directoryPath);

        // set form first script file path
        if (files.length && pythonScripts.length) {
          form.setValue("python_script_path", pythonScripts[0].path);
          setPythonSelectOptions(pythonScripts)
          setSelectedPathsPython({
            ...selectedPathsPython,
            folderPath: directoryPath,
            filePath: pythonScripts[0].path 
          });
        } else {
          form.setValue("python_script_path", "");
          toast({
            title: "No Python scripts found",
            description: "The selected folder does not contain any Python scripts",
            variant: "destructive"
          })
        }

      } else {
        console.log("File path: ", result);
        form.setValue("python_script_path", result);
        // TODO: REVIEW THIS
        const filePath = Array.isArray(result) ? result[0] : result;
        const fileName = filePath?.split(/(\\|\/)/g).pop();
        console.log("File name: ", fileName);
        setSelectedPathsPython({ ...selectedPathsPython, filePath: Array.isArray(result) ? result[0] : result  })

      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Dialog closed")
    }
  };


  const openDialog = async (type: string) => {
    try {
      const dialogResult = type === DIALOG_TYPES.FOLDER ? await openFolderDialog() : await openFileDialog();
      await handleDialogResult(dialogResult, type);
    } catch (error) {
      console.error(error);
    }
  };

  const getFileNameFromPath = (path: string) => {
    if (!path) return "";
    return path.split(/[/\\]/).pop();
  };

  const getFolderNameFromPath = (path: string) => {
    if (!path) return "";
    return path.split(/[/\\]/).pop();
  }

  useEffect(() => {
    if (form.watch("is_folder_python")) {
      form.setValue("folder_path_python", "")
      form.setValue("python_script_path", "")
    } else {
      form.setValue("folder_path_python", "")
      form.setValue("python_script_path", "")
    }
  }, [form.watch("is_folder_python")])

  return (
    <>
      <div >
        <div className="flex justify-between items-center mb-3">
          <Label>
            {form.watch("is_folder_python") ? "Folder" : "Python script"}
          </Label>
          <FormField
            control={form.control}
            name="is_folder_python"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">Folder</p>
                    <Switch
                      {...field}
                      checked={field.value}
                      onCheckedChange={
                        (checked: boolean) => {
                          field.onChange(checked)
                          setIsFolderPython(checked)
                          form.setValue("folder_path_python", "")
                          form.setValue("python_script_path", "")
                        }
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div >
          {
            form.watch("is_folder_python") ? (
              <>
                <Card
                  onClick={() => openDialog(DIALOG_TYPES.FOLDER)}
                  className="hover:cursor-pointer min-h-60 hover:bg-accent text-muted-foreground p-6 flex flex-col text-center justify-center items-center gap-2">
                  <Folder size={32} />
                  <p className="text-xs text-muted-foreground">
                    {form.watch("folder_path_python") ? getFolderNameFromPath(form.watch("folder_path_python")) : "Choose a folder with Python scripts"}
                  </p>
                </Card >
                {form.watch("folder_path_python") && (
                  <p className="text-xs mt-2 text-muted-foreground">
                    Folder path: {form.watch("folder_path_python")}
                  </p>
                )}
                {/* // debemos mostrar condicionalmente un componente select si hay archivos python en la carpeta */}
                {form.watch("folder_path_python") && form.watch("python_script_path") && (
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="file_path"
                      render={() => (
                        <FormItem >
                          <FormControl>
                            <FileScriptSelect
                              fieldName="python_script_path"
                              form={form}
                              options={pythonSelectOptions}
                              label="Entry point script file"
                              setSelectedPaths={setSelectedPathsPython}
                              selectedPaths={selectedPathsPython}
                            />
                          </FormControl>
                          <FormDescription className="text-xs truncate">
                            {form.watch("python_script_path") || "No file selected"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </>

            ) : (
              <>
                <Card
                  onClick={() => openDialog(DIALOG_TYPES.FILE)}
                  className="hover:cursor-pointer min-h-60 hover:bg-accent  text-muted-foreground p-6 flex flex-col text-center justify-center items-center gap-2">
                  <FileJson size={32} />
                  <p className="text-xs text-muted-foreground">
                    {/* colocar nombre del script python si existe en el form */}
                    {form.watch("python_script_path") ? getFileNameFromPath(form.watch("python_script_path")) : "No file selected"}
                  </p>
                </Card >
                {form.watch("python_script_path") && (
                  <p className="text-xs mt-2 text-muted-foreground">
                    Python script path: {form.watch("python_script_path") || "No script file selected"}
                  </p>
                )}
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default DropzonePythonScript