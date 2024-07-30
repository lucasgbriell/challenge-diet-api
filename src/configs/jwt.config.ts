import { env } from './env.config'

export const jwtConfig = {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '60m',
  },
}
