import fastify from 'fastify'
import jwt from '@fastify/jwt'

import { userRoute, mealRoute } from './routes'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { authenticate } from './middlewares/authenticate.middleware'
import { jwtConfig } from './configs/jwt.config'

export const app = fastify()

app.register(jwt, jwtConfig)

app.decorate('authenticate', authenticate)

app.register(userRoute, {
  prefix: '/user',
})

app.register(mealRoute, {
  prefix: '/meal',
})

app.setErrorHandler(errorHandler)
