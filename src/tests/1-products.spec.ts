import { ProductModel } from '../models/products'

const myProduct = new ProductModel()

// Test suite for Orders Model methods
describe('testing if Products methods', () => {
  it('testing if index method exist', () => {
    expect(myProduct.index).toBeDefined()
  })
  it('testing if show method exist', () => {
    expect(myProduct.show).toBeDefined()
  })
  it('testing if create method exist', () => {
    expect(myProduct.create).toBeDefined()
  })

  it('show method should return a specific product', async () => {
    const result = await myProduct.show(1)
    expect(result).toEqual({
      id: 1,
      name: 'cheese',
      price: 4
    })
  })
})
