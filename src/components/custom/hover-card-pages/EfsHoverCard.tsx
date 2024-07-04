import ExternalLink from "../buttons/ExternalLink"

const EfsHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What is EFS?</h3>
                <p className="text-xs text-muted-foreground">
                    Amazon EFS (Elastic File System) is a scalable file storage service that can be shared across multiple EC2 instances.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">File Sharing and Storage</h3>
                <p className="text-xs text-muted-foreground">
                    This section displays the Elastic File System (EFS) in the selected Stack. You can view the EFS details and delete the contents if needed.
                    <br />
                    <br />
                    EFS allows Brender Studio to centrally store files and share them seamlessly across EC2 instances, facilitating collaboration and resource access.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/file-system-efs'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default EfsHoverCard