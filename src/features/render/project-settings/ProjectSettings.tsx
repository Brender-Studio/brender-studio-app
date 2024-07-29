import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { useFormStore } from "@/store/useFormStore"
import { getBlenderData } from "./helpers/getBlenderData"
import DropzoneBlend from "./DropzoneBlend"
import { Input } from "@/components/ui/input"
import SelectEmails from "./components/SelectEmails"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { toast } from "@/components/ui/use-toast"
import PythonTabs from "../render-python/tabs/PythonTabs"
import TooltipInfo from "@/components/custom/tooltip/TooltipInfo"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formRenderSchema } from "@/schemas/formRenderSchema"


interface ProjectSettingsProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
}

const ProjectSettings = ({ form }: ProjectSettingsProps) => {
    const blenderExecPath = localStorage.getItem("blenderExecutablePath")
    const { selectedPaths, setSelectedPaths, setIsDataLoading, isDataLoading, setAllScenes, setCurrentScene } = useFormStore()
    const [errorBlenderData, setErrorBlenderData] = useState<string>("")

    useEffect(() => {
        if (selectedPaths.filePath) {
            // reset the scenes and current scene
            setAllScenes([])
            setCurrentScene({})
            setSelectedPaths({
                folderPath: selectedPaths.folderPath,
                filePath: selectedPaths.filePath
            })

            form.setValue('file_path', selectedPaths.filePath)

            getBlenderData({
                setIsDataLoading,
                blenderExecPath: blenderExecPath || "",
                selectedPaths,
                setAllScenes,
                // setCurrentScene,
                setErrorBlenderData
            })

            if (errorBlenderData) {
                toast({
                    title: "Error",
                    description: errorBlenderData,
                    variant: "destructive"
                })
                setAllScenes([])
                setCurrentScene({})
                setSelectedPaths({
                    folderPath: "",
                    filePath: ""
                })
                form.setValue('file_path', "")
                setErrorBlenderData("")
            }
        }
    }, [selectedPaths.filePath, errorBlenderData])


    return (
        <>
            <DataTableHeader
                title="Project Settings"
                description="Configure the project settings here, and select the folder or file path."
            />
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="project_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="inline-flex gap-2">
                                    Project Name
                                    <TooltipInfo
                                        title="Project Name"
                                        description="Enter the project name. This will be used to identify the project."
                                    />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Project Name" {...field} />
                                </FormControl>
                                {form.formState.errors.project_name && (
                                    <FormMessage />
                                )}
                            </FormItem>
                        )}
                    />

                    <SelectEmails form={form} />
                </div>

                <div>
                    <DropzoneBlend
                        form={form}
                        isDataLoading={isDataLoading}
                        setIsDataLoading={setIsDataLoading}
                    />
                </div>


                {
                    form.watch("type") === "custom_render_python" && (
                        <div className="col-span-2">
                            <PythonTabs
                                form={form}
                            />
                        </div>
                    )
                }
            </div>


        </>
    )
}

export default ProjectSettings