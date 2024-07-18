import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { deployStackSchema } from "@/schemas/deployStackSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormDeploySchema = z.infer<typeof deployStackSchema>;

export interface CustomOption {
    label: string;
    value: string | number;
}

interface CustomSelectvCpusProps {
    form: UseFormReturn<FormDeploySchema>;
    options: number[]
    label: string;
    fieldName: string;
    defaultValue?: string | number;
    onValueChange: any 
    disabled?: boolean;
}

export const CustomSelectvCpus = ({ form, defaultValue, fieldName, onValueChange, options, label, disabled }: CustomSelectvCpusProps) => {

    return (
        <FormField
            control={form.control}
            name={fieldName as any}
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
                            {options.map((option: number, index: number) => (
                                <SelectItem key={index} value={option as any}>
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

