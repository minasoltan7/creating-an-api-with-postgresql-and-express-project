import supertest from 'supertest'
import app from '../server'
import { UserModel } from '../models/users'

const myUser = new UserModel()
const request = supertest(app)

// Testing Users endpoints
describe('Testing Users endpoints responses', () => {
  it('Testing our /createUser', async () => {
    const response = await request.post('/createUser')
    expect(response.status).toBe(200)
  })
  it('Testing our /user/:id endpoint', async () => {
    const response = await request.get('/user/1')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
  })
  it('Testing our /users endpoint', async () => {
    const response = await request.get('/users')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
  })
})

// Test suite for Users Model methods
describe('testing Users methods ', () => {
  it('testing if index method exist', () => {
    expect(myUser.index).toBeDefined()
  })
  it('testing if show method exist', () => {
    expect(myUser.show).toBeDefined()
  })
  it('testing if create method exist', () => {
    expect(myUser.create).toBeDefined()
  })
})
