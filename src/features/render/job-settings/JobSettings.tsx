import { useLocation } from "react-router-dom"
import RenderJobFields from "./RenderJobFields"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod";
import { formRenderSchema } from "@/schemas/formRenderSchema";


interface JobSettingsProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
}


const JobSettings = ({ form }: JobSettingsProps) => {
    const currentPathname = useLocation().pathname

    return (
        <div>
            <div className="flex flex-col pb-6">
                <DataTableHeader
                    title="Job Settings"
                    description="Configure AWS Batch Container Job settings. Choose Blender version, and select the job queue."
                /> 
            </div>

            <div>
                <RenderJobFields
                    currentPathname={currentPathname}
                    form={form}
                />
            </div>
        </div>
    )
}

export default JobSettings