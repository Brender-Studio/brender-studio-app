import QuotaHoverCard from '@/components/custom/hover-card-pages/QuotaHoverCard'
import Section from '@/components/custom/structure/Section'
import ServiceQuotaSection from '@/features/service-quotas/ServiceQuotaSection'

const ServiceQuotaPage = () => {

    return (
        <Section
            justify="start"
            title="EC2 - Service Quotas"
            // tooltip_description='This section displays the service quotas for the selected region. You can view the service quota details and request a service quota increase for GPU instances.'
            content={<ServiceQuotaSection />}
            hover_card_content='Here you can view all the service quotas that have been set for your account. Brender Studio uses Service Quotas to manage the number of resources you can use in a specific AWS region.'
            hover_card_title='Service Quotas'
            hover_card_children={<QuotaHoverCard />}
        />
    )
}

export default ServiceQuotaPage