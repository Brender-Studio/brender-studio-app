import { Separator } from "@/components/ui/separator"
import { BrenderTabsList, BrenderTabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs"
import { useFormStore } from "@/store/useFormStore"
import { ReactNode } from "react"


interface RenderFrameFormProps {
    formFrame: ReactNode,
    formAnimation: ReactNode,
    formPython: ReactNode
}

const RenderTabs = ({ formFrame, formAnimation, formPython }: RenderFrameFormProps) => {
    const { clearAllFormStates, setIsFolder } = useFormStore()

    const clearAllFormStatesOnTabChange = () => {
        clearAllFormStates()
        setIsFolder(false)
    }

    return (
        <Tabs defaultValue="frame" className="w-full relative" onValueChange={clearAllFormStatesOnTabChange}>
            <BrenderTabsList className="mx-auto w-full">
                <BrenderTabsTrigger value="frame">Frame</BrenderTabsTrigger>
                <BrenderTabsTrigger value="animation">Animation</BrenderTabsTrigger>
                <BrenderTabsTrigger value="python">Python</BrenderTabsTrigger>
            </BrenderTabsList>
            <Separator className="absolute h-[1px] top-9 -z-10 bg-white/[0.05] left-0" />

            <TabsContent value="frame">
                {formFrame}
            </TabsContent>
            <TabsContent value="animation">
                {formAnimation}
            </TabsContent>
            <TabsContent value="python">
                {formPython}
            </TabsContent>
        </Tabs>
    )
}

export default RenderTabs