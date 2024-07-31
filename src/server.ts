import { app } from './app'
import { env } from './configs/env.config'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server listening at ${env.PORT}`)
  })
