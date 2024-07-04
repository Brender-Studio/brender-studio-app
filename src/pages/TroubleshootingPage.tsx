import Section from '@/components/custom/structure/Section'
import TroubleshootingSection from '@/features/troubleshooting/TroubleshootingSection'

const TroubleshootingPage = () => {
    return (
        <Section
            title="Troubleshooting"
            content={<TroubleshootingSection />}
            justify='start'
            backBtn={false}
            // tooltip_description='Here you can find some common issues and how to solve them.'
        />
    )
}

export default TroubleshootingPage