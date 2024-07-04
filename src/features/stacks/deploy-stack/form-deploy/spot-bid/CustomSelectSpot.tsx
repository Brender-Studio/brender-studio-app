import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CustomSelectSpotProps {
    form: any;
    options: number[];
    label: string;
    fieldName: string;
    defaultValue?: any;
    disabled?: boolean
}

const CustomSelectSpot = ({ form, fieldName, label, defaultValue, options, disabled }: CustomSelectSpotProps) => {

    const onValueChange = (fieldName: string, value: any) => {
        form.setValue(fieldName, value);
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
                            onValueChange(fieldName, parseInt(value));
                        }}
                        defaultValue={defaultValue || field.value}
                        value={field.value}
                        disabled={disabled}
                    >
                        <FormControl>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder={defaultValue} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: any, index: number) => (
                                <SelectItem key={index} value={option}>
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