import { UserModel } from '../models/users'

const myUser = new UserModel()

// Test suite for Orders Model methods
describe('testing if Users methods exist', () => {
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
