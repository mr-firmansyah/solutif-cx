import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout } from "@/components/ui/sidebar";
import { authOptions } from '@/auth';

export default async function ProtectedPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cookies } = await import("next/headers");
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    // <GenesysProvider>
      <SidebarLayout
        defaultOpen={cookies().get("sidebar:state")?.value === "true"}
      >
        <AppSidebar />
        <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
          <AppHeader />
          <main>{children}</main>
        </div>
      </SidebarLayout>
    // </GenesysProvider>
  );
}
