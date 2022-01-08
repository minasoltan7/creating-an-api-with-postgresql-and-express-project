/* eslint-disable class-methods-use-this */
import Client from '../database'
import { Product } from '../models/products'
import { User } from '../models/users'

class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<{ name: string; price: number; order_id: string }[]> {
    try {
      const conn = await Client.connect()
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    }
  }

  async usersInOrders(): Promise<User[]> {
    // Getting users with orders
    try {
      const conn = await Client.connect()
      const sql =
        'SELECT firsTName,lastName,status,orders.id FROM users INNER JOIN orders ON users.id = orders.user_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users and orders: ${err}`)
    }
  }

  async mostExpesive5(): Promise<Product[]> {
    // Getting most 5 expensive products
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get most 5 expensive products: ${err}`)
    }
  }
}

export default DashboardQueries
