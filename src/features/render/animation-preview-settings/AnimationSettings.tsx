import DataTableHeader from '@/components/custom/structure/DataTableHeader'
import RenderAnimationFields from './RenderAnimationFields'

interface AnimationSettingsProps {
    form: any
}

const AnimationSettings = ({ form }:AnimationSettingsProps) => {
    return (
        <div>
            <div className="flex flex-col pb-6">
                <DataTableHeader
                    title="Animation Preview Settings"
                    description="Preview is generated stitiching the rendered frames with Blender's sequencer."
                />
            </div>

            <div>
                <RenderAnimationFields
                    form={form}
                />
            </div>
        </div>
    )
}

export default AnimationSettings