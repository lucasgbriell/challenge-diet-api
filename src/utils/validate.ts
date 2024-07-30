import { FastifyRequest } from 'fastify'
import { ZodSchema } from 'zod'
import { HttpError } from '../errors/http.error'

export const Validate = (schema: ZodSchema, request: FastifyRequest) => {
  const result = schema.safeParse(request.body)

  if (!result.success) {
    throw new HttpError(400, 'Validation failed', result.error.errors)
  }

  return result.data
}
