import CodePreview from './CodePreview'
import DropzonePythonScript from './dropzone-pyhton/DropzonePythonScript'

interface CustomScriptSectionProps {
    form: any
}

const CustomScriptSection = ({ form }: CustomScriptSectionProps) => {

    return (
        <div className='grid grid-cols-2 gap-4 py-2'>
            <DropzonePythonScript form={form} />
            <CodePreview form={form} />
        </div>
    )
}

export default CustomScriptSection