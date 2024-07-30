import { z } from 'zod'

export const UserCreateRequest = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict()

export const UserUpdateRequest = z
  .object({
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    password: z.string().min(8).nullable(),
  })
  .partial()
  .strict()

export const UserLoginRequest = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict()

export type UserCreateRequest = z.infer<typeof UserCreateRequest>
export type UserUpdateRequest = z.infer<typeof UserUpdateRequest>
export type UserLoginRequest = z.infer<typeof UserLoginRequest>
