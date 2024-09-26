"use memo";

import * as React from "react";

import type { SearchParams } from "@/types";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/ui/shell";
import { searchParamsSchema } from "@/app/(protected)/leads/_table/validations";
import { getLeads } from "@/actions/lead";

import { LeadsTable } from "./_table/leads-table";

export interface LeadPageProps {
  searchParams: SearchParams;
}

export default async function LeadPage({ searchParams }: LeadPageProps) {
  const search = searchParamsSchema.parse(searchParams);

  const leadPromise = getLeads(search);
  return (
    <Shell className="gap-2" label="Leads">
      {/**
       * The `TasksTableProvider` is use to enable some feature flags for the `TasksTable` component.
       * Feel free to remove this, as it's not required for the `TasksTable` component to work.
       */}
      {/**
       * The `DateRangePicker` component is used to render the date range picker UI.
       * It is used to filter the tasks based on the selected date range it was created at.
       * The business logic for filtering the tasks based on the selected date range is handled inside the component.
       */}
      <React.Suspense
        fallback={
          <DataTableSkeleton
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            columnCount={5}
            filterableColumnCount={2}
            searchableColumnCount={1}
            shrinkZero
          />
        }
      >
        {/**
         * Passing promises and consuming them using React.use for triggering the suspense fallback.
         * @see https://react.dev/reference/react/use
         */}
        <LeadsTable leadsPromise={leadPromise} />
      </React.Suspense>
    </Shell>
  );
}
