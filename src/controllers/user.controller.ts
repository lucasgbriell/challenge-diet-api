import { FastifyReply, FastifyRequest } from 'fastify'
import {
  UserCreateRequest,
  UserLoginRequest,
  UserUpdateRequest,
} from '../model'
import { UserService } from '../services'
import { Validate } from '../utils/validate'

export class UserController {
  #userService

  constructor() {
    this.#userService = new UserService()
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const userRequest = Validate(UserCreateRequest, request)
    return this.#userService.create(userRequest, reply)
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const userRequest = Validate(UserUpdateRequest, request)
    return this.#userService.update(userRequest, reply)
  }

  async delete(reply: FastifyReply) {
    return this.#userService.delete(reply)
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const userRequest = Validate(UserLoginRequest, request)
    return this.#userService.login(userRequest, reply)
  }

  async me(reply: FastifyReply) {
    return this.#userService.me(reply)
  }
}
