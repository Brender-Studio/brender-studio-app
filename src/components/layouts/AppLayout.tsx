import { useLocation } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import Footer from "../navigation/Footer";
import { ScrollArea } from "../ui/scroll-area";
import useSession from "@/hooks/useSession";
import WelcomeDialog from "@/features/home/welcome-dialog/WelcomeDialog";
import BannerHome from "@/features/home/banner-home/BannerHome";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    const currentPath = useLocation().pathname;
    const [isCollapsed, setIsCollapsed] = useState(false)
    useSession()
    const layout = Cookies.get("react-resizable-panels:layout")

    const defaultLayout = layout ? JSON.parse(layout) : [18, 80]

    return (
        <div className="h-screen">
            <WelcomeDialog />
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full items-stretch"
            >
                <ResizablePanel
                    onCollapse={(collapsed) => {
                        setIsCollapsed(collapsed)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            collapsed
                        )}`
                    }}
                    minSize={18}
                    maxSize={18}
                    collapsedSize={1}
                    defaultSize={defaultLayout[0]}
                    collapsible={true}
                    className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                >
                    <div className="flex h-full bg-card">
                        <Sidebar isCollapsed={isCollapsed} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="relative">
                    <Navbar />
                    <ScrollArea
                        style={currentPath === "/" ? { height: "calc(100vh" } : { height: "100%" }}
                    >
                        {currentPath === "/" && <BannerHome />}
                        <div className="px-12 py-8 w-full mx-auto max-w-[1300px]">
                            {children}
                        </div>
                    </ScrollArea>
                    <Footer />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default AppLayout;
