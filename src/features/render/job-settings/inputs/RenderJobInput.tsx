import TooltipInfo from "@/components/custom/tooltip/TooltipInfo"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UseFormReturn } from "react-hook-form";
import { FormRenderSchemaKeys } from "./RenderJobSelect";
import { z } from "zod";
import { formRenderSchema } from "@/schemas/formRenderSchema";

interface RenderJobInputProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
    fieldName: FormRenderSchemaKeys;
    label: string;
    type: string;
    placeholder: string;
    defaultValue: string;
    maxValue?: number;
    minValue?: number;
}

const RenderJobInput = ({ form, fieldName, label, type, placeholder, defaultValue }: RenderJobInputProps) => {

    const tooltips = [
        {
            fieldName: "job_settings.job_definition",
            title: "Blender Version - Job Definition",
            description: "The version of Blender that will be used to render the job.",
            node: null
        },
        {
            fieldName: "job_queue",
            title: "Job Queue",
            description: "The queue that the job will be submitted to. The queue it's asociated with the resources that will be used to render the job.",
            node: null
        },
        {
            fieldName: "job_settings.timeout",
            title: "Timeout",
            description: "Maximum time that the job will be allowed to run. If the job exceeds this time, it will be terminated.",
            node: null
        },
        {
            fieldName: "job_settings.job_attempts",
            title: "Job Attempts",
            description: "The number of times the job will be retried if it fails.",
            node: null
        }
    ]

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={() => (
                <FormItem>

                    <Label className="inline-flex gap-2">
                        {label}
                        {
                            tooltips.map((tooltip, index) => {
                                if (tooltip.fieldName === fieldName) {
                                    return (
                                        <div key={index}>
                                            <TooltipInfo
                                                title={tooltip.title}
                                                description={tooltip.description}
                                                footer={tooltip.node || null}
                                            />
                                        </div>
                                    )
                                }
                            })
                        }
                    </Label>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={placeholder}
                            value={String(form.watch(fieldName) || defaultValue)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setValue(fieldName, e.target.value)}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default RenderJobInput