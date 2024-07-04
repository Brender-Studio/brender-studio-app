import EcrHoverCard from "@/components/custom/hover-card-pages/EcrHoverCard"
import Section from "@/components/custom/structure/Section"
import ListEcrImages from "@/features/repository/ListEcrImages"

const RepositoryPage = () => {

    return (
        <Section
            title="Blender ECR Repository"
            justify="start"
            backBtn={false}
            content={<ListEcrImages />}
            hover_card_content='Here you can view all the images that have been stored in the Elastic Container Registry.'
            hover_card_title='Blender ECR Repository'
            hover_card_children={<EcrHoverCard />}
        />
    )
}

export default RepositoryPage
