import express, { Request, Response } from 'express'

import DashboardQueries from '../services/dashboard'

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders()
    res.json(products)
  } catch (err) {
    throw new Error(`Could not get products in orders. Error: ${err}`)
  }
}

const usersInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.usersInOrders()
    res.json(products)
  } catch (err) {
    throw new Error(`Could not get users in orders. Error: ${err}`)
  }
}

const mostExpensive5 = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.mostExpesive5()
    res.json(products)
  } catch (err) {
    throw new Error(`Could not get most expensive 5 products in orders. Error: ${err}`)
  }
}

const dashboardRoutes = (app: express.Application) => {
  app.get('/products_in_orders', productsInOrders)
  app.get('/users_In_Orders', usersInOrders)
  app.get('/mostExpensive5', mostExpensive5)
}
export default dashboardRoutes
