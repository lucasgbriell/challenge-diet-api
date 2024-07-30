import { expect, it, beforeAll, afterAll, describe } from 'vitest'
import { execSync } from 'child_process'
import request from 'supertest'

import { app } from '../src/app'

describe('Users routes', () => {
  beforeAll(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a user', async () => {
    const userRespponse = await request(app.server).post('/user').send({
      name: 'John Doe',
      email: 'john@teste.com',
      password: 'Password2*',
    })

    expect(userRespponse.status).toBe(201)
  })

  it('should be able to login and get user info', async () => {
    const emailAndPassword = {
      email: 'john2@teste.com',
      password: 'Password2*',
    }

    await request(app.server)
      .post('/user')
      .send({
        ...emailAndPassword,
        name: 'John Doe',
      })

    const userLoginResponse = await request(app.server)
      .post('/user/login')
      .send(emailAndPassword)

    const { token } = userLoginResponse.body

    const userGetInfo = await request(app.server)
      .get('/user/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = userGetInfo.body

    expect(response).toHaveProperty('user')
    expect(response.user).toHaveProperty('id')
    expect(response.user).toHaveProperty('name')
    expect(response.user).toHaveProperty('email')
    expect(response.user).toHaveProperty('iat')
    expect(response.user).toHaveProperty('exp')
  })

  it('should be able to update user', async () => {
    const emailAndPassword = {
      email: 'john3@teste.com',
      password: 'Password2*',
    }

    await request(app.server)
      .post('/user')
      .send({
        ...emailAndPassword,
        name: 'John Doe',
      })

    const userLoginResponse = await request(app.server)
      .post('/user/login')
      .send(emailAndPassword)

    const { token } = userLoginResponse.body

    const userUpdateResponse = await request(app.server)
      .put('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Updated',
      })

    expect(userUpdateResponse.status).toBe(200)
  })
})
