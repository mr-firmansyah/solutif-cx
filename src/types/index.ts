import { type Row } from "@tanstack/react-table";

export interface Option {
	label: string;
	value: string;
	icon?: React.ComponentType<{ className?: string }>;
	withCount?: boolean;
}

export interface DataTableFilterField<TData> {
	label: string;
	value: keyof TData;
	placeholder?: string;
	options?: Option[];
}

export interface DataTableFilterOption<TData> {
	id: string;
	label: string;
	value: keyof TData;
	options: Option[];
	filterValues?: string[];
	filterOperator?: string;
	isMulti?: boolean;
}

export interface DataTableRowAction<TData> {
	label: string;
	onClick: (row: Row<TData>) => void;
}

export interface SearchParams {
	[key: string]: string | string[] | undefined;
}

export type TSelect = {
	value: string;
	label?: string;
};
