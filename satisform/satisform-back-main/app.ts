import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { middlewareVerifySuperAdmin } from './middleware'
import routerLogin from './router/login'
import routerSuperAdmin from './router/superAdmin'
import routerUser from './router/user'

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/login', routerLogin)
app.use('/super-admin', middlewareVerifySuperAdmin, routerSuperAdmin)
app.use('/user', routerUser)

app.listen(8080, () => {
  console.log('Server is running at http://localhost:8080')
})
