"use memo";

import * as React from "react";

import type { SearchParams } from "@/types";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { searchParamsSchema } from "@/app/(protected)/campaigns/_table/validations";
import { getCampaigns } from "@/actions/campaign";

import { CampaignsTable } from "./_table/campaigns-table";



export interface CampaignPageProps {
  searchParams: SearchParams;
}

export default async function CampaignPage({ searchParams }: CampaignPageProps) {
  const search = searchParamsSchema.parse(searchParams);

  const campaignPromise = getCampaigns(search);
  return (
    <>
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
        <CampaignsTable campaignsPromise={campaignPromise} />
      </React.Suspense>
    </>
  );
}
