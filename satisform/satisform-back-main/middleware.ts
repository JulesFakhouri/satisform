import type express from 'express'
import superAdmin from './models/superAdmin'
import { getVerifyMail } from './utils'

export const middlewareVerifySuperAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const verifyMail = getVerifyMail(req)
    if (verifyMail === undefined) {
      return res.status(401).end()
    }
    const superAdminValue = await superAdmin.read()
    if (superAdminValue === undefined) {
      return res.status(500).end()
    }
    if (verifyMail !== superAdminValue.mail) {
      return res.status(401).end()
    }
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).end()
  }
}
