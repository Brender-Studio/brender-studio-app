import BuildsPage from "@/pages/BuildsPage"
import CostExplorerPage from "@/pages/CostExplorerPage"
import DeployStackPage from "@/pages/DeployStackPage"
import HomePage from "@/pages/HomePage"
import InstancesPage from "@/pages/InstancesPage"
import JobsPage from "@/pages/JobsPage"
import RendersPage from "@/pages/RendersPage"
import RenderCpuPage from "@/pages/RenderCpuPage"
import RenderGpuPage from "@/pages/RenderGpuPage"
import RepositoryPage from "@/pages/RepositoryPage"
import SettingsPage from "@/pages/SettingsPage"
import StackDetailPage from "@/pages/StackDetailPage"
import StacksPage from "@/pages/StacksPage"
import { Route, Routes } from "react-router-dom"
import ServiceQuotaPage from "@/pages/ServiceQuotaPage"
import EfsPage from "@/pages/EfsPage"
import EmailNotificationsPage from "@/pages/EmailNotificationsPage"
import TroubleshootingPage from "@/pages/TroubleshootingPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/render-cpu" element={<RenderCpuPage />} />
            <Route path="/render-gpu" element={<RenderGpuPage />} />
            <Route path="/stacks" element={<StacksPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/cost-explorer" element={<CostExplorerPage />} />
            <Route path="/stacks/:id" element={<StackDetailPage />} />
            <Route path="/renders" element={<RendersPage />} />
            <Route path="/renders/*" element={<RendersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="troubleshooting" element={<TroubleshootingPage />} />
            <Route path="/repository" element={<RepositoryPage />} />
            <Route path="/efs" element={<EfsPage />} />
            <Route path="/instances" element={<InstancesPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/email-notifications" element={<EmailNotificationsPage />} />
            <Route path="/service-quotas" element={<ServiceQuotaPage />} />
            <Route path="/stacks/deploy-stack" element={<DeployStackPage />} />
            <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
    )
}

export default AppRoutes