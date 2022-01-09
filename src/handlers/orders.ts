/* eslint-disable prefer-destructuring */
import express from 'express'
import jwt from 'jsonwebtoken'
import { Order, OrderModel } from '../models/orders'

const ordersLibrary = new OrderModel()

// handlers functions

// index function to show al items in our database
const index = async (req: express.Request, res: express.Response) => {
  // Validating user token
  try {
    const authorizationHeader: unknown = req.headers.authorization
    const token = (authorizationHeader as string).split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
  } catch (err) {
    res.status(401)
    res.json('Access denied . Token is invalid')
    // we must use "return " to exit the function when the token is not valid
    return
  }

  try {
    const allOrders = await ordersLibrary.index()
    res.json(allOrders)
  } catch (err) {
    res.status(400).send(`cant get oders .Error :${err}`)
  }
}
// Show function to show a specified order in our database

const show = async (req: express.Request, res: express.Response) => {
  // Validating user token
  try {
    const authorizationHeader: unknown = req.headers.authorization
    const token = (authorizationHeader as string).split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
  } catch (err) {
    res.status(401)
    res.json('Access denied . Token is invalid')
    // we must use "return " to exit the function when the token is not valid
    return
  }
  // eslint-disable-next-line prefer-destructuring
  const id: unknown = req.params.id
  try {
    const specifiedOrder = await ordersLibrary.show(id as number)
    res.json(specifiedOrder)
  } catch (err) {
    res.status(400).send(`Cant get order with id: ${id} .Error :${err}`)
  }
}

const create = async (req: express.Request, res: express.Response) => {
  // Validating User token
  try {
    const authorizationHeader: unknown = req.headers.authorization
    const token = (authorizationHeader as string).split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
  } catch (err) {
    res.status(401)
    res.json('Access denied ,invalid Token ')
    // we must use "return " to exit the function when the token is not valid
    return
  }

  try {
    const orderSpec: Order = {
      status: req.body.status,
      user_id: req.body.user_id
    }
    const newOrder = await ordersLibrary.create(orderSpec)
    res.json(newOrder)
  } catch (err) {
    res.status(400).json(err)
  }
}

const destroy = async (req: express.Request, res: express.Response) => {
  // Validatin user token
  try {
    const authorizationHeader: unknown = req.headers.authorization
    const token = (authorizationHeader as string).split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
  } catch (err) {
    res.status(401)
    res.json('Access denied . Token is invalid')
    // we must use "return " to exit the function when the token is not valid
    return
  }

  try {
    const id = parseInt(req.params.id, 10)
    const deletedOrder = await ordersLibrary.destroy(id)
    res.json(deletedOrder)
  } catch (err) {
    res.status(400).json(err)
  }
}

const addProduct = async (req: express.Request, res: express.Response) => {
  // Validating user token
  try {
    const authorizationHeader: unknown = req.headers.authorization
    const token = (authorizationHeader as string).split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
  } catch (err) {
    res.status(401)
    res.json('Access denied . Token is invalid')
    // we must use "return " to exit the function when the token is not valid
    return
  }
  try {
    const quantity = req.body.quantity
    const orderId = parseInt(req.params.id, 10)
    const productId = req.body.product_id
    const newOrderProducts = await ordersLibrary.addProduct(quantity, orderId, productId)
    res.json(newOrderProducts)
  } catch (err) {
    res.status(400).json(`Cant add new order_product .Err ${err}`)
  }
}

// A function to show the current active order(s) for a specific user
const userCurrentOrders = async (req: express.Request, res: express.Response) => {
  // Validating User token
  try {
    const authorizationHeader: unknown = req.headers.authorization
    const token = (authorizationHeader as string).split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
  } catch (err) {
    res.status(401)
    res.json('Access denied ,invalid Token ')
    // we must use "return " to exit the function when the token is not valid
    return
  }
  const userId = req.params.id
  try {
    const userActiveOrders = await ordersLibrary.userCurrentOrders(parseInt(userId, 10))
    res.json(userActiveOrders)
  } catch (err) {
    res.status(400).json(`Cant get active order for user id =${userId} .Err ${err}`)
  }
}

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/order/:id', show)
  app.post('/newOrder', create)
  app.delete('/delete/:id', destroy)
  app.post('/order/:id/products', addProduct)
  app.get('/userCurrentOrders/:id', userCurrentOrders)
}

export default ordersRoutes
