import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { blenderVersions } from "./blenderVersions"

interface SelectBlenderImagesProps {
    form: any
}

const SelectBlenderImages = ({ form }: SelectBlenderImagesProps) => {

    return (
        <div>
            <Label>Blender Versions</Label>

            <FormField
                control={form.control}
                name="blenderVersions"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormDescription>
                                Choose the Blender versions you wish to deploy within your stack. An ECR repository will be generated and labeled with the selected versions. It's important to note that the ECR repository operates independently of the stack.
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                {blenderVersions.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="blenderVersions"
                                        render={({ field }) => (
                                            <FormItem key={item.id} className="flex items-center flex-row space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            const currentValues = field.value || [];
                                                            return checked
                                                                ? field.onChange([...currentValues, item.id])
                                                                : field.onChange(currentValues.filter((value: string) => value !== item.id));
                                                        }}
                                                    />
                                                </FormControl>
                                                <Label className="text-sm font-normal">{item.label}</Label>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default SelectBlenderImages