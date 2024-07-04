import ExternalLink from "../buttons/ExternalLink"


const CpuHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What is CPU Rendering?</h3>
                <p className="text-xs text-muted-foreground">
                    CPU rendering is a method of rendering 3D scenes using the processing power of the CPU (Central Processing Unit).
                    <br />
                    <br />
                    In this section, you can configure settings like resolution and samples for rendering your Blender projects using CPU-based EC2 instances.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">Why CPU Rendering?</h3>
                <p className="text-xs text-muted-foreground">
                    CPU rendering is suitable for general-purpose rendering tasks. These instances are preferred for their balance of performance and cost-effectiveness.
                    <br />
                    <br />
                    However, CPU rendering can be slower compared to GPU rendering.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/rendering-modes'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default CpuHoverCard