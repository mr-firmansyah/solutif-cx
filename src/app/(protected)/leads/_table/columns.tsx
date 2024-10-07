"use client";

// import DataTableRowActions from "@/components/table/data-table-row-actions";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableRowAction } from "@/types";

interface LeadsColumnProps {
	actions?: DataTableRowAction<LeadsList>[];
}

export function getColumns({
	actions,
}: LeadsColumnProps = {}): ColumnDef<LeadsList>[] {
	return [
		{
			accessorKey: "leadNumber",
			header: "Leads Number",
			cell: ({ row, column }) => (
				<Link className="underline" href={`/leads/detail/${row.original.id}`}>
					{row.renderValue(column.id)}
				</Link>
			),
		},
		{
			accessorKey: "name",
			header: "Nama",
		},
		{
			accessorKey: "type",
			header: "Tipe Leads",
		},
		{
			accessorKey: "campaignName",
			header: "Nama Campaign",
		},
		{
			accessorKey: "channel",
			header: "Channel",
		},
		{
			accessorKey: "phoneNumber",
			header: "No. Handphone",
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<span className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-full">
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
