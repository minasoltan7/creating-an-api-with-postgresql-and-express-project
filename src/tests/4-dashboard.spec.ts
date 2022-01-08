import DashboardQueries from '../services/dashboard'

const myDashboard = new DashboardQueries()

// Test suite for Orders Model methods
describe('testing if dashboard methods', () => {
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
