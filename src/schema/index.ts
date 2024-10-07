import { z } from "zod";

import { TaskSchema } from "./task";

const LoginSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(1, { message: "Password is required" }),
});

export { LoginSchema, TaskSchema };
