import ExternalLink from '../buttons/ExternalLink'

const Ec2HoverCard = () => {

    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What are EC2 Instances?</h3>
                <p className="text-xs text-muted-foreground">
                    EC2 instances are virtual servers that run on Amazon Web Services (AWS) Elastic Compute Cloud (EC2). Brender Studio uses EC2 instances to render the Blender projects.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">How are EC2 Instances Charged?</h3>
                <p className="text-xs text-muted-foreground">
                    EC2 instances are charged based on the instance type, the region, and the usage. The cost of an EC2 instance is calculated per hour.
                </p>
                <div className="w-full flex justify-end py-4">
                    <ExternalLink
                        link='https://aws.amazon.com/ec2/pricing/'
                        title='AWS EC2 Pricing'
                    />
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-sm">What are Autoscaling Groups?</h3>
                <p className="text-xs text-muted-foreground">
                    Auto Scaling Groups are a collection of EC2 instances that are managed by AWS Auto Scaling. They are used to ensure that you have the correct number of EC2 instances available to handle the load for your rendering jobs.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/servers-ec2-instances'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default Ec2HoverCard