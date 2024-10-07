import * as z from "zod";

export const searchParamsSchema = z.object({
	page: z.coerce.number().default(1),
	per_page: z.coerce.number().default(5),
	name: z.string().optional(),
	dateFrom: z.string().optional(),
	dateTo: z.string().optional(),
});

export const getLeadsSchema = searchParamsSchema;

export type GetLeadsSchema = z.infer<typeof getLeadsSchema>;
