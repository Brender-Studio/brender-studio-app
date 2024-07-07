import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formRenderSchema } from "@/schemas/formRenderSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormRenderSchema = z.infer<typeof formRenderSchema>;
type FieldName = keyof FormRenderSchema;

interface RenderInputProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>
    fieldName: FieldName
    label: string
    type: string
    placeholder: string
    defaultValue: string | number
    isCustom: boolean
    minValue?: number
    maxValue?: number
}

const RenderInput = ({ form, fieldName, label, type, placeholder, isCustom }: RenderInputProps) => {
    return (
        <div>
            <FormField
                control={form.control}
                name={fieldName}
                render={({ field }) => {
                    
                    let value: string | number | readonly string[] | undefined;
                    if (typeof field.value === 'string' || typeof field.value === 'number') {
                        value = field.value;
                    } else if (Array.isArray(field.value)) {
                        value = field.value.map(item => item.value || '').join(', ');
                    } else {
                        value = '';
                    }

                    return (
                        <FormItem>
                            <Label>{label}</Label>
                            <FormControl>
                                <Input
                                    disabled={!isCustom}
                                    type={type}
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
        </div>
    )
}

export default RenderInput;
