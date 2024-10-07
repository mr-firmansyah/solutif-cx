"use client";

// import DataTableRowActions from "@/components/table/data-table-row-actions";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableRowAction } from "@/types";

interface ContactsColumnProps {
	actions?: DataTableRowAction<ContactList>[];
}

export function getColumns({
	actions,
}: ContactsColumnProps = {}): ColumnDef<ContactList>[] {
	return [
		{
			accessorKey: "name",
			header: "Name",
			cell: ({ row, column }) => (
				<Link className="underline" href={`/company/detail/${row.original.id}`}>
					{row.renderValue(column.id)}
				</Link>
			),
		},
		{
			accessorKey: "emails",
			header: "Email",
		},
		{
			accessorKey: "company",
			header: "Account Name",
		},
		{
			accessorKey: "contactNumbers",
			header: "Phone Number",
		},
		{
			accessorKey: "lifecycleStage",
			header: "Status",
			cell: ({ row }) => (
				<span className="rounded-full bg-gray-500 px-2 py-1 font-semibold text-white text-xs">
					{row.getValue("lifecycleStage")}
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
