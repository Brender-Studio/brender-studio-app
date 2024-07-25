import CustomTabs from '@/components/custom/tabs/CustomTabs'
import CustomScriptSection from './custom-script/CustomScriptSection'
import PresetScriptSection from './preset-scripts/PresetScriptSection'
import PythonGuideDialog from '../python-guide/PythonGuideDialog'
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formRenderSchema } from '@/schemas/formRenderSchema';
import { Button } from '@/components/ui/button';
import { open } from '@tauri-apps/api/shell';

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

    const openCommunityScripts = () => {
        open('https://github.com/Brender-Studio/brender-snippets')
    }

    return (
        <>
            <div className='relative py-6'>
                <CustomTabs tabs={tabs} />
                <div className='pb-8'></div>
                <div className='inline-flex gap-2 absolute bottom-0 right-0 z-[9] '>
                    <Button onClick={openCommunityScripts} size='md' type='button'>
                        Explore Community Scripts
                    </Button>
                    <PythonGuideDialog />
                </div>
            </div>
        </>
    )
}

export default PythonTabs