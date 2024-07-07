import { SetStateAction } from 'react'
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TooltipInfo from '@/components/custom/tooltip/TooltipInfo'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { formRenderSchema } from '@/schemas/formRenderSchema'

type FormRenderSchema = z.infer<typeof formRenderSchema>;
type FieldName = keyof FormRenderSchema;

interface FileScriptSelectProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>
    fieldName: FieldName
    options: {
        name: string
        path: string
    }[]
    label: string
    setSelectedPaths: React.Dispatch<SetStateAction<{ filePath: string }>>
    selectedPaths: { filePath: string }
}

const FileScriptSelect = ({ form, fieldName, label, options, setSelectedPaths, selectedPaths }: FileScriptSelectProps) => {


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
                    <div className='inline-flex gap-2'>

                        <Label>{label}</Label>
                        <TooltipInfo
                            title='Entry point script file'
                            description='Select the entry point script file that will be executed inside Blender. This file should contain the main logic of your script.'
                        />
                    </div>
                    <Select
                        onValueChange={onValueChange}
                        value={field.value?.toString()}
                    >
                        <FormControl>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder={field.value?.toString()} />
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

export default FileScriptSelect