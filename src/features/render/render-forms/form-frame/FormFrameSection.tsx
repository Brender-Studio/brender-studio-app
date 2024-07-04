import ProjectSettings from '../../project-settings/ProjectSettings'
import { Form } from "@/components/ui/form"
import RenderSettings from '../../render-settings/RenderSettings'
import useFormRender from '@/hooks/useFormRender'
import { Card } from '@/components/ui/card'
import JobSettings from '../../job-settings/JobSettings'
import { useState } from 'react'
import ConfirmRenderDialog from '../confirm-render/ConfirmRenderDialog'

const FormFrameSection = () => {
    const [openDialog, setOpenDialog] = useState(false)

    const { form } = useFormRender();

    return (
        <Form {...form}>
            <form className="space-y-4">
                <Card className='p-6 bg-black/[0.08]'>
                    <ProjectSettings form={form} />
                </Card>
                <Card className='p-6 bg-black/[0.08]'>
                    <RenderSettings sectionType="frame" form={form} />
                </Card>
                <Card className='p-6 bg-black/[0.08]'>
                    <JobSettings form={form} />
                    <div className='w-full flex justify-end mt-6'>
                        <ConfirmRenderDialog
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            form={form}
                            title='Review & Submit'
                            description='Please review the following details before submitting the job.'
                        />
                    </div>
                </Card>
            </form>
        </Form>
    )
}

export default FormFrameSection