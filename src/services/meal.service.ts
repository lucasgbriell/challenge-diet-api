import { FastifyReply, FastifyRequest } from 'fastify'
import {
  MealCreateRequest,
  MealGetOneRequest,
  MealUpdateRequest,
} from '../model'
import { MealRepository } from '../repositories'
import { HttpError } from '../errors/http.error'

export class MealService {
  #mealRepository

  constructor() {
    this.#mealRepository = new MealRepository()
  }

  async get(request: FastifyRequest, reply: FastifyReply) {
    const { id } = MealGetOneRequest.parse(request.params)
    try {
      const meal = await this.#mealRepository.findOne({
        id,
        user_id: reply.user.id,
      })
      return reply.send({ meal })
    } catch (error) {
      throw new HttpError(400, 'Error on getting meal')
    }
  }

  async getAll(reply: FastifyReply) {
    try {
      const meals = await this.#mealRepository.findAll({
        user_id: reply.user.id,
      })
      return reply.send({ meals })
    } catch (error) {
      throw new HttpError(400, 'Error on getting meal')
    }
  }

  async create(request: MealCreateRequest, reply: FastifyReply) {
    const mealData = {
      ...request,
      user_id: reply.user.id,
    }

    try {
      await this.#mealRepository.create(mealData)
      return reply.status(201).send({ message: 'Meal created' })
    } catch (error) {
      throw new HttpError(409, 'Error on creating meal')
    }
  }

  async update(id: number, request: MealUpdateRequest, reply: FastifyReply) {
    try {
      await this.#mealRepository.update(request, { id, user_id: reply.user.id })
      return reply.send({ message: 'Meal updated' })
    } catch (error) {
      throw new HttpError(400, 'Error on updating meal')
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = MealGetOneRequest.parse(request.params)
    try {
      await this.#mealRepository.delete({ id, user_id: reply.user.id })
      return reply.send({ message: 'Meal deleted' })
    } catch (error) {
      throw new HttpError(400, 'Error on deleting meal')
    }
  }

  async summary(reply: FastifyReply) {
    try {
      const summary = await this.#mealRepository.summary(reply.user.id)
      return reply.send({ summary })
    } catch (error) {
      console.log(error)
      throw new HttpError(400, 'Error on getting summary')
    }
  }
}
