import BuildsHoverCard from '@/components/custom/hover-card-pages/BuildsHoverCard'
import Section from '@/components/custom/structure/Section'
import ListBuilds from '@/features/builds/ListBuilds'

const BuildsPage = () => {

    return (
        <Section
            justify="start"
            title="Farm Builds"
            content={<ListBuilds />}
            hover_card_content='Here you can view all the builds that have been triggered when you deploy your render farms. Brender Studio uses CodeBuild to deploy your render farms.'
            hover_card_title='Farm Builds'
            hover_card_children={<BuildsHoverCard />}
        />
    )
}

export default BuildsPage