import Section from "@/components/custom/structure/Section"
import Settings from "@/features/settings/Settings"

const SettingsPage = () => {
  return (
    <Section
      title="Settings"
      tooltip_description="Configure your application settings. CLI profile, region, and other settings can be configured here."
      justify="start"
      backBtn={false}
      content={<Settings />}
    />
  )
}

export default SettingsPage