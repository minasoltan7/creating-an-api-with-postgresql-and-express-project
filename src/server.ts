/* eslint-disable no-unused-vars */
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import ordersRoutes from './handlers/orders'
import usersRoutes from './handlers/users'
import productsRoutes from './handlers/products'
import dashboardRoutes from './handlers/services'

const app = express()
app.use(bodyParser.json())

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Our main route is working')
})

ordersRoutes(app)
usersRoutes(app)
productsRoutes(app)
dashboardRoutes(app)

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})

