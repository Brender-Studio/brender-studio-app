import EfsHoverCard from "@/components/custom/hover-card-pages/EfsHoverCard"
import Section from "@/components/custom/structure/Section"
import EfsSection from "@/features/efs/EfsSection"

const EfsPage = () => {

    return (
        <Section
            title="Elastic File System (EFS)"
            justify="start"
            backBtn={false}
            content={<EfsSection />}
            hover_card_content='Here you can view all the Elastic File Systems for the selected Stack.'
            hover_card_title='Elastic File System (EFS)'
            hover_card_children={<EfsHoverCard />}
        />
    )
}

export default EfsPage
