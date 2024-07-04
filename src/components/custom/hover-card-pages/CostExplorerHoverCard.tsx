import ExternalLink from "../buttons/ExternalLink"


const CostExplorerHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What is Cost Explorer?</h3>
                <p className="text-xs text-muted-foreground">
                    Cost Explorer is a tool that helps you analyze your AWS costs. Brender Studio shows a simplified version of Cost Explorer.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/cost-explorer'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default CostExplorerHoverCard