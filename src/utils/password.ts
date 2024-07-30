import { pbkdf2Sync } from 'crypto'
import { env } from '../configs/env.config'

export function generatePassword(password: string) {
  const salt = env.API_TOKEN
  const genHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString(
    'hex',
  )
  return genHash
}

export function validatePassword(password: string, hash: string) {
  const salt = env.API_TOKEN
  const hashVerify = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString(
    'hex',
  )
  return hash === hashVerify
}
