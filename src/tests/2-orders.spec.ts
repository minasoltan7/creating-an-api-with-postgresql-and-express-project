import { OrderModel } from '../models/orders'

const myOrder = new OrderModel()

// Test suite for Orders Model methods
describe('testing if Orders methods', () => {
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
  it('show method should return a specific order', async () => {
    const result = await myOrder.show(1)
    expect(result).toEqual({
      id: 1,
      status: 'complete',
      user_id: 1
    })
  })
})
