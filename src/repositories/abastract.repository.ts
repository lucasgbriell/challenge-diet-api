import { knex } from '../configs/database.config'

export class AbstractRepository {
  #model

  constructor(model: string) {
    this.#model = model
  }

  async create(data: object) {
    return await knex(this.#model).insert(data)
  }

  async update(data: object, where: object) {
    return await knex(this.#model).update(data).where(where)
  }

  async delete(where: object) {
    return await knex(this.#model).delete().where(where)
  }

  async findOne(where: object) {
    return await knex(this.#model).where(where).first()
  }

  async findAll(where: object) {
    return await knex(this.#model).where(where)
  }

  db() {
    return knex(this.#model)
  }
}
