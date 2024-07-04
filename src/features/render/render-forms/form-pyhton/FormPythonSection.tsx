import { Card } from "@/components/ui/card";
import useFormRender from "@/hooks/useFormRender";
import { useState } from "react";
import ConfirmRenderDialog from "../confirm-render/ConfirmRenderDialog";
import { Form } from "@/components/ui/form";
import JobSettings from "../../job-settings/JobSettings";
import RenderSettingsPython from "../../render-python/render-settings-python/RenderSettingsPython";
import ProjectSettings from "../../project-settings/ProjectSettings";

const FormPythonSection = () => {
    const [openDialog, setOpenDialog] = useState(false)

    const { form } = useFormRender();


    return (
        <Form {...form}>
            <form className="space-y-4">
                <Card className='p-6 bg-black/[0.08]'>
                    <ProjectSettings form={form} />
                </Card>
                <Card className='p-6 bg-black/[0.08]'>
                    <RenderSettingsPython sectionType="custom_render_python" form={form} />
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

export default FormPythonSection