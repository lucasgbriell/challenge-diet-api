import { AbstractRepository } from './abastract.repository'

export class MealRepository extends AbstractRepository {
  constructor() {
    super('meals')
  }

  async summary(userId: number) {
    const totalMealsOnDiet = await this.db()
      .where({ user_id: userId, diet: true })
      .count('id', { as: 'total' })
      .first()

    const totalMealsOffDiet = await this.db()
      .where({ user_id: userId, diet: false })
      .count('id', { as: 'total' })
      .first()

    const totalMeals = await this.db()
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')

    const { bestOnDietSequence } = totalMeals.reduce(
      (acc, meal) => {
        if (meal.diet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentSequence
        }

        return acc
      },
      { bestOnDietSequence: 0, currentSequence: 0 },
    )

    return {
      totalMealsOnDiet: totalMealsOnDiet?.total ?? 0,
      totalMealsOffDiet: totalMealsOffDiet?.total,
      totalMeals: totalMeals.length,
      bestOnDietSequence,
    }
  }
}
