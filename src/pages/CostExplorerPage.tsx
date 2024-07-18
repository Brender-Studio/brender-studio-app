import CostExplorerHoverCard from "@/components/custom/hover-card-pages/CostExplorerHoverCard"
import Section from "@/components/custom/structure/Section"
import CostExplorerSection from "@/features/cost-explorer/CostExplorerSection"

const CostExplorerPage = () => {

  return (
    <Section
      title="Cost Explorer"
      justify="start"
      backBtn={false}
      content={<CostExplorerSection />}
      hover_card_content='Here you can view all the costs that have been incurred by your render farms. Brender Studio uses Cost Explorer to analyze the costs per stack.'
      hover_card_title='Cost Explorer'
      hover_card_children={<CostExplorerHoverCard />}
    />
  )
}

export default CostExplorerPage