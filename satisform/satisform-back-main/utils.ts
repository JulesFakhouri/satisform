import type express from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

export const getVerifyMail = (req: express.Request): string | undefined => {
  const accessToken = req.headers.authorization?.split(' ')[1]
  if (accessToken === undefined) {
    return undefined
  }
  const verify = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string)

  const verifyParse = z
    .object({
      mail: z.string(),
    })
    .safeParse(verify)
  if (verifyParse.success) {
    return verifyParse.data.mail
  }
}
