import { FastifyReply } from 'fastify'
import {
  UserCreateRequest,
  UserLoginRequest,
  UserUpdateRequest,
} from '../model'
import { UserRepository } from '../repositories'
import { generatePassword, validatePassword } from '../utils/password'
import { HttpError } from '../errors/http.error'

export class UserService {
  #userRepository

  constructor() {
    this.#userRepository = new UserRepository()
  }

  async create(request: UserCreateRequest, reply: FastifyReply) {
    const userData = {
      ...request,
      password: generatePassword(request.password),
    }

    try {
      await this.#userRepository.create(userData)
      return reply.status(201).send({ message: 'User created' })
    } catch (error) {
      throw new HttpError(409, 'User already exists')
    }
  }

  async update(request: UserUpdateRequest, reply: FastifyReply) {
    const userData = {
      ...request,
    }

    if (userData.password)
      userData.password = generatePassword(userData.password)

    try {
      await this.#userRepository.update(userData, { id: reply.user.id })
      return reply.send({ message: 'User updated' })
    } catch (error) {
      throw new HttpError(400, 'Error on updating user')
    }
  }

  async delete(reply: FastifyReply) {
    try {
      await this.#userRepository.delete({ id: reply.user.id })
      return reply.send({ message: 'User deleted' })
    } catch (error) {
      throw new HttpError(400, 'Error on deleting user')
    }
  }

  async login(request: UserLoginRequest, reply: FastifyReply) {
    try {
      const user = await this.#userRepository.findOne({ email: request.email })

      if (!user || !validatePassword(request.password, user.password)) {
        throw new HttpError(401, 'Login failed')
      }

      const { id, name, email } = user

      const token = await reply.jwtSign({ id, name, email })

      return reply.send({ token, expires_at: Date.now() + 3600 })
    } catch (error) {
      console.log(error)
      throw new HttpError(401, 'Login failed')
    }
  }

  async me(reply: FastifyReply) {
    return reply.send({ user: reply.user })
  }
}
