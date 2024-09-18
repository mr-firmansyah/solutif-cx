"use client";

// import DataTableRowActions from "@/components/table/data-table-row-actions";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableRowAction } from "@/types";

export type Ticket = {
  ticket_code: string;
  title: string;
  status: "New" | "In Progress" | "Resolved" | "Reopen" | "Closed";
  label: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  target_resolution_date: string;
  company_name: string;
  project_name: string;
  contact_name: string;
  request_date: string;
};

interface TicketsColumnProps {
  actions?: DataTableRowAction<Ticket>[];
}

export function getColumns({ actions }: TicketsColumnProps = {}): ColumnDef<Ticket>[] {
  return [
    {
      accessorKey: "ticket_code",
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
      accessorKey: "target_resolution_date",
      header: "Due Date",
    },
    {
      accessorKey: "company_name",
      header: "Company Name",
    },
    {
      accessorKey: "project_name",
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
      accessorKey: "contact_name",
      header: "Contact Name",
    },
    {
      accessorKey: "request_date",
      header: "Request Date",
    },
    // {
    //   id: "actions",
    //   cell: ({ row }) => <DataTableRowActions row={row} actions={actions} />,
    //   size: 50,
    // },
  ];
}
