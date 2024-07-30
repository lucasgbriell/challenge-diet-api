import { expect, it, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'

import { app } from '../src/app'

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a meal', async () => {
    const emailAndPassword = {
      email: 'johnMeal@teste.com',
      password: 'Password2*',
    }

    await request(app.server)
      .post('/user')
      .send({
        ...emailAndPassword,
        name: 'John Doe meal test',
      })

    const userLoginResponse = await request(app.server)
      .post('/user/login')
      .send(emailAndPassword)

    const { token } = userLoginResponse.body

    const mealCreateResponse = await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chicken w/ rice',
        description: 'A nice meal!',
        diet: true,
      })

    expect(mealCreateResponse.status).toBe(201)
  })

  it('should be able to list all meals', async () => {
    const emailAndPassword = {
      email: 'johnMeal2@teste.com',
      password: 'Password2*',
    }

    await request(app.server)
      .post('/user')
      .send({
        ...emailAndPassword,
        name: 'John Doe meal test',
      })

    const userLoginResponse = await request(app.server)
      .post('/user/login')
      .send(emailAndPassword)

    const { token } = userLoginResponse.body

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chicken w/ rice',
        description: 'A nice meal!',
        diet: true,
      })

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Hamburger w/ fries',
        description: 'Not fit for diet!',
        diet: false,
      })

    const mealGetAllResponse = await request(app.server)
      .get('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(mealGetAllResponse.body).toHaveProperty('meals')
    expect(mealGetAllResponse.status).toBe(200)
  })

  it('should be able to one meal', async () => {
    const emailAndPassword = {
      email: 'johnMeal3@teste.com',
      password: 'Password2*',
    }

    await request(app.server)
      .post('/user')
      .send({
        ...emailAndPassword,
        name: 'John Doe meal test',
      })

    const userLoginResponse = await request(app.server)
      .post('/user/login')
      .send(emailAndPassword)

    const { token } = userLoginResponse.body

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chicken w/ rice',
        description: 'A nice meal!',
        diet: true,
      })

    const mealGetAllResponse = await request(app.server)
      .get('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const id = mealGetAllResponse.body.meals[0].id

    const mealGetOneResponse = await request(app.server)
      .get(`/meal/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(mealGetOneResponse.body).toHaveProperty('meal')
    expect(mealGetOneResponse.body.meal).toEqual(
      expect.objectContaining({
        name: 'Chicken w/ rice',
        description: 'A nice meal!',
      }),
    )
    expect(mealGetAllResponse.status).toBe(200)
  })

  it('should be able to update a meal', async () => {
    const emailAndPassword = {
      email: 'johnMeal4@teste.com',
      password: 'Password2*',
    }

    await request(app.server)
      .post('/user')
      .send({
        ...emailAndPassword,
        name: 'John Doe meal test',
      })

    const userLoginResponse = await request(app.server)
      .post('/user/login')
      .send(emailAndPassword)

    const { token } = userLoginResponse.body

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chicken w/ rice',
        description: 'A nice meal!',
        diet: true,
      })

    const mealGetAllResponse = await request(app.server)
      .get('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const id = mealGetAllResponse.body.meals[0].id

    const mealUpdateResponse = await request(app.server)
      .put(`/meal/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chicken w/ potatoes',
      })

    expect(mealUpdateResponse.status).toBe(200)
  })

  it('should be able to get summary', async () => {
    const emailAndPassword = {
      email: 'johnMeal5@teste.com',
      password: 'Password2*',
    }

    await request(app.server)
      .post('/user')
      .send({
        ...emailAndPassword,
        name: 'John Doe meal test',
      })

    const userLoginResponse = await request(app.server)
      .post('/user/login')
      .send(emailAndPassword)

    const { token } = userLoginResponse.body

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chicken w/ rice',
        description: 'A nice meal!',
        diet: true,
      })

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chicken w/ salad',
        description: 'A nice meal!',
        diet: true,
      })

    await request(app.server)
      .post('/meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Hamburger w/ salad',
        description: 'A nice meal!',
        diet: true,
      })

    const mealGetSummary = await request(app.server)
      .get('/meal/summary')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(mealGetSummary.body).toHaveProperty('summary')
    expect(mealGetSummary.body.summary).toHaveProperty('totalMealsOnDiet')
    expect(mealGetSummary.body.summary).toHaveProperty('totalMealsOffDiet')
    expect(mealGetSummary.body.summary).toHaveProperty('totalMeals')
    expect(mealGetSummary.body.summary).toHaveProperty('bestOnDietSequence')
    expect(mealGetSummary.status).toBe(200)
  })
})
