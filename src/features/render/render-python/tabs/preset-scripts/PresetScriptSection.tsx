import { UseFormReturn } from "react-hook-form"
import CodePreview from "../custom-script/CodePreview"
import ListPresets from "./list-presets/ListPresets"
import { z } from "zod"
import { formRenderSchema } from "@/schemas/formRenderSchema"

interface PresetScriptSectionProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>
}

const PresetScriptSection = ({ form }: PresetScriptSectionProps) => {
    return (
        <div className="grid grid-cols-2 gap-4 py-2">
            <ListPresets form={form} />
            <CodePreview form={form} />
        </div>
    )
}

export default PresetScriptSection