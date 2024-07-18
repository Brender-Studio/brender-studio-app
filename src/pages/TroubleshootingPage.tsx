import Section from '@/components/custom/structure/Section'
import TroubleshootingSection from '@/features/troubleshooting/TroubleshootingSection'

const TroubleshootingPage = () => {
    return (
        <Section
            title="Troubleshooting"
            content={<TroubleshootingSection />}
            justify='start'
            backBtn={false}
        />
    )
}

export default TroubleshootingPage