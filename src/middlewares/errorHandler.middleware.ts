import { FastifyReply, FastifyRequest } from 'fastify'
import { HttpError } from '../@types/http'

export function errorHandler(
  error: HttpError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const status = error.statusCode || 500
  reply.status(status).send({
    error: {
      message: error.message,
      status,
      moreInfo: error.moreInfo,
    },
  })
}
