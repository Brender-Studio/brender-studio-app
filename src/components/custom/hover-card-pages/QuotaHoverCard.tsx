import ExternalLink from "../buttons/ExternalLink"

const QuotaHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What are Service Quotas?</h3>
                <p className="text-xs text-muted-foreground">
                    Service quotas are limits on the number of resources you can use in a specific AWS region. This includes GPU-based EC2 instances like the G5 series, which are essential for rendering tasks.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">Recommended Quotas</h3>
                <p className="text-xs text-muted-foreground">
                    We recommend starting with quotas of 8 for both Spot and On-Demand instances.
                    <br />
                    <br />
                    Incrementally increasing your quotas is advisable because AWS may not approve high quotas for new accounts initially. Gradually increasing the values helps manage and scale your resources efficiently.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/guides/enable-ec2'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default QuotaHoverCard