"use client";

// import DataTableRowActions from "@/components/table/data-table-row-actions";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableRowAction } from "@/types";

interface CampaignsColumnProps {
	actions?: DataTableRowAction<CampaignList>[];
}

export function getColumns({
	actions,
}: CampaignsColumnProps = {}): ColumnDef<CampaignList>[] {
	return [
		{
			accessorKey: "campaignNumber",
			header: "Campaign ID",
			cell: ({ row, column }) => (
				<Link
					className="underline"
					href={`/campaigns/detail/${row.original.id}`}
				>
					{row.renderValue(column.id)}
				</Link>
			),
		},
		{
			accessorKey: "namaCampaign",
			header: "Nama",
		},
		{
			accessorKey: "category",
			header: "Kategori Campaign",
		},
		{
			accessorKey: "leadsCount",
			header: "Total Leads",
		},
		{
			accessorKey: "channel",
			header: "Channel",
		},
		{
			accessorKey: "planStartDate",
			header: "Start Date",
		},
		{
			accessorKey: "targetCloseDate",
			header: "End Date",
		},
		{
			accessorKey: "createdBy",
			header: "CreatedBy",
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<span className="rounded-full bg-gray-500 px-2 py-1 font-semibold text-white text-xs">
					{row.getValue("status")}
				</span>
			),
		},
		// {
		//   id: "actions",
		//   cell: ({ row }) => <DataTableRowActions row={row} actions={actions} />,
		//   size: 50,
		// },
	];
}
