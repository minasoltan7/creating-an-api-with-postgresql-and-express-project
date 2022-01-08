import supertest from 'supertest'
import app from '../server'
import { ProductModel } from '../models/products'

const request = supertest(app)

// Testing Orders endpoints
describe('Testing Products endpoints responses', () => {
  it('Testing our /products', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })
  it('Testing our /product/:id endpoint', async () => {
    const response = await request.get('/product/1 ')
    expect(response.status).toBe(200)
  })
  it('Testing our /newProduct endpoint', async () => {
    const response = await request.post('/newProduct')
    // Testing if our endpoint needs authorization token
    // if authentication token is required and not given to the header authorization we recieve status 401
    expect(response.status).toBe(401)
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
      },
      {
        id: 4,
        name: 'Milk',
        price: 10
      },
      {
        id: 5,
        name: 'Tuna',
        price: 10
      },
      {
        id: 6,
        name: 'Tissues',
        price: 2
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
  it('create method should return a specific product', async () => {
    const result = await myProduct.create({
      name: 'toothpaste',
      price: 2
    })
    expect(result).toEqual({
      id: 7,
      name: 'toothpaste',
      price: 2
    })
  })
})
