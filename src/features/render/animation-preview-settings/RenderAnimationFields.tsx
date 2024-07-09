import { useEffect } from "react"
import AnimationSelect from "./components/AnimationSelect"
import { Label } from "@/components/ui/label"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import TooltipInfo from "@/components/custom/tooltip/TooltipInfo"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formRenderSchema } from "@/schemas/formRenderSchema"

interface RenderAnimationFieldsProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
}

const RenderAnimationFields = ({ form }: RenderAnimationFieldsProps) => {

    const renderAnimationSelectField = (fieldName: string, label: string, options: { name: string, value: string }[], defaultValue: any) => {
        return (
            <AnimationSelect
                form={form}
                fieldName={fieldName}
                label={label}
                options={options}
                defaultValue={defaultValue}
            />
        )
    }

    useEffect(() => {
        form.setValue("ses.animation_preview.output_quality", "HIGH")
        form.setValue("ses.animation_preview.encoding_speed", "GOOD")
        form.setValue("ses.animation_preview.ffmpeg_format", "MPEG4")
        form.setValue("ses.animation_preview.autosplit", true)
    }, [])

    // 'MPEG1', 'MPEG2', 'MPEG4', 'AVI', 'QUICKTIME', 'DV', 'OGG', 'MKV', 'FLASH', 'WEBM' : ffmpeg formats


    const tooltips = [
        {
            fieldName: "ses.animation_preview.autosplit",
            title: "Auto Split",
            description: "Automatically splits the animation preview into multiple files if the output file size exceeds the maximum file size limit.",
            node: null
        },

    ]

    return (
        <div className="grid grid-cols-3 gap-2">
            {renderAnimationSelectField("ses.animation_preview.output_quality", "Output Quality", [
                { name: "Low", value: "LOW" },
                { name: "Medium", value: "MEDIUM" },
                { name: "High", value: "HIGH" },
            ], "MEDIUM")}

            {renderAnimationSelectField("ses.animation_preview.encoding_speed", "Encoding Speed", [
                { name: "Realtime", value: "REALTIME" },
                { name: "Good", value: "GOOD" },
                { name: "Best", value: "BEST" },
            ], "GOOD")}

            {renderAnimationSelectField("ses.animation_preview.ffmpeg_format", "FFmpeg Format", [
                { name: "MPEG4 (.mp4)", value: "MPEG4" },
                { name: "AVI (.avi)", value: "AVI" },
                { name: "Quicktime (.mov)", value: "QUICKTIME" },
                { name: "MKV (.mkv)", value: "MKV" },
            ], "MPEG4")}



            <FormField
                control={form.control}
                name={"ses.animation_preview.autosplit"}
                render={({ field }) => (
                    <FormItem className="flex justify-start h-full">
                        <FormControl>
                            <div className="flex gap-2 my-2">
                                <Checkbox
                                    type="button"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    defaultChecked={true}
                                />
                                <Label>
                                    Auto Split
                                </Label>
                                {
                                    tooltips.map((tooltip, index) => {
                                        if (tooltip.fieldName === "ses.animation_preview.autosplit") {
                                            return (
                                                <div key={index}>
                                                    <TooltipInfo
                                                        align="start"
                                                        title={tooltip.title}
                                                        description={tooltip.description}
                                                        footer={tooltip.node || null}
                                                    />
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    )
}

export default RenderAnimationFields