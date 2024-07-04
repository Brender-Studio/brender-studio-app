import ExternalLink from "../buttons/ExternalLink"

const BuildsHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What is CodeBuild?</h3>
                <p className="text-xs text-muted-foreground">
                    {/* Explain codebuild for non tecnical users */}
                    CodeBuild is a tool that automates the creation and setup of your render farms. It runs on remote AWS servers.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">How long does it take?</h3>
                <p className="text-xs text-muted-foreground">
                    The build process time depends on the number of images in the Elastic Container Registry (ECR) that need to be deployed. Each image contains a different version of Blender.
                    <br />
                    <br />
                    Typically, the build process takes a minimum of 10 minutes because it involves both building Docker images and deploying stacks with AWS CDK.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/farm-builds'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default BuildsHoverCard