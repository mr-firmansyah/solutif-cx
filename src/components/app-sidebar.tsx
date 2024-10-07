"use client";

import { useSession } from "next-auth/react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
// import { TeamSwitcher } from "@/components/team-switcher";
import { data } from "@/router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarItem,
	// SidebarLabel,
} from "@/components/ui/sidebar";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function AppSidebar() {
	const { data: session } = useSession();

	let activeRoute = {} as typeof data;
	if (session?.user.permissions.includes("*")) {
		activeRoute = data;
	} else if (session?.user.permissions.includes(".get")) {
		const filteredData = data.navMain.filter((item) =>
			session?.user.permissions.includes(item.permission),
		);

		activeRoute = {
			...data,
			navMain: filteredData,
		};
	}

	return (
		<Sidebar>
			<SidebarHeader>
				{/* THIS WILL BE A LOGO SECTION */}
				{/* ------------------------------- */}
				{/* <TeamSwitcher teams={activeRoute.teams} /> */}
			</SidebarHeader>
			<SidebarContent>
				<SidebarItem>
					{/* <SidebarLabel>{session?.user.name}</SidebarLabel> */}
					<NavMain items={activeRoute.navMain} />
				</SidebarItem>
				{/* <SidebarItem>
          <SidebarLabel>Projects</SidebarLabel>
          <NavProjects projects={data.projects} />
        </SidebarItem> */}
				<SidebarItem className="mt-auto">
					{/* <SidebarLabel>Help</SidebarLabel> */}
					<NavSecondary items={activeRoute.navSecondary} />
				</SidebarItem>
			</SidebarContent>
			<SidebarFooter>
				<Card className="w-full shadow-sm">
					<CardHeader className="p-2 md:p-4">
						<CardTitle>SolutifCX</CardTitle>
						<CardDescription>Telesales License</CardDescription>
					</CardHeader>
				</Card>
			</SidebarFooter>
		</Sidebar>
	);
}
