import ExternalLink from "../buttons/ExternalLink"

const GpuHoverCard = () => {

    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What is GPU Rendering?</h3>
                <p className="text-xs text-muted-foreground">
                    GPU rendering is a method of rendering 3D scenes using the processing power of the GPU (Graphics Processing Unit), specifically utilizing AWS EC2 G5 instances powered by NVIDIA GPUs.

                    <br />
                    <br />
                    In this section, you can configure settings like resolution and samples for rendering your Blender projects using GPU-based EC2 instances.
                    <br />
                </p>
                <div className="w-full flex justify-end py-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/servers-ec2-instances#types-of-ec2'
                        title='Learn more about EC2 G5 & G6'
                    />
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-sm">Why GPU Rendering?</h3>
                <p className="text-xs text-muted-foreground">
                    GPU rendering excels in tasks requiring massive parallel processing, making it significantly faster than CPU rendering for many scenarios.
                    <br />
                    <br />
                    Note: You may need to check and adjust your AWS Service Quotas to ensure you have the necessary quota for using these GPU instances.
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

export default GpuHoverCard