import S3HoverCard from "@/components/custom/hover-card-pages/S3HoverCard"
import Section from "@/components/custom/structure/Section"
import ListRenders from "@/features/render-contents/list-renders/ListRenders"

const RendersPage = () => {

  return (
    <Section
      title="Render Projects"
      justify="start"
      backBtn={false}
      content={<ListRenders />}
      hover_card_content='Here you can view the projects that have been rendered. Brender Studio uses S3 to store the rendered files.'
      hover_card_title='Render Projects'
      hover_card_children={<S3HoverCard />}
    />
  )
}

export default RendersPage