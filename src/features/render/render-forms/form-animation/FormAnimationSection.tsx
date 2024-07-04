import { Form } from "@/components/ui/form"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import ProjectSettings from "../../project-settings/ProjectSettings"
import RenderSettings from "../../render-settings/RenderSettings"
import JobSettings from "../../job-settings/JobSettings"
import useFormRender from "@/hooks/useFormRender"
import ConfirmRenderDialog from "../confirm-render/ConfirmRenderDialog"
import AnimationSettings from "../../animation-preview-settings/AnimationSettings"

const FormAnimationSection = () => {
    const { form } = useFormRender();
    const [openDialog, setOpenDialog] = useState(false)

    return (

        <Form {...form}>
            <form className="space-y-4">
                <Card className='p-6 bg-black/[0.08]'>
                    <ProjectSettings form={form} />
                </Card>
                <Card className='p-6 bg-black/[0.08]'>
                    <RenderSettings sectionType="animation" form={form} />
                </Card>
                <Card className='p-6 bg-black/[0.08]'>
                    <AnimationSettings form={form} />
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

export default FormAnimationSection