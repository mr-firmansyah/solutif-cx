import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(5),
  name: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
})

export const getContactsSchema = searchParamsSchema

export type GetContactsSchema = z.infer<typeof getContactsSchema>