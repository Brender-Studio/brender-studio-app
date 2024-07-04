import CodePreview from "../custom-script/CodePreview"
import ListPresets from "./list-presets/ListPresets"

interface PresetScriptSectionProps {
    form: any
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