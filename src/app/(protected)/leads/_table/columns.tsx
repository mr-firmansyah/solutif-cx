"use client";

// import DataTableRowActions from "@/components/table/data-table-row-actions";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableRowAction } from "@/types";

interface LeadsColumnProps {
  actions?: DataTableRowAction<LeadsListResponse>[];
}

// "id": "5bf1fb93-248f-46a8-a55e-f3f0bba11cba",
//                 "lead_number": "4553634",
//                 "name": "nama jeff",
//                 "phone_number": "089687913915",
//                 "email": "g@gg.com",
//                 "status": "closed"

export function getColumns({ actions }: LeadsColumnProps = {}): ColumnDef<LeadsListResponse>[] {
  return [
    {
      accessorKey: "lead_number",
      header: "Leads Number",
      cell: ({ row, column }) => (
        <Link
          className="underline"
          href={`/leads/detail/${row.original.id}`}
        >
          {row.renderValue(column.id)}
        </Link>
      ),
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "lead_type",
      header: "Tipe Leads",
    },
    {
      accessorKey: "campaign_name",
      header: "Nama Campaign",
    },
    {
      accessorKey: "campaign_category",
      header: "Nama Campaign",
    },
    {
      accessorKey: "channel",
      header: "Channel",
    },
    {
      accessorKey: "phone_number",
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
