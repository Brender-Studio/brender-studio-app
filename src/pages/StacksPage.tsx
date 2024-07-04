import StacksHoverCard from "@/components/custom/hover-card-pages/StacksHoverCard"
import Section from "@/components/custom/structure/Section"
import ListStacks from "@/features/stacks/list-stacks/ListStacks"

const StacksPage = () => {

  return (
    <div>
      <Section
        title="Brender Studio Farm Stacks"
        justify="start"
        content={<ListStacks />}
        hover_card_content='Here you can view the Brender Studio Farm Stacks in the selected region. You can view the stack details and delete the stack.'
        hover_card_title='Brender Studio Farm Stacks'
        hover_card_children={<StacksHoverCard />}
      />
    </div>
  )
}

export default StacksPage