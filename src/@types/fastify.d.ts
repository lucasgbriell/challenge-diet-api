import fastifyJwt from '@fastify/jwt'
import 'fastify'

declare module 'fastify' {
  interface FastifyReply {
    user?: fastifyJwt.VerifyPayloadType
  }
}
