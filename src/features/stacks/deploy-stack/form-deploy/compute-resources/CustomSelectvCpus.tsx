import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";


interface CustomSelectvCpusProps {
    form: any;
    options: string[];
    label: string;
    fieldName: string;
    defaultValue?: any;
    onValueChange: any;
    disabled?: boolean
}

export const CustomSelectvCpus = ({ form, defaultValue, fieldName, onValueChange, options, label, disabled }: CustomSelectvCpusProps) => {
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

