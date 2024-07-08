import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import RenderFormFields from "./RenderFormFields"
import { useFormStore } from "@/store/useFormStore"
import { sectionType } from "./RenderSettings.types"
import { useEffect } from "react"
import DataTableHeader from "@/components/custom/structure/DataTableHeader"
import FormFieldSkeleton from "@/components/custom/skeletons/FormFieldSkeleton"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formRenderSchema } from "@/schemas/formRenderSchema"


interface RenderSettingsProps {
    sectionType: sectionType
    form: UseFormReturn<z.infer<typeof formRenderSchema>>
}

const RenderSettings = ({ form, sectionType }: RenderSettingsProps) => {
    const { setIsCustom, isCustom, currentScene, isDataLoading } = useFormStore()

    useEffect(() => {
        // set form value type (sectionType)
        console.log('changing type to', sectionType)
        form.setValue('type', sectionType)
    }, [sectionType])



    return (
        <>
            <FormField
                control={form.control}
                name="is_custom"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="flex justify-between items-center pb-6">
                                <DataTableHeader
                                    title="Render Settings"
                                    description="Configure Blender scene settings here."
                                />
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-muted-foreground">Customize</p>
                                    <Switch
                                        // {...field}
                                        // checked={field.value}
                                        disabled={Object.keys(currentScene).length === 0}
                                        checked={isCustom}
                                        onCheckedChange={(checked: boolean) => {
                                            field.onChange(checked);
                                            setIsCustom(checked);
                                            form.setValue('is_custom', checked);
                                        }}
                                    />
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* if data loading show loading skeleton, else show component */}
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
                        <RenderFormFields
                            form={form}
                            sectionType={sectionType}
                        />
                    )
                )
            }
        </>
    )
}

export default RenderSettings