import { z } from 'zod'

export const MealCreateRequest = z
  .object({
    name: z.string(),
    description: z.string(),
    diet: z.boolean().default(false),
  })
  .strict()

export const MealUpdateRequest = z
  .object({
    name: z.string().nullable(),
    description: z.string().nullable(),
    diet: z.boolean().default(false).nullable(),
  })
  .partial()
  .strict()

export const MealGetOneRequest = z.object({
  id: z.coerce.number(),
})

export type MealCreateRequest = z.infer<typeof MealCreateRequest>
export type MealUpdateRequest = z.infer<typeof MealUpdateRequest>
