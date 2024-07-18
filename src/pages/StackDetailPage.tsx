import Section from "@/components/custom/structure/Section"
import StackDetail from "@/features/stacks/stack-detail/StackDetail"
import { useLocation } from "react-router-dom"

const StackDetailPage = () => {
  const currentPath = useLocation().pathname
  // console.log(currentPath)

  const stackId = currentPath.split("/")[2].toLocaleUpperCase()
  // console.log(stackId)

  return (
    <Section
      title={stackId}
      justify="start"
      backBtn={true}
      content={<StackDetail />}
      hover_card_content='Here you can view the resources in the stack. Storage, compute, and other resources are displayed here.'
      hover_card_title='Stack Detail'

    />
  )
}

export default StackDetailPage