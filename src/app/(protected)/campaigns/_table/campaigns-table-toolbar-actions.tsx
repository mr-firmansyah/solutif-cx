"use client";

import { type Table } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface CampaignsTableToolbarActionsProps {
	table?: Table<CampaignList>;
}

export function CampaignsTableToolbarActions({
	table,
}: CampaignsTableToolbarActionsProps) {
	return (
		<div className="flex items-center gap-2">
			<Button asChild size="sm">
				<Link href="/campaigns/create">
					<PlusIcon aria-hidden="true" className="mr-2 size-4" />
					Create Campaign
				</Link>
			</Button>
		</div>
	);
}
