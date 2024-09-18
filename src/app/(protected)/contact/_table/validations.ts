import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(5),
  name: z.string().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
})

export const getContactsSchema = searchParamsSchema

export type GetContactsSchema = z.infer<typeof getContactsSchema>