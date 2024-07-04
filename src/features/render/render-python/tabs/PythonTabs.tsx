import CustomTabs from '@/components/custom/tabs/CustomTabs'
import CustomScriptSection from './custom-script/CustomScriptSection'
import PresetScriptSection from './preset-scripts/PresetScriptSection'
import PythonGuideDialog from '../python-guide/PythonGuideDialog'
// import LabelSeparator from '@/components/custom/structure/LabelSeparator'

interface PythonTabsProps {
    form: any
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
            {/* <LabelSeparator label='Blender BPY' /> */}
            <div className='relative py-6'>
                <PythonGuideDialog />
                <CustomTabs tabs={tabs} />
            </div>
        </>
    )
}

export default PythonTabs