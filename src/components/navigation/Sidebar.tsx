import { SidebarButton } from "@/components/ui/button"
import { bottomRoutes, topRoutes } from "@/lib/SidebarRoutes"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "@/assets/logo-brender-studio.svg"
import { Separator } from "@/components/ui/separator"
import React, { useEffect } from "react"
import { useFormStore } from "@/store/useFormStore"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { getVersion } from '@tauri-apps/api/app';
import useGetEc2NotificationQuery from "@/react-query-utils/queries/ec2-queries/useGetEc2NotificationQuery"
import { Ec2Instances } from "@/features/instances/list-instances/columns"

interface SidebarProps {
  isCollapsed: boolean
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const { clearAllFormStates, setIsFolder } = useFormStore()
  const [appVersion, setAppVersion] = React.useState<string>("0.0.0")

  const { data: runningEc2Instances } = useGetEc2NotificationQuery();



  const navigate = useNavigate()
  const currentPath = useLocation().pathname

  const handleNavigate = (path: string) => {
    navigate(path)
    clearAllFormStates()
    setIsFolder(false)
  }

  const handleGetVersion = async () => {
    const version = await getVersion()
    console.log(version)
    setAppVersion(version)
  }

  useEffect(() => {
    handleGetVersion()
  }, [])

  const runningInstances = Array.isArray(runningEc2Instances) ? runningEc2Instances.filter((instance: Ec2Instances) => instance.instanceStatus.toUpperCase() === 'RUNNING') : [];


  return (
    <div className="no-select flex flex-col w-full">
      <div className="py-3">
        <div className={isCollapsed ? "px-2 flex items-center justify-center" : "flex items-center justify-between px-2 ml-[0.30rem]"}>
          <img src={logo} alt="Logo" className="h-6 min-w-6" />
          <small className={isCollapsed ? "hidden" : "text-muted-foreground mr-2"}>
            {appVersion ? `v${appVersion}` : "v0.0.0"}
          </small>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-y-auto justify-between">
        <div>
          {topRoutes.map((route, index) => (
            <React.Fragment key={index}>
              <Tooltip>
                <TooltipTrigger asChild className="mt-1">
                  <SidebarButton
                    className={`relative w-full rounded-none ${currentPath === route.path || currentPath.startsWith(`${route.path}/`) ? "bg-accent text-white border border-l-2 border-l-brand" : "font-normal text-muted-foreground"}`}
                    variant={currentPath === route.path || currentPath.startsWith(`${route.path}/`) ? "secondary" : "ghost" as any}
                    key={index}
                    onClick={() => handleNavigate(route.path)}
                  >
                    <div className="mr-2">
                      {route.icon}
                    </div>
                    {!isCollapsed && (
                      <p style={{ whiteSpace: "nowrap" }}>
                        {route.name}
                      </p>

                    )}
                    {
                      route.name === 'Servers (EC2)' && runningInstances && runningInstances?.length > 0 && (
                        <div className="absolute top-4 right-3">
                          <div className="relative text-xs flex items-center justify-center w-2 h-2 bg-red-500 rounded-full">
                            <div className='absolute w-4 h-4 flex items-center justify-center bg-red-500/20 animate-pulse rounded-full' />
                          </div>
                        </div>
                      )
                    }
                  </SidebarButton>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent align="start" className="ml-2 rounded-sm">
                    <p className="text-xs">{route.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
              {index === 0 && <Separator className="my-2" />}
              {index === 3 && <Separator className="my-2" />}
              {index === 5 && <Separator className="my-2" />}

            </React.Fragment>
          ))}

        </div>
        <div className="pb-6">
          <Separator className="my-2" />
          {bottomRoutes.map((route, index) => (
            <React.Fragment key={index}>
              <Tooltip>
                <TooltipTrigger asChild className="mt-1">
                  <SidebarButton
                    className={`w-full rounded-none ${currentPath === route.path ? "bg-accent text-white border border-l-2 border-l-brand" : "font-normal text-muted-foreground"}`}
                    variant={currentPath === route.path ? "secondary" : "ghost" as any}
                    key={index}
                    onClick={() => handleNavigate(route.path)}
                  >
                    <div className="mr-2">
                      {route.icon}
                    </div>
                    {!isCollapsed && (
                      <p style={{ whiteSpace: "nowrap" }}>
                        {route.name}
                      </p>
                    )}
                  </SidebarButton>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent align="start" className="ml-2 rounded-sm">
                    <p className="text-xs">{route.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar