"use client";
"use memo";

import * as React from "react";

import { type DataTableFilterField } from "@/types";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableRowAction } from "@/types";

import { getColumns } from "./columns";
import { ContactsTableToolbarActions } from "./contacts-table-toolbar-actions";

interface ContactsTableProps {
  contactsPromise: Promise<{ data: any; pageCount: number }>;
  // ContactsPromise: { data: any; pageCount: number };
  actions?: DataTableRowAction<ContactList>[];
}

export function ContactsTable({ contactsPromise, actions }: ContactsTableProps) {
  const { data, pageCount } = React.use(contactsPromise);

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
  const filterFields: DataTableFilterField<ContactList>[] = [
    {
      label: "Ticket",
      value: "name",
      placeholder: "Filter name...",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    /* optional props */
    filterFields,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar filterFields={filterFields} table={table} withDateRangePicker>
        <ContactsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
