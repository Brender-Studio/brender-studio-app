import { useEffect, useState } from "react"
import { predefinedScripts } from "../data/predefinedScripts"
import { resolveResource } from "@tauri-apps/api/path"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface ListPresetsProps {
    form: any
}

const ListPresets = ({ form }: ListPresetsProps) => {
    const [selected, setSelected] = useState(predefinedScripts[0].code_path)

    const handleSelect = (script: string) => {
        // setSelected(script)
        console.log('Selected script: ', script)
        // form.setValue('python_script_path', script)
        // resolve path also here
        handleResolveResource(script).then((realPath) => {
            console.log('Real path:', realPath)
            form.setValue('python_script_path', realPath)
            setSelected(script) // set selected (for styling purposes only)
        })
    }

    // exract real path from resources 
    const handleResolveResource = async (path: string) => {
        try {
            const realPath = await resolveResource(path)
            return realPath
        } catch (error) {
            console.error(error)
        }
    }

    // useffect for seting first script
    useEffect(() => {
        // setSelected(predefinedScripts[0].code_path)
        form.setValue('is_folder_python', false)
        form.setValue('folder_path_python', '')

        const fetchScriptContent = async () => {
            const content = await handleResolveResource(predefinedScripts[0].code_path);
            console.log('Content:', content)
            form.setValue('python_script_path', content)
        };

        if (predefinedScripts[0].code_path) {
            fetchScriptContent();
        }
    }, [])

    const badgeColor = (type: string) => {
        switch (type) {
            case 'Single job':
                return 'progress'
            case 'Array job':
                return 'warning'
            case 'Utility':
                return 'success'
            case 'Example':
                return 'secondary'
            default:
                return 'bg-gray-500'
        }
    }


    return (
        <div className='space-y-2'>
            <Label>
                BPY Example Scripts
            </Label>
            <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-2">
                {predefinedScripts && predefinedScripts.map((script) => (
                    <div key={script.name}
                        // className="p-4 border  rounded hover:bg-accent hover:border-white"
                        className={selected === script.code_path ? 'hover:cursor-pointer p-4 border rounded bg-card border-brand' : 'bg-card hover:cursor-pointer p-4 border  rounded hover:bg-accent'}
                        onClick={() => handleSelect(script.code_path)}
                    >
                        <h3 className="text-md font-semibold">{script.name}</h3>
                        <p className="text-xs text-muted-foreground">{script.description}</p>
                        <div className="pt-4 inline-flex gap-2">
                            <Badge variant={badgeColor(script.job_type) as any}>{script.job_type}</Badge>
                            <Badge variant={badgeColor(script.script_type) as any}>{script.script_type}</Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListPresets