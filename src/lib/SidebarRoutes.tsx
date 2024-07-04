import { Container, Cpu, CreditCard, Folders, Hammer, Home, Image, InfoIcon, Layers2, MailCheck, Server, ServerCog, Settings2, TrendingUp } from "lucide-react";
import GpuIcon from "@/components/custom/icons/GpuIcon";

export const topRoutes = [
    {
        path: "/",
        name: "Home",
        icon: <Home size={16} />,
        exact: true
    },
    {
        path: "/render-cpu",
        name: "CPU Rendering",
        icon: <Cpu size={16} />,
        exact: true
    },
    {
        path: "/render-gpu",
        name: "GPU Rendering",
        icon: <GpuIcon />,
        exact: true
    },
    {
        path: "/renders",
        name: "Render Projects",
        icon: <Image size={16} />,
        exact: true
    },
    {
        path: "/jobs",
        name: "Render Jobs",
        icon: <ServerCog size={16} />,
        exact: true
    },
    {
        path: "/instances",
        name: "Servers (EC2)",
        icon: <Server size={16} />,
        exact: true
    },
    {
        path: "/stacks",
        name: "Farms (Stacks)",
        icon: <Layers2 size={16} />,
        exact: true
    },
    {
        path: "/efs",
        name: "File System (EFS)",
        icon: <Folders size={16} />,
        exact: true
    },
    {
        path: "/repository",
        name: "Blender Repository (ECR)",
        icon: <Container size={16} />,
        exact: true
    },
    {
        path: "/builds",
        name: "Farm Builds (CodeBuild)",
        icon: <Hammer size={16} />,
        exact: true
    },
    {
        path: "/email-notifications",
        name: "Email Notifications",
        icon: <MailCheck size={16} />,
        exact: true
    }
];

export const bottomRoutes = [
    {
        path: "/service-quotas",
        name: "EC2 - Service Quotas",
        icon: <TrendingUp size={16} />,
        exact: true
    },
    {
        path: "/cost-explorer",
        name: "Cost Explorer",
        icon: <CreditCard size={16} />,
        exact: true
    },
    {
        path: "/troubleshooting",
        name: "Troubleshooting",
        icon: <InfoIcon size={16} />,
        exact: true
    },
    {
        path: "/settings",
        name: "Settings",
        icon: <Settings2 size={16} />,
        exact: true
    },
];
