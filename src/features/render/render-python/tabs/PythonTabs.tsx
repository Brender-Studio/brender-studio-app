import CustomTabs from '@/components/custom/tabs/CustomTabs'
import CustomScriptSection from './custom-script/CustomScriptSection'
import PresetScriptSection from './preset-scripts/PresetScriptSection'
import PythonGuideDialog from '../python-guide/PythonGuideDialog'
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formRenderSchema } from '@/schemas/formRenderSchema';

interface PythonTabsProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
}

const PythonTabs = ({ form }: PythonTabsProps) => {

    const tabs = [
        {
            label: 'Custom Script',
            value: 'custom-script',
            content: <CustomScriptSection form={form} />
        },
        {
            label: 'Predefined Scripts',
            value: 'example-script',
            content: <PresetScriptSection form={form} />
        },
    ]

    return (
        <>
            <div className='relative py-6'>
                <PythonGuideDialog />
                <CustomTabs tabs={tabs} />
            </div>
        </>
    )
}

export default PythonTabs