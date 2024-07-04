import CpuHoverCard from "@/components/custom/hover-card-pages/CpuHoverCard"
import Section from "@/components/custom/structure/Section"
import FormAnimationSection from "@/features/render/render-forms/form-animation/FormAnimationSection"
import FormFrameSection from "@/features/render/render-forms/form-frame/FormFrameSection"
import FormPythonSection from "@/features/render/render-forms/form-pyhton/FormPythonSection"
import RenderSection from "@/features/render/RenderSection"

const RenderCpuPage = () => {

  return (
    <Section
      title="CPU Rendering"
      justify="start"
      backBtn={false}
      content={
        <RenderSection
          formFrame={<FormFrameSection />}
          formAnimation={<FormAnimationSection />}
          formPython={<FormPythonSection />}
        />
      }
      hover_card_content='Here you can configure the CPU rendering settings for your Blender projects.'
      hover_card_title='CPU Rendering'
      hover_card_children={<CpuHoverCard />}
    />
  )
}

export default RenderCpuPage
