import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formRenderSchema } from "@/schemas/formRenderSchema";
import { SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormRenderSchema = z.infer<typeof formRenderSchema>;
type FieldName = keyof FormRenderSchema;

interface FileBlendSelectProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>
    fieldName: FieldName
    options: {
        name: string
        path: string
    }[]
    label: string
    isCustom: boolean
    setSelectedPaths: React.Dispatch<SetStateAction<{ filePath: string }>>
    selectedPaths: { filePath: string }
}


const FileBlendSelect = ({ form, fieldName, isCustom, label, options, setSelectedPaths, selectedPaths }: FileBlendSelectProps) => {

    // console.log('options from select', options)

    const onValueChange = (value: string) => {
        form.setValue(fieldName, value)
        setSelectedPaths({
            ...selectedPaths,
            filePath: value
        })
    }

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <Label>{label}</Label>
                    <Select
                        onValueChange={onValueChange}
                        value={field.value?.toString()}
                        disabled={!isCustom}
                    >
                        <FormControl>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder={field?.value?.toString()} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: { name: string, path: string }) => (
                                <SelectItem key={option.path} value={option.path}>
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

export default FileBlendSelect