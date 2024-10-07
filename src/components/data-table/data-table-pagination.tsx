import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
	table,
	pageSizeOptions = [5, 10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
			{/* <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
			<div className="lg:relative flex flex-col-reverse items-center justify-between w-full gap-4 sm:flex-row sm:gap-6 lg:gap-8">
				<div className="flex items-center space-x-2">
					<p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
					<Select
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
						value={`${table.getState().pagination.pageSize}`}
					>
						<SelectTrigger className="h-8 w-[4.5rem]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{pageSizeOptions.map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="lg:absolute flex items-center space-x-2 lg:transform lg:-translate-x-1/2 lg:left-1/2">
					<Button
						aria-label="Go to first page"
						className="hidden size-8 p-0 lg:flex"
						disabled={!table.getCanPreviousPage()}
						onClick={() => table.setPageIndex(0)}
						variant="outline"
					>
						<DoubleArrowLeftIcon aria-hidden="true" className="size-4" />
					</Button>
					<Button
						aria-label="Go to previous page"
						className="size-8"
						disabled={!table.getCanPreviousPage()}
						onClick={() => table.previousPage()}
						size="icon"
						variant="outline"
					>
						<ChevronLeftIcon aria-hidden="true" className="size-4" />
					</Button>
					{table.getPageOptions().map((page) => (
						<Button
							className="size-8"
							disabled={table.getState().pagination.pageIndex === page}
							key={page}
							onClick={() => table.setPageIndex(page)}
							size="icon"
							variant="outline"
						>
							{page + 1}
						</Button>
					))}
					<Button
						aria-label="Go to next page"
						className="size-8"
						disabled={!table.getCanNextPage()}
						onClick={() => table.nextPage()}
						size="icon"
						variant="outline"
					>
						<ChevronRightIcon aria-hidden="true" className="size-4" />
					</Button>
					<Button
						aria-label="Go to last page"
						className="hidden size-8 lg:flex"
						disabled={!table.getCanNextPage()}
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						size="icon"
						variant="outline"
					>
						<DoubleArrowRightIcon aria-hidden="true" className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</div>
			</div>
		</div>
	);
}
