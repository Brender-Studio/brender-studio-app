import React, { ReactNode } from "react";
import { BrenderTabsList, BrenderTabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Tab {
  value: string;
  label: string;
  content: ReactNode;
}

interface CustomTabsProps {
  tabs: Tab[];
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs }) => {
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full relative">
      <BrenderTabsList className="mx-auto w-full ">
        {tabs.map(tab => (
          <BrenderTabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </BrenderTabsTrigger>
        ))}
      </BrenderTabsList>
      <Separator className="absolute h-[1px] top-9 -z-10 bg-white/[0.05] left-0" />
      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="py-2">
            {tab.content}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
