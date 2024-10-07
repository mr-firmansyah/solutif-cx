import * as z from "zod";

export const searchParamsSchema = z.object({
	page: z.coerce.number().default(1),
	per_page: z.coerce.number().default(5),
	ticketCode: z.string().optional(),
	dateFrom: z.string().optional(),
	dateTo: z.string().optional(),
});

export const getTicketsSchema = searchParamsSchema;

export type GetTicketsSchema = z.infer<typeof getTicketsSchema>;

// export const createTaskSchema = z.object({
//   title: z.string(),
//   label: z.enum(tasks.label.enumValues),
//   status: z.enum(tasks.status.enumValues),
//   priority: z.enum(tasks.priority.enumValues),
// })

// export type CreateTaskSchema = z.infer<typeof createTaskSchema>

// export const updateTaskSchema = z.object({
//   title: z.string().optional(),
//   label: z.enum(tasks.label.enumValues).optional(),
//   status: z.enum(tasks.status.enumValues).optional(),
//   priority: z.enum(tasks.priority.enumValues).optional(),
// })

// export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
