import { z } from "zod";

const optionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional(),
});

export const TaskSchema = z.object({
	type: z.string().min(1, "Opty task type is required"),
	date: z.date().nullish(),
	startTime: z.date().nullish(),
	endTime: z.date().nullish(),
	priorityId: z.string().min(1, "Priority is required"),
	contactId: z.string().optional(),
	modelId: z.string().min(1, "Model is required"), // opportunity id
	description: z.string().min(1, "Description is required"),
	userId: z.array(optionSchema).min(1, "Assignee is required"),
	accountId: z.string().optional(),
});
