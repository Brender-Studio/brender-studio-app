import { UseFormReturn } from 'react-hook-form';
import CodePreview from './CodePreview'
import DropzonePythonScript from './dropzone-pyhton/DropzonePythonScript'
import { z } from 'zod';
import { formRenderSchema } from '@/schemas/formRenderSchema';

interface CustomScriptSectionProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
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