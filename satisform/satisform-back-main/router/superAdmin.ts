import express from 'express'
import { v4 } from 'uuid'
import type { z } from 'zod'
import type { zodForm } from '../interface'
import { zodFormsItemWithoutIdAndDate } from '../interface'
import forms from '../models/forms'
import responses from '../models/responses'

const routerSuperAdmin = express.Router()

routerSuperAdmin.get('/verify', async (_, res) => res.status(200).end())

routerSuperAdmin.get('/forms', async (_, res) => {
  const formsValue = await forms.read()
  if (formsValue === undefined) {
    return res.status(500).end()
  }
  return res.status(200).json({ ...formsValue })
})

routerSuperAdmin.get('/responses', async (_, res) => {
  const responsesValue = await responses.read()
  if (responsesValue === undefined) {
    return res.status(500).end()
  }
  return res.status(200).json({ ...responsesValue })
})

routerSuperAdmin.post('/forms', async (req, res) => {
  const bodyParse = zodFormsItemWithoutIdAndDate.safeParse(req.body)
  if (!bodyParse.success) {
    return res.status(400).end()
  }
  const body = bodyParse.data
  const formsWithId: Array<z.infer<typeof zodForm>> = body.forms.map(
    (form) => ({
      ...form,
      id: v4(),
    })
  )
  const formsItem = {
    ...body,
    date: new Date().toISOString(),
    forms: formsWithId,
  }
  if (!(await forms.add(formsItem))) {
    return res.status(500).end()
  }
  return res.status(200).end()
})

routerSuperAdmin.delete('/forms/:id', async (req, res) => {
  const id = req.params.id
  if (!(await forms.remove(id))) {
    return res.status(400).end()
  }
  return res.status(200).end()
})

export default routerSuperAdmin
