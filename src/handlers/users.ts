import express from 'express'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/users'

const newUser = new UserModel()

const createUser = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }
    const userCreated = await newUser.create(user)
    const token = jwt.sign({ user: userCreated }, process.env.TOKEN_SECRET as string)
    res.json(token)
  } catch (err) {
    throw new Error(`Couldnt create user ${err}`)
  }
}

const index = async (req: express.Request, res: express.Response) => {
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
    const allUsers = await newUser.index()
    res.json(allUsers)
  } catch (err) {
    res.status(400).send(`cant get users .Error :${err}`)
  }
}

const show = async (req: express.Request, res: express.Response) => {
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

  // eslint-disable-next-line prefer-destructuring
  const id: unknown = req.params.id
  try {
    const specifiedUser = await newUser.show(id as number)
    res.json(specifiedUser)
  } catch (err) {
    res.status(400).send(`Cant get user with id: ${id} .Error :${err}`)
  }
}

const usersRoutes = (app: express.Application) => {
  app.post('/createUser', createUser)
  app.get('/users', index)
  app.get('/user/:id', show)
}

export default usersRoutes
