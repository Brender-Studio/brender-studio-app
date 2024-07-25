import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Book } from "lucide-react"
import PythonGuideTabs from "./components/PythonGuideTabs"
import IntroductionPy from "./sections/IntroductionPy"
import PythonBlender from "./sections/PythonBlender"
import PyFiles from "./sections/PyFiles"
import EnvVarsPy from "./sections/EnvVarsPy"
import PredefinedEnvVars from "./sections/PredefinedEnvVars"
import AWSArrayJobExplanation from "./sections/AwsArrayExplanation"
import Boto from "./sections/Boto"

const tabs = [
    {
        label: 'Introduction',
        value: 'introduction',
        content: <IntroductionPy />
    },
    {
        label: 'Python and Blender',
        value: 'python-blender',
        content: <PythonBlender />
    },
    {
        label: 'Upload Python Files',
        value: 'upload-python-files',
        content: <PyFiles />
    },
    {
        label: 'Environment Variables',
        value: 'environment-variables',
        content: <EnvVarsPy />
    },
    {
        label: 'Predefined Env Variables',
        value: 'predefined-variables',
        content: <PredefinedEnvVars />
    },
    {
        label: 'Array Jobs',
        value: 'array-job',
        content: <AWSArrayJobExplanation />
    },
    {
        label: 'Using boto3',
        value: 'using-boto3',
        content: <Boto />
    },
]


const PythonGuideDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" className="" size='icon' variant='outline'>
                    <Book size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1100px] h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Brender Studio - Blender Python</DialogTitle>
                    <DialogDescription>
                        User guide for Blender Python scripting with Brender Studio.
                    </DialogDescription>
                    <PythonGuideTabs tabs={tabs} />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default PythonGuideDialog