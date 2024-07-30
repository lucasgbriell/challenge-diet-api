import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test')
  config({
    path: '.env.test',
  })

if (process.env.NODE_ENV !== 'test') config()

const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.coerce.number().default(3000),
  DATABASE_CLIENT: z.string(),
  DATABASE_URL: z.string(),
  API_TOKEN: z.string(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(_env.error.errors)
  throw new Error(_env.error.message)
}

export const env = _env.data
