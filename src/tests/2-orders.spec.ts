import supertest from 'supertest'
import app from '../server'
import { OrderModel } from '../models/orders'
// create a request object

const request = supertest(app)

// Testing Orders endpoints
describe('Testing Orders endpoints responses', () => {
  it('Testing our /orders endpoint', async () => {
    const response = await request.get('/orders')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
  })
  it('Testing our /order/:id endpoint', async () => {
    const response = await request.get('/order/1 ')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
  })
  it('Testing our /newOrder endpoint', async () => {
    const response = await request.post('/newOrder')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
  })
  it('Testing our /delete/:id endpoint', async () => {
    const response = await request.delete('/delete/1')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
  })
  it('Testing our /order/:id/products endpoint', async () => {
    const response = await request.post('/order/1/products')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
  })
  it('Testing our /userCurrentOrders/:id endpoint', async () => {
    const response = await request.get('/userCurrentOrders/1')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
  })
})

const myOrder = new OrderModel()
// Test suite for Orders Model methods
describe('testing Orders methods', () => {
  it('testing if index method exist', () => {
    expect(myOrder.index).toBeDefined()
  })
  it('testing if show method exist', () => {
    expect(myOrder.show).toBeDefined()
  })
  it('testing if create method exist', () => {
    expect(myOrder.create).toBeDefined()
  })
  it('testing if destroy method exist', () => {
    expect(myOrder.destroy).toBeDefined()
  })
  it('testing if addProduct method exist', () => {
    expect(myOrder.addProduct).toBeDefined()
  })
  it('testing if userCurrentOrders method exist', () => {
    expect(myOrder.userCurrentOrders).toBeDefined()
  })
  it('index method should return a specific order', async () => {
    const result = await myOrder.index()
    expect(result).toEqual([
      {
        id: 1,
        status: 'complete',
        user_id: 1
      },
      {
        id: 2,
        status: 'complete',
        user_id: 1
      }
    ])
  })
  it('show method should return a specific order', async () => {
    const result = await myOrder.show(1)
    expect(result).toEqual({
      id: 1,
      status: 'complete',
      user_id: 1
    })
  })
})
