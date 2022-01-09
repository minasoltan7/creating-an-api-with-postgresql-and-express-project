import express from 'express'
import jwt from 'jsonwebtoken'
import { Product, ProductModel } from '../models/products'

const productsLibrary = new ProductModel()

// handlers functions

// index function to show al items in our products table
const index = async (req: express.Request, res: express.Response) => {
  try {
    const allProducts = await productsLibrary.index()
    res.json(allProducts)
  } catch (err) {
    res.status(400).send(`cant get products .Error :${err}`)
  }
}
// Show function to show a specified product in our database

const show = async (req: express.Request, res: express.Response) => {
  // eslint-disable-next-line prefer-destructuring
  const id: unknown = req.params.id
  try {
    const specifiedProduct = await productsLibrary.show(id as number)
    res.json(specifiedProduct)
  } catch (err) {
    res.status(400).send(`Cant get products with id: ${id} .Error :${err}`)
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
    const productSpec: Product = {
      name: req.body.name,
      price: req.body.price
    }
    const newProduct = await productsLibrary.create(productSpec)
    res.json(newProduct)
  } catch (err) {
    res.status(400).json(err)
  }
}

const productsRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/product/:id', show)
  app.post('/newProduct', create)
}

export default productsRoutes
