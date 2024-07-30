import { FastifyRequest } from 'fastify'
import { HttpError } from '../errors/http.error'
import { FastifyReply } from 'fastify/types/reply'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = await request.jwtVerify()

    if (user) reply.user = user
  } catch (err) {
    throw new HttpError(401, 'Unauthorized')
  }
}
