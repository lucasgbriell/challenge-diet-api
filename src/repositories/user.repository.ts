import { AbstractRepository } from './abastract.repository'

export class UserRepository extends AbstractRepository {
  constructor() {
    super('users')
  }
}
