import TooltipInfo from "@/components/custom/tooltip/TooltipInfo"
import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Label } from "@/components/ui/label"

interface RenderCheckboxProps {
    form: any
    fieldName: string
    label: string
    defaultValue: boolean
    isCustom: boolean
}


const RenderCheckbox = ({ form, fieldName, defaultValue, label, isCustom }: RenderCheckboxProps) => {

    const tooltips = [
        {
            fieldName: "use_stamp",
            title: "Stamp Metadata",
            description: "Burns metadata into the output image. This includes the date and time the image was rendered and other information.",
            node: null
        },
        {
            fieldName: "use_compositor",
            title: "Use Compositing",
            description: "Enables compositing of the rendered image. This includes the use of nodes to manipulate the rendered image.",
            node: null
        },
        {
            fieldName: "use_sequencer",
            title: "Use Sequencer",
            description: "Enables the video sequencer. This allows you to edit and arrange video clips, images, and audio tracks.",
            node: null
        }
    ]

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="flex justify-start h-full">
                    {/* <Label>{label}</Label> */}
                    <FormControl>
                        <div className="flex gap-2 my-2">
                            <Checkbox
                                type="button"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!isCustom}
                                defaultChecked={defaultValue}
                            />
                            <Label>{label}</Label>
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
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default RenderCheckbox