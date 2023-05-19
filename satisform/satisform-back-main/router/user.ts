import express from 'express'
import { z } from 'zod'
import { zodResponse } from '../interface'
import forms from '../models/forms'
import responses from '../models/responses'

const routerUser = express.Router()

routerUser.get('/:id', async (req, res) => {
  const id = req.params.id
  const formsValue = await forms.read()
  if (formsValue === undefined) {
    return res.status(500).end()
  }
  for (const formId in formsValue) {
    if (id === formId) {
      return res.status(200).json({
        ...formsValue[formId],
      })
    }
  }
  return res.status(400).end()
})

routerUser.post('/:id', async (req, res) => {
  const id = req.params.id
  const bodyParse = z
    .object({
      responses: zodResponse,
    })
    .safeParse(req.body)
  if (!bodyParse.success) {
    return res.status(400).end()
  }
  const body = bodyParse.data.responses
  const formsValue = await forms.read()
  if (formsValue === undefined) {
    return res.status(500).end()
  }
  for (const formId in formsValue) {
    if (
      id === formId &&
      body.length === formsValue[formId].forms.length &&
      (await responses.add(id, body))
    ) {
      return res.status(200).end()
    }
  }
  return res.status(400).end()
})

export default routerUser
