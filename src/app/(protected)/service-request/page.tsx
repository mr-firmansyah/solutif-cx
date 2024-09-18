"use memo";

import * as React from "react";

import { type SearchParams } from "@/types";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/ui/shell";
import { searchParamsSchema } from "@/app/(protected)/service-request/_table/validations";

export interface TicketPageProps {
  searchParams: SearchParams;
}

export default async function TicketPage({ searchParams }: TicketPageProps) {
  const search = searchParamsSchema.parse(searchParams);

  {/**
    * Lazy load the TicketsTable component to reduce the initial bundle size.
    * @see https://react.dev/docs/react/lazy

    * Lazy load the ticket action to reduce the initial bundle size.
  */}
  const TicketsTable = React.lazy(() => import("./_table/tickets-table"));
  const ticketPromise = import("@/actions/ticket").then((module) => module.getTickets(search));

  return (
    <Shell className="gap-2" label="Tickets">
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
        <TicketsTable ticketsPromise={ticketPromise} />
      </React.Suspense>
    </Shell>
  );
}
