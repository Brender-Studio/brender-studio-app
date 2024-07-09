import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { deployStackSchema } from "@/schemas/deployStackSchema";
import { FieldValues, UseFormReturn } from "react-hook-form";


type FormDeploySchema = z.infer<typeof deployStackSchema>;
type FieldName = keyof FormDeploySchema;

interface CustomSelectSpotProps {
    form: UseFormReturn<FormDeploySchema>
    options: number[];
    label: string;
    fieldName: FieldValues[FieldName];
    defaultValue?: number;
    disabled?: boolean
}


const CustomSelectSpot = ({ form, fieldName, label, defaultValue, options, disabled }: CustomSelectSpotProps) => {

    const onValueChange = (fieldName: FieldName, value: string) => {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            form.setValue(fieldName, intValue as FieldValues[FieldName]);
        }
    }

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <Label>{label}</Label>
                    <Select
                        onValueChange={value => {
                            onValueChange(fieldName, value);
                        }}
                        defaultValue={defaultValue?.toString() || field.value.toString()}
                        value={field.value.toString()}
                        disabled={disabled}
                    >
                        <FormControl>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder={defaultValue} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: number, index: number) => (
                                <SelectItem key={index} value={option.toString()}>
                                    {option}
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

export default CustomSelectSpot