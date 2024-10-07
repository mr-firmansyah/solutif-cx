"use client";

import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import type { DataTableFilterField } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";

import { DateRangePicker } from "../ui/datepicker-range";
// import { DataTableViewOptions } from "@/components/ui/data-table/data-table-view-options"

interface DataTableToolbarProps<TData>
	extends React.HTMLAttributes<HTMLDivElement> {
	table: Table<TData>;
	filterFields?: DataTableFilterField<TData>[];
	withDateRangePicker?: boolean;
}

export function DataTableToolbar<TData>({
	table,
	filterFields = [],
	children,
	className,
	withDateRangePicker = false,
	...props
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	// Memoize computation of searchableColumns and filterableColumns
	const { searchableColumns, filterableColumns } = React.useMemo(() => {
		return {
			searchableColumns: filterFields.filter((field) => !field.options),
			filterableColumns: filterFields.filter((field) => field.options),
		};
	}, [filterFields]);

	return (
		<div
			className={cn(
				"flex w-full items-center justify-between space-x-2 overflow-auto p-1",
				className,
			)}
			{...props}
		>
			<div className="flex flex-1 items-center space-x-2">
				{searchableColumns.length > 0 &&
					searchableColumns.map(
						(column) =>
							table.getColumn(column.value ? String(column.value) : "") && (
								<Input
									className="h-8 w-40 lg:w-64"
									key={String(column.value)}
									onChange={(event) =>
										table
											.getColumn(String(column.value))
											?.setFilterValue(event.target.value)
									}
									placeholder={column.placeholder}
									value={
										(table
											.getColumn(String(column.value))
											?.getFilterValue() as string) ?? ""
									}
								/>
							),
					)}
				{filterableColumns.length > 0 &&
					filterableColumns.map(
						(column) =>
							table.getColumn(column.value ? String(column.value) : "") && (
								<DataTableFacetedFilter
									column={table.getColumn(
										column.value ? String(column.value) : "",
									)}
									key={String(column.value)}
									options={column.options ?? []}
									title={column.label}
								/>
							),
					)}
				{withDateRangePicker && (
					<DateRangePicker
						align="end"
						triggerClassName="ml-auto w-56 sm:w-60"
						triggerSize="sm"
					/>
				)}
				{isFiltered && (
					<Button
						aria-label="Reset filters"
						className="h-8 px-2 lg:px-3"
						onClick={() => table.resetColumnFilters()}
						variant="ghost"
					>
						Reset
						<Cross2Icon aria-hidden="true" className="ml-2 size-4" />
					</Button>
				)}
			</div>
			<div className="flex items-center gap-2">
				{children}
				{/* <DataTableViewOptions table={table} /> */}
			</div>
		</div>
	);
}
