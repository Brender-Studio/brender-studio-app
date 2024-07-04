import ExternalLink from "../buttons/ExternalLink"

const SesHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What is SES?</h3>
                <p className="text-xs text-muted-foreground">
                    Amazon SES (Simple Email Service) is a cloud-based email sending service. Brender Studio uses SES to send notifications about the status of your render jobs.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">Email Identities and Templates</h3>
                <p className="text-xs text-muted-foreground">
                    This section shows the email addresses (identities) we use to send notifications and the templates for these emails.
                    <br />
                    <br />
                    Templates help ensure consistency and save time when sending updates about render completions or failures.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/email-notifications'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default SesHoverCard