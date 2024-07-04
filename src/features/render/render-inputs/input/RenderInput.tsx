import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RenderInputProps {
    form: any
    fieldName: string
    label: string
    type: string
    placeholder: string
    defaultValue: string
    isCustom: boolean
    minValue?: number
    maxValue?: number
}

const RenderInput = ({ form, fieldName, label, type, placeholder, isCustom }: RenderInputProps) => {

    // const handleChange = (e: any) => {
    //     console.log('form errors', form.formState.errors);
    //     // print form values
    //     console.log('form values', form.getValues());
    //     // if value is '' setError
    //     form.setValue(fieldName, e.target.value, { shouldValidate: true, })
    // }


    return (
        <div>
            <FormField
                control={form.control}
                name={fieldName}
                render={({field}) => (
                    <FormItem>
                        <Label>{label}</Label>
                        <FormControl>
                            <Input
                                disabled={!isCustom}
                                type={type}
                                placeholder={placeholder}
                                // value={form.watch(fieldName)}
                                // onChange={handleChange}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default RenderInput