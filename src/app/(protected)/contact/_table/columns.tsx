"use client";

// import DataTableRowActions from "@/components/table/data-table-row-actions";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableRowAction } from "@/types";

interface ContactsColumnProps {
  actions?: DataTableRowAction<ContactListResponse>[];
}

export function getColumns({ actions }: ContactsColumnProps = {}): ColumnDef<ContactListResponse>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row, column }) => (
        <Link
          className="underline"
          href={`/company/detail/${row.original.id}`}
        >
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
        <span className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-full">
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
