import express from 'express'
import jwt from 'jsonwebtoken'
import { zodSuperAdmin } from '../interface'
import superAdmin from '../models/superAdmin'

const routerLogin = express.Router()

routerLogin.post('/super-admin', async (req, res) => {
  try {
    const bodyParse = zodSuperAdmin.safeParse(req.body)
    if (!bodyParse.success) {
      return res.status(400).end()
    }
    const body = bodyParse.data
    const superAdminValue = await superAdmin.read()
    if (superAdminValue === undefined) {
      return res.status(500).end()
    }
    if (
      body.mail !== superAdminValue.mail ||
      body.password !== superAdminValue.password
    ) {
      return res.status(401).end()
    }
    const accessToken = jwt.sign(
      {
        mail: body.mail,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '24h',
      }
    )
    return res.status(200).json({
      accessToken,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
})

export default routerLogin
