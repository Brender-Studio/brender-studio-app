import JobsHoverCard from "@/components/custom/hover-card-pages/JobsHoverCard"
import Section from "@/components/custom/structure/Section"
import JobSection from "@/features/jobs/JobSection"

const JobsPage = () => {

  return (
    <Section
      title="Render Jobs"
      justify="start"
      backBtn={false}
      content={<JobSection />}
      hover_card_content='Here you can view the jobs that have been triggered.'
      hover_card_title='Render Jobs'
      hover_card_children={<JobsHoverCard />}
    />
  )
}

export default JobsPage
