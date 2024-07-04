import ExternalLink from "../buttons/ExternalLink"

const S3HoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What is Amazon S3?</h3>
                <p className="text-xs text-muted-foreground">
                    Amazon S3 (Simple Storage Service) is a cloud-based storage service provided by Amazon Web Services (AWS).
                    <br />
                    <br />
                    It's like a virtual storage room where Brender Studio keeps all the final render files.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">What are Temporary URLs?</h3>
                <p className="text-xs text-muted-foreground">
                    Temporary URLs allow you to securely share access to specific files stored in Amazon S3 for a limited time.
                    <br />
                    <br />
                    You can use these URLs to share your rendered files with others or download them to your local machine.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/render-projects'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default S3HoverCard