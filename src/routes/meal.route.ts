import { FastifyInstance } from 'fastify'
import { MealController } from '../controllers'
import { authenticate } from '../middlewares/authenticate.middleware'

const mealController = new MealController()

export async function mealRoute(app: FastifyInstance) {
  app.addHook('onRequest', authenticate)

  app.get('/:id', async (request, reply) => {
    return mealController.get(request, reply)
  })

  app.get('/', async (request, reply) => {
    return mealController.getAll(reply)
  })

  app.post('/', async (request, reply) => {
    return mealController.create(request, reply)
  })

  app.put('/:id', async (request, reply) => {
    return mealController.update(request, reply)
  })

  app.delete('/:id', async (request, reply) => {
    return mealController.delete(request, reply)
  })

  app.get('/summary', async (request, reply) => {
    return mealController.summary(reply)
  })
}
