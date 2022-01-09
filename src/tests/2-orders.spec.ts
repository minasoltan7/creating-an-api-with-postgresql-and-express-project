import supertest from 'supertest'
import app from '../server'
import { OrderModel } from '../models/orders'
import Client from '../database'
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
  beforeAll(async () => {
    try {
      const conn = await Client.connect()
      // We are disabling the foreign key effect to be enabled to create a new order with product_id that is not created yet
      const sql1 = 'ALTER TABLE orders DISABLE TRIGGER ALL;'
      await conn.query(sql1)
    } catch (err) {
      throw new Error(`Cant truncate orders table. ${err} `)
    }
  })
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
})
describe('Testing Orders methods functionalities', () => {
  it('create method should return a new order', async () => {
    const result = await myOrder.create({
      status: 'complete',
      user_id: 1
    })
    expect(result).toEqual({
      id: 1,
      status: 'complete',
      user_id: 1
    })
  })
  it('create method should return a new order', async () => {
    const result = await myOrder.create({
      status: 'active',
      user_id: 2
    })
    expect(result).toEqual({
      id: 2,
      status: 'active',
      user_id: 2
    })
  })
  it('create method should return a new order', async () => {
    const result = await myOrder.create({
      status: 'complete',
      user_id: 3
    })
    expect(result).toEqual({
      id: 3,
      status: 'complete',
      user_id: 3
    })
  })
  it('index method should return all orders', async () => {
    const result = await myOrder.index()
    expect(result).toEqual([
      {
        id: 1,
        status: 'complete',
        user_id: 1
      },
      {
        id: 2,
        status: 'active',
        user_id: 2
      },
      {
        id: 3,
        status: 'complete',
        user_id: 3
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
  // We are resetting the orders table after all tests are run
  afterAll(async () => {
    try {
      const conn = await Client.connect()
      // We are deleting all data in our orders table in order to run the test again properly with plain fields in each column
      const sql1 = 'TRUNCATE orders CASCADE'
      // We are restarting the sequence of id of orders to begin from 1 when running the test the next time
      const sql2 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1 '
      await conn.query(sql1)
      await conn.query(sql2)
    } catch (err) {
      throw new Error(`Cant truncate orders table. ${err} `)
    }
  })
})
