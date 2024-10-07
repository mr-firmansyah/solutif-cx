"use client";

// import DataTableRowActions from "@/components/table/data-table-row-actions";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableRowAction } from "@/types";

export type Ticket = {
	ticketCode: string;
	title: string;
	status: "New" | "In Progress" | "Resolved" | "Reopen" | "Closed";
	label: string;
	priority: "Critical" | "High" | "Medium" | "Low";
	targetResolutionDate: string;
	companyName: string;
	projectName: string;
	contactName: string;
	requestDate: string;
};

interface TicketsColumnProps {
	actions?: DataTableRowAction<Ticket>[];
}

export function getColumns({
	actions,
}: TicketsColumnProps = {}): ColumnDef<Ticket>[] {
	return [
		{
			accessorKey: "ticketCode",
			header: "Ticket No",
			cell: ({ row }) => (
				<Link
					className="underline"
					href={`/service-request/detail/${row.getValue("ticket_code")}`}
				>
					{row.getValue("ticket_code")}
				</Link>
			),
		},
		{
			accessorKey: "priority",
			header: "Priority",
		},
		{
			accessorKey: "targetResolutionDate",
			header: "Due Date",
		},
		{
			accessorKey: "companyName",
			header: "Company Name",
		},
		{
			accessorKey: "projectName",
			header: "Project Name",
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
		{
			accessorKey: "contactName",
			header: "Contact Name",
		},
		{
			accessorKey: "requestDate",
			header: "Request Date",
		},
		// {
		//   id: "actions",
		//   cell: ({ row }) => <DataTableRowActions row={row} actions={actions} />,
		//   size: 50,
		// },
	];
}
