import SesHoverCard from '@/components/custom/hover-card-pages/SesHoverCard'
import Section from '@/components/custom/structure/Section'
import EmailSection from '@/features/email-notifications/EmailSection'

const EmailNotificationsPage = () => {

    return (
        <Section
            justify="start"
            title="Email Notifications"
            content={<EmailSection />}
            hover_card_content='Here you can view all the email identities and templates that have been set for your account.'
            hover_card_title='Email Notifications'
            hover_card_children={<SesHoverCard />}
        />
    )
}

export default EmailNotificationsPage
