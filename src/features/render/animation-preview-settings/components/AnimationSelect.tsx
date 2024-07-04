import TooltipInfo from "@/components/custom/tooltip/TooltipInfo"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AnimationSelectProps {
    form: any
    fieldName: string
    label: string
    options: {
        name: string
        value: string
    }[]
    defaultValue: any
}

const AnimationSelect = ({ form, fieldName, label, options, defaultValue }: AnimationSelectProps) => {

    const onValueChange = (value: string) => {
        form.setValue(fieldName, value)
    }

    const tooltips = [
        {
            fieldName: "ses.animation_preview.output_quality",
            title: "Output Quality",
            description: "Choose the output quality of the animation preview. Higher quality settings will result in larger file sizes and longer render times.",
            node: null
        },
        {
            fieldName: "ses.animation_preview.encoding_speed",
            title: "Encoding Speed",
            description: "Choose the encoding speed of the animation preview. Faster encoding speeds will result in lower quality output.",
            node: null
        },   
        {
            fieldName: "ses.animation_preview.ffmpeg_format",
            title: "FFmpeg Format",
            description: "Choose the format of the output file.",
            node: null
        }   
    ]

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <Label className="inline-flex gap-2">{label}
                        {
                            tooltips.map((tooltip, index) => {
                                if (tooltip.fieldName === fieldName) {
                                    return (
                                        <div key={index}>
                                            <TooltipInfo
                                                title={tooltip.title}
                                                description={tooltip.description}
                                                footer={tooltip.node}
                                            />
                                        </div>
                                    )
                                }
                            })
                        }
                    </Label>
                    <Select
                        // onValueChange={field.onChange} 
                        onValueChange={onValueChange}
                        defaultValue={defaultValue}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder={field.value} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: { name: string, value: string }) => (
                                <SelectItem key={option.value} value={option.value} >
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default AnimationSelect