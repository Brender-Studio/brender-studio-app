import CodebuildNotifications from "../../features/notifications/codebuild-notifications/CodebuildNotifications"
import Ec2Notifications from "@/features/notifications/ec2-notifications/Ec2Notifications"
import AppMenuDropdown from "../custom/dropdowns/AppMenuDropdown"


const Navbar = () => {
  return (
    <nav className="absolute top-0 h-14 right-0 flex items-center justify-end z-20">
      <div className="flex gap-2 px-4">
        <CodebuildNotifications />
        <Ec2Notifications />
        <AppMenuDropdown />
      </div>
    </nav>
  )
}

export default Navbar