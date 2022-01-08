/* eslint-disable class-methods-use-this */
/* eslint-disable radix */
import bcrypt from 'bcrypt'
import Client from '../database'

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env

export type User = {
  readonly id?: number
  firstName: string
  lastName: string
  password: string
}

export class UserModel {
  // eslint-disable-next-line class-methods-use-this
  async create(u: User): Promise<User[]> {
    const conn = await Client.connect()
    const sql = 'INSERT INTO users (firstName,lastName,password) VALUES ($1,$2,$3)'
    const hash = bcrypt.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string))
    const result = await conn.query(sql, [u.firstName, u.lastName, hash])
    conn.release()
    return result.rows[0]
  }

  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect()
      // the $1 refer to the first argument in the array of argument(s) we pass in the .query()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      // returning first row in the order table
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cant get user with id=${id}.Error:${err}`)
    }
  }
}
