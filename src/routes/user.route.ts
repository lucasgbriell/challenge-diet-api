import { FastifyInstance, FastifyReply } from 'fastify'
import { UserController } from '../controllers'
import { authenticate } from '../middlewares/authenticate.middleware'

const userController = new UserController()

export async function userRoute(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    return userController.create(request, reply)
  })

  app.put(
    '/',
    {
      preHandler: [authenticate],
    },
    async (request, reply) => {
      return userController.update(request, reply)
    },
  )

  app.delete(
    '/',
    {
      preHandler: [authenticate],
    },
    async (request, reply) => {
      return userController.delete(reply)
    },
  )

  app.post('/login', async (request, reply) => {
    return userController.login(request, reply)
  })

  app.get(
    '/me',
    {
      preHandler: [authenticate],
    },
    async (request, reply: FastifyReply) => {
      return userController.me(reply)
    },
  )
}
