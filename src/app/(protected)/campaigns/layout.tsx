"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Tabs, TabList } from "@/components/ui/tabnav";
import { Shell } from "@/components/ui/shell";

const tabListPathname = [
  { pathname: "/campaigns/all-campaigns", label: "All Campaign", disabled: true },
  { pathname: "/campaigns", label: "My Campaign", disabled: false },
]

const CampaignTabs = () => {
  const pathname = usePathname();
  if (!tabListPathname.some((tab) => tab.pathname === pathname)) return null;

  return (
    <>
      <h2 className="mr-9">Campaign</h2>
      <Tabs className="w-[400px]">
        {tabListPathname.map((tab) => (
          <TabList active={pathname === tab.pathname} asChild disabled={tab.disabled} key={tab.pathname}>
            <Link href={tab.pathname}>{tab.label}</Link>
          </TabList>
        ))}
      </Tabs>
    </>
  );
};

const CampaignLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {tabListPathname.some((tab) => tab.pathname === pathname) ? (
        <Shell className="gap-4" label={<CampaignTabs />}>
          {children}
        </Shell>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  );
};

export default CampaignLayout;