"use memo";

import * as React from "react";

import type { SearchParams } from "@/types";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/ui/shell";
import { searchParamsSchema } from "@/app/(protected)/service-request/_table/validations";
import { getContacts } from "@/actions/contact";

import { ContactsTable } from "./_table/contacts-table";

export interface ContactPageProps {
	searchParams: SearchParams;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
	const search = searchParamsSchema.parse(searchParams);

	const contactPromise = getContacts(search);
	return (
		<Shell className="gap-2" label="Contacts">
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
				<ContactsTable contactsPromise={contactPromise} />
			</React.Suspense>
		</Shell>
	);
}
