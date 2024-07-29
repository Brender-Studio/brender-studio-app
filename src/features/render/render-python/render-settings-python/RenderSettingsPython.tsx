import { useFormStore } from "@/store/useFormStore"
import { sectionType } from "../../render-settings/RenderSettings.types"
import { useEffect } from "react"
import FormFieldSkeleton from "@/components/custom/skeletons/FormFieldSkeleton"
import RenderFormFields from "../../render-settings/RenderFormFields"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formRenderSchema } from "@/schemas/formRenderSchema"

interface RenderSettingsPythonProps {
    sectionType: sectionType
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
}

const RenderSettingsPython = ({ form, sectionType }: RenderSettingsPythonProps) => {
    const { currentScene, isDataLoading } = useFormStore()


    useEffect(() => {
        form.setValue('type', sectionType)
    }, [sectionType])

    return (
        <div>
            {
                isDataLoading ? (
                    <div className="w-full flex justify-center py-4">
                        <FormFieldSkeleton />
                    </div>
                ) : (
                    Object.keys(currentScene).length === 0 ? (
                        <div className="w-full flex justify-center h-40 items-center">
                            <p className="text-xs text-muted-foreground">Please select .blend file to enable this section.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <DataTableHeader
                                title="Preview Scene Data"
                                description="Preview the scene data for the selected .blend file. In Python section, you can't customize the scene data, you must do it with Python script."
                            />
                            <RenderFormFields
                                form={form}
                                sectionType={sectionType}
                            />
                        </div>
                    )
                )
            }
        </div>
    )
}

export default RenderSettingsPython