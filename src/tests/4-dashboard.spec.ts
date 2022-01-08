import supertest from 'supertest'
import app from '../server'
import DashboardQueries from '../services/dashboard'

const request = supertest(app)

// Testing dashboard endpoints
describe('Testing Dashboard endpoints responses', () => {
  it('Testing our /products_in_orders', async () => {
    const response = await request.get('/products_in_orders')
    expect(response.status).toBe(200)
  })
  it('Testing our /users_In_Orders endpoint', async () => {
    const response = await request.get('/users_In_Orders')
    expect(response.status).toBe(200)
  })
  it('Testing our /mostExpensive5 endpoint', async () => {
    const response = await request.get('/mostExpensive5')
    expect(response.status).toBe(200)
  })
})

const myDashboard = new DashboardQueries()
describe('testing dashboard methods', () => {
  it('testing if productsInOrders method exist', () => {
    expect(myDashboard.productsInOrders).toBeDefined()
  })
  it('testing if usersInOrders method exist', () => {
    expect(myDashboard.usersInOrders).toBeDefined()
  })
  it('testing if mostExpesive5 method exist', () => {
    expect(myDashboard.mostExpesive5).toBeDefined()
  })
})
