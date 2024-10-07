"use client";
"use memo";

import * as React from "react";

import { type DataTableFilterField } from "@/types";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableRowAction } from "@/types";

import { getColumns } from "./columns";
import { CampaignsTableToolbarActions } from "./campaigns-table-toolbar-actions";

interface CampaignsTableProps {
	campaignsPromise: Promise<{ data: any; pageCount: number }>;
	actions?: DataTableRowAction<CampaignList>[];
}

export function CampaignsTable({
	campaignsPromise,
	actions,
}: CampaignsTableProps) {
	const { data, pageCount } = React.use(campaignsPromise);

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
	const filterFields: DataTableFilterField<CampaignList>[] = [
		{
			label: "Name",
			value: "namaCampaign",
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
			<DataTableToolbar
				filterFields={filterFields}
				table={table}
				withDateRangePicker
			>
				<CampaignsTableToolbarActions table={table} />
			</DataTableToolbar>
		</DataTable>
	);
}
