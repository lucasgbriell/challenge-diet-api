import { FastifyReply, FastifyRequest } from 'fastify'
import {
  MealCreateRequest,
  MealGetOneRequest,
  MealUpdateRequest,
} from '../model'
import { MealService } from '../services'
import { Validate } from '../utils/validate'

export class MealController {
  #mealService

  constructor() {
    this.#mealService = new MealService()
  }

  async get(request: FastifyRequest, reply: FastifyReply) {
    return this.#mealService.get(request, reply)
  }

  async getAll(reply: FastifyReply) {
    return this.#mealService.getAll(reply)
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const mealRequest = Validate(MealCreateRequest, request)
    return this.#mealService.create(mealRequest, reply)
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = MealGetOneRequest.parse(request.params)
    const mealRequest = Validate(MealUpdateRequest, request)
    return this.#mealService.update(id, mealRequest, reply)
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    return this.#mealService.delete(request, reply)
  }

  async summary(reply: FastifyReply) {
    return this.#mealService.summary(reply)
  }
}
