import SpinnerButton from "@/components/custom/spinners/SpinnerButton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mapJobDefinitionName, mapJobQueueName } from "../../job-settings/helpers/jobHelpers"
import { PROGRESS_STEPS_RENDER } from "@/constants/progress/progressConstants"
import { useState } from "react"
import { submitJobSequence } from "../../submit-job-fns/submitJobSequence"
import useBucketNameQuery from "@/react-query-utils/queries/s3-queries/useBucketNameQuery"
import { useUserSessionStore } from "@/store/useSessionStore"
import { formRenderSchema } from "@/schemas/formRenderSchema"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import ProgressList from "./ProgressList"
import { efsBlenderFilePath, efsMainScriptPath } from "@/lib/utils/efsPaths"

interface ConfirmRenderDialogProps {
    openDialog: boolean
    setOpenDialog: (value: boolean) => void
    // type form (react hook form)
    form: any
    title: string
    description: string
}

const ConfirmRenderDialog = ({ openDialog, setOpenDialog, form, title, description }: ConfirmRenderDialogProps) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const { getSessionData } = useUserSessionStore();
    const { currentProfile, currentAwsRegion } = getSessionData();

    const navigate = useNavigate();

    const { bucketName } = useBucketNameQuery();

    const [progress, setProgress] = useState<{ [key: string]: boolean }>({
        [PROGRESS_STEPS_RENDER.PREPARING_FILES]: false,
        [PROGRESS_STEPS_RENDER.UPLOADING_FILES]: false,
        [PROGRESS_STEPS_RENDER.SUBMITING_JOB_1]: false,
        [PROGRESS_STEPS_RENDER.SUBMITING_JOB_2]: false,
        [PROGRESS_STEPS_RENDER.SUBMITING_JOB_3]: false,
    });

    const progressCallback = (step: string) => {
        if (!progress[step]) {
            setProgress(prevProgress => ({
                ...prevProgress,
                [step]: true,
            }));
        }
    };

    const mappedJobQueue = form?.getValues()?.job_settings?.job_queue ? mapJobQueueName(form.getValues().job_settings.job_queue) : '';
    const mappedJobDefinition = form?.getValues()?.job_settings?.job_definition ? mapJobDefinitionName(form.getValues().job_settings.job_definition) : '';

    if (!mappedJobQueue || !mappedJobDefinition) {
        return null
    }

    async function callJobSubmitFn(values: any) {
        return new Promise<void>((resolve) => {
            setTimeout(async () => {
                setSubmitting(true);
                const res = await submitJobSequence({ values, bucketName, currentProfile: currentProfile || '', currentAwsRegion, progressCallback });
                console.log('res 2', res);
                resolve();
            }, 1000);
        });
    }


    async function onSubmit(values: z.infer<typeof formRenderSchema>) {
        setSubmitting(true);
        try {
            console.log('values', values);
            await callJobSubmitFn(values);
            toast({
                title: 'Success',
                description: 'The job is being submitted. Check the status in the Jobs page.',
                variant: 'success',
                duration: 2000,
            });
        } catch (error) {
            console.error('Error submitting form', error);
            toast({
                title: 'Error',
                description: `${(error as Error).message}`,
                duration: 2000,
                variant: 'destructive'
            });
            throw new Error('Error submitting form');
        } finally {
            setSubmitting(false);
            setOpenDialog(false);
            setProgress({
                [PROGRESS_STEPS_RENDER.PREPARING_FILES]: false,
                [PROGRESS_STEPS_RENDER.UPLOADING_FILES]: false,
                [PROGRESS_STEPS_RENDER.SUBMITING_JOB_1]: false,
                [PROGRESS_STEPS_RENDER.SUBMITING_JOB_2]: false,
                [PROGRESS_STEPS_RENDER.SUBMITING_JOB_3]: false,
            });
            navigate('/jobs');
        }
    }

    // console log de form values
    // console.log('form.getValues()', form.getValues());
    const hasErrors = Object.keys(form.formState.errors).length > 0;

    return (
        <div className="flex justify-center">
            <Dialog open={openDialog}
                // onOpenChange={setOpenDialog}
                onOpenChange={(open) => {
                    // form isvalid
                    console.log('form.isValid', form.formState.isValid);
                    // form values
                    console.log('form.getValues()', form.getValues());
                    // form errors
                    console.log('form.errors', form.formState.errors);
                    if (open || (!open && !isSubmitting)) {
                        setOpenDialog(open);
                    }
                }}
            >
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        disabled={hasErrors || form.watch('file_path') === '' || form.watch('project_name') === '' || form.watch('python_script_path') === '' && form.watch('type') === 'custom_render_python'}
                    >
                        Review & Submit
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                        <div className="py-4 space-y-2 max-h-96 overflow-y-auto pr-2">
                            {
                                !isSubmitting && (
                                    <>
                                        <p className="font-semibold">
                                            Project details
                                        </p>
                                        <Card className="p-4">
                                            <p className="text-sm font-semibold">Project Name: <span className="font-normal text-muted-foreground">{form.getValues().project_name}</span></p>
                                            <p className="text-sm font-semibold">Email Notifications: <span className="font-normal text-muted-foreground">{form.getValues().ses.ses_email ? form.getValues().ses.ses_email : 'No configured'}</span></p>
                                            <p className="text-sm font-semibold">Blender file: <span className="font-normal text-muted-foreground">{form.getValues().file_path}</span></p>
                                            <p className="text-sm font-semibold">Blender version: <span className="font-normal text-muted-foreground">{mappedJobDefinition}</span></p>
                                            <p className="text-sm font-semibold">Job Queue: <span className="font-normal text-muted-foreground">{mappedJobQueue}</span></p>
                                        </Card>
                                        <p className="font-semibold pt-2">
                                            Render Settings
                                        </p>
                                        <Card className="p-4">
                                            {/* Add  camera, scene, layer, output format*/}
                                            <p className="text-sm font-semibold">Camera: <span className="font-normal text-muted-foreground">{form.getValues().camera_name}</span></p>
                                            <p className="text-sm font-semibold">Scene: <span className="font-normal text-muted-foreground">{form.getValues().scene_name}</span></p>
                                            <p className="text-sm font-semibold">Layer: <span className="font-normal text-muted-foreground">{form.getValues().layer_name}</span></p>
                                            <p className="text-sm font-semibold">Engine: <span className="font-normal text-muted-foreground">{form.getValues().engine}</span></p>
                                            <p className="text-sm font-semibold">Resolution: <span className="font-normal text-muted-foreground">{form.getValues().resolution.width} x {form.getValues().resolution.height}</span></p>
                                            <p className="text-sm font-semibold">Frame Range: <span className="font-normal text-muted-foreground">{form.getValues().frame_range.start} - {form.getValues().frame_range.end}</span></p>
                                            <p className="text-sm font-semibold">FPS: <span className="font-normal text-muted-foreground">{form.getValues().frame_range.fps}</span></p>
                                            <p className="text-sm font-semibold">Active Frame: <span className="font-normal text-muted-foreground">{form.getValues().active_frame}</span></p>
                                            <p className="text-sm font-semibold">Use GPU: <span className="font-normal text-muted-foreground">{form.getValues().use_gpu ? 'Yes' : 'No'}</span></p>
                                        </Card>
                                        {form.watch('type') === 'animation' && (
                                            <>
                                                <p className="font-semibold pt-2">
                                                    Output animation preview settings
                                                </p>
                                                <Card className="grid grid-cols-2 p-4">
                                                    <p className="text-sm font-semibold">Output Quality: <span className="font-normal text-muted-foreground">{form.getValues().ses.animation_preview.output_quality}</span></p>
                                                    <p className="text-sm font-semibold">Encoding Speed: <span className="font-normal text-muted-foreground">{form.getValues().ses.animation_preview.encoding_speed}</span></p>
                                                    <p className="text-sm font-semibold">FFmpeg Format: <span className="font-normal text-muted-foreground">{form.getValues().ses.animation_preview.ffmpeg_format}</span></p>
                                                    <p className="text-sm font-semibold">Auto Split: <span className="font-normal text-muted-foreground">{form.getValues().ses.animation_preview.autosplit ? 'Yes' : 'No'}</span></p>
                                                </Card>
                                            </>
                                        )}
                                        <p className="font-semibold pt-2">
                                            Job container settings
                                        </p>
                                        <Card className="grid grid-cols-2 p-4">
                                            <p className="text-sm font-semibold">vCPUs: <span className="font-normal text-muted-foreground">{form.getValues().job_settings.vcpus}</span></p>
                                            <p className="text-sm font-semibold">Memory: <span className="font-normal text-muted-foreground">{form.getValues().job_settings.memory} MB</span></p>
                                            <p className="text-sm font-semibold">Timeout: <span className="font-normal text-muted-foreground">{form.getValues().job_settings.timeout} seconds</span></p>
                                            <p className="text-sm font-semibold">Job Attempts: <span className="font-normal text-muted-foreground">{form.getValues().job_settings.job_attempts}</span></p>
                                            <p className="text-sm font-semibold">Number GPU's: <span className="font-normal text-muted-foreground">{form.getValues().job_settings.number_gpus}</span></p>
                                            <p className="text-sm font-semibold">Array Size: <span className="font-normal text-muted-foreground">{form.getValues().job_settings.array_size}</span></p>
                                        </Card>
                                        {
                                            form.watch('type') === 'custom_render_python' && (
                                                <>
                                                    <p className="font-semibold pt-2">
                                                        Python settings
                                                    </p>
                                                    <Card className="p-4">
                                                        <p className="text-sm font-semibold">Folder: <span className="font-normal text-muted-foreground">{form.getValues().folder_path_python ? 'Yes' : 'No'}</span></p>
                                                    </Card>
                                                    <p className="font-semibold pt-2">
                                                        Environment variables
                                                    </p>
                                                    <Card className="p-4">
                                                        <p className="text-sm font-semibold">EFS_MAIN_SCRIPT_PATH: <span className="font-normal text-muted-foreground">{efsMainScriptPath(form.getValues())}</span></p>
                                                        <p className="text-sm font-semibold">EFS_BLENDER_FILE_PATH: <span className="font-normal text-muted-foreground">{efsBlenderFilePath(form.getValues())}</span></p>
                                                        <p className="text-sm font-semibold">EFS_BLENDER_OUTPUT_FOLDER_PATH: <span className="font-normal text-muted-foreground">{form.getValues().python_env_vars.efs_blender_output_folder_path}</span></p>
                                                        <p className="text-sm font-semibold">BLENDER_EXECUTABLE: <span className="font-normal text-muted-foreground">{form.getValues().python_env_vars.blender_executable_path}</span></p>
                                                        <p className="text-sm font-semibold">USE_EEVEE: <span className="font-normal text-muted-foreground">{form.getValues().python_env_vars.use_eevee}</span></p>
                                                        <p className="text-sm font-semibold">USE_GPU: <span className="font-normal text-muted-foreground">{form.getValues().python_env_vars.use_gpus}</span></p>
                                                        <p className="text-sm font-semibold">BUCKET_NAME: <span className="font-normal text-muted-foreground">{form.getValues().python_env_vars.bucket_name}</span></p>
                                                        <p className="text-sm font-semibold">BUCKET_KEY: <span className="font-normal text-muted-foreground">{form.getValues().python_env_vars.bucket_key}</span></p>
                                                        {form.getValues().custom_env_vars?.map((envVar: any, index: number) => (
                                                            <p key={index} className="text-sm font-semibold">
                                                                {envVar.name && envVar.value && (
                                                                    <>
                                                                        {envVar.name}: <span className="font-normal text-muted-foreground">{envVar.value}</span>
                                                                    </>
                                                                )}

                                                            </p>
                                                        ))}

                                                    </Card>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                            {isSubmitting && (<ProgressList progress={progress} />)}
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="secondary"
                            // onClick={() => setOpenDialog(false)}
                            disabled={isSubmitting}
                            onClick={() => {
                                if (!isSubmitting) {
                                    setOpenDialog(false);
                                }
                            }}>Cancel</Button>
                        <Button
                            onClick={() => onSubmit(form.getValues())}
                            type="submit"
                            className={isSubmitting ? 'gap-2' : ''}
                            disabled={isSubmitting || hasErrors || form.watch('file_path') === '' || form.watch('project_name') === '' || form.watch('python_script_path') === '' && form.watch('type') === 'custom_render_python'}
                        >
                            {isSubmitting && <SpinnerButton />}
                            {isSubmitting ? 'Submitting' : 'Submit Job'}
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ConfirmRenderDialog