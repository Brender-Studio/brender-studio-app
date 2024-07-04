import React, { ReactNode } from "react";
import { BrenderTabsList, BrenderTabsTriggerVertical, Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface Tab {
  value: string;
  label: string;
  content: ReactNode;
}

interface PythonGuideTabsProps {
  tabs: Tab[];
}

const PythonGuideTabs: React.FC<PythonGuideTabsProps>  = ({ tabs }) => {
    return (
        <Tabs defaultValue={tabs[0].value} className="w-full flex pt-4 gap-8">
            <BrenderTabsList className="flex flex-col justify-start items-start">
                {tabs.map(tab => (
                    <BrenderTabsTriggerVertical key={tab.value} value={tab.value}>
                        {tab.label}
                    </BrenderTabsTriggerVertical>
                ))}
            </BrenderTabsList>
            {tabs.map(tab => (
                <TabsContent key={tab.value} value={tab.value}>
                    <Card className="p-6  max-h-[75vh] overflow-y-auto bg-black/[0.08]">
                        {tab.content}
                    </Card>
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default PythonGuideTabs