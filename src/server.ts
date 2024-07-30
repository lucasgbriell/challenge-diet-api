import { app } from './app'
import { env } from './configs/env.config'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server listening at ${env.PORT}`)
  })
