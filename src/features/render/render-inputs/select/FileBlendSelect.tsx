import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SetStateAction } from "react"

interface FileBlendSelectProps {
    form: any
    fieldName: string
    options: {
        name: string
        path: string
    }[]
    label: string
    isCustom: boolean
    setSelectedPaths: SetStateAction<any>
    selectedPaths: any
}


const FileBlendSelect = ({ form, fieldName, isCustom, label, options, setSelectedPaths, selectedPaths }: FileBlendSelectProps) => {

    console.log('options from select', options)

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
                        value={field.value}
                        disabled={!isCustom}
                    >
                        <FormControl>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder={field.value} />
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