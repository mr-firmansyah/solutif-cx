"use client";
"use memo";

import * as React from "react";

import { type DataTableFilterField } from "@/types";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableRowAction } from "@/types";

import { getColumns } from "./columns";
import { LeadsTableToolbarActions } from "./leads-table-toolbar-actions";

interface LeadsTableProps {
  leadsPromise: Promise<{ data: any; pageCount: number }>;
  // LeadsPromise: { data: any; pageCount: number };
  actions?: DataTableRowAction<LeadsList>[];
}

const statusOptions = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Closed", value: "closed" },
]

export function LeadsTable({ leadsPromise, actions }: LeadsTableProps) {
  const { data, pageCount } = React.use(leadsPromise);

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<LeadsList>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter name...",
    },
    {
      label: "Status",
      value: "status",
      options: statusOptions.map((status) => ({
        label: status.label,
        value: status.value,
        withCount: true,
      })),
    },
    // {
    //   label: "Priority",
    //   value: "priority",
    //   options: tasks.priority.enumValues.map((priority) => ({
    //     label: priority[0]?.toUpperCase() + priority.slice(1),
    //     value: priority,
    //     icon: getPriorityIcon(priority),
    //     withCount: true,
    //   })),
    // },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      // sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar filterFields={filterFields} table={table} withDateRangePicker>
        <LeadsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
