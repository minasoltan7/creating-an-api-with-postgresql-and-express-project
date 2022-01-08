/* eslint-disable class-methods-use-this */
import Client from '../database'

export type Product = {
  readonly id?: number
  name: string
  price: number
}

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect()
      // the $1 refer to the first argument in the array of argument(s) we pass in the .query()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      // returning first row in the order table
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cant get Product with id=${id}.Error:${err}`)
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect()
      // the $1,$2 refer to the arguments number in the array of argument(s) we pass in the .query()
      const sql = 'INSERT INTO products (name,price)VALUES($1,$2) RETURNING *'
      const result = await conn.query(sql, [p.name, p.price])
      conn.release()
      // returning the row of the product we created
      console.log(result.rows[0])
      return result.rows[0]
    } catch (err) {
      throw new Error(`Can't create new product. Error ${err}`)
    }
  }
}
