import ExternalLink from "../buttons/ExternalLink"

const StacksHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What are Brender Studio Farm Stacks?</h3>
                <p className="text-xs text-muted-foreground">
                    Brender Studio uses AWS CloudFormation to create and manage the infrastructure resources required to render Blender projects.
                    <br />
                    <br />
                    A stack is a collection of AWS resources that are created and managed as a single unit.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/farm-stacks'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default StacksHoverCard