import supertest from 'supertest'
import app from '../server'
import { ProductModel } from '../models/products'
import Client from '../database'

const request = supertest(app)

// Testing Orders endpoints
describe('Testing Products endpoints responses', () => {
  it('Testing our /products', async () => {
    try {
      const response = await request.get('/products')
      expect(response.status).toBe(200)
    } catch (err) {
      throw new Error(`Cant reach /products endpoint ${err}`)
    }
  })
  it('Testing our /product/:id endpoint', async () => {
    try {
      const response = await request.get('/product/1 ')
      expect(response.status).toBe(200)
    } catch (err) {
      throw new Error(`Cant reach /product/:id endpoint' endpoint ${err}`)
    }
  })
  it('Testing our /newProduct endpoint', async () => {
    try {
      const response = await request.post('/newProduct')
      // Testing if our endpoint needs authorization token
      // if authentication token is required and not given to the header authorization we recieve status 401
      expect(response.status).toBe(401)
    } catch (err) {
      throw new Error(`Cant reach /newProduct endpoint ${err}`)
    }
  })
})

const myProduct = new ProductModel()

// Test suite for Products Model methods
describe('testing Products methods', () => {
  it('testing if index method exist', () => {
    expect(myProduct.index).toBeDefined()
  })
  it('testing if show method exist', () => {
    expect(myProduct.show).toBeDefined()
  })
  it('testing if create method exist', () => {
    expect(myProduct.create).toBeDefined()
  })
})

describe('testing Products functionality', () => {
  it('create method should return a specific product', async () => {
    const result = await myProduct.create({
      name: 'cheese',
      price: 4
    })
    expect(result).toEqual({
      id: 1,
      name: 'cheese',
      price: 4
    })
  })
  it('create method should return a specific product', async () => {
    const result = await myProduct.create({
      name: 'Meat',
      price: 50
    })
    expect(result).toEqual({
      id: 2,
      name: 'Meat',
      price: 50
    })
  })
  it('create method should return a specific product', async () => {
    const result = await myProduct.create({
      name: 'Chicken',
      price: 30
    })
    expect(result).toEqual({
      id: 3,
      name: 'Chicken',
      price: 30
    })
  })

  it('index method should return a specific product', async () => {
    const result = await myProduct.index()
    expect(result).toEqual([
      {
        id: 1,
        name: 'cheese',
        price: 4
      },
      {
        id: 2,
        name: 'Meat',
        price: 50
      },
      {
        id: 3,
        name: 'Chicken',
        price: 30
      }
    ])
  })

  it('show method should return a specific product', async () => {
    const result = await myProduct.show(1)
    expect(result).toEqual({
      id: 1,
      name: 'cheese',
      price: 4
    })
  })

  afterAll(async () => {
    try {
      const conn = Client.connect()
      // We are deleting all data in our orders table in order to run the test again properly with plain fields in each column
      const sql1 = 'TRUNCATE products CASCADE'
      // We are restarting the sequence of id of orders to begin from 1 when running the test the next time
      const sql2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
      await (await conn).query(sql1)
      await (await conn).query(sql2)
    } catch (err) {
      throw new Error(`Cant truncate products table. ${err}`)
    }
  })
})
