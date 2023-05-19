import { z } from 'zod'

export const zodSuperAdmin = z.object({
  mail: z.string(),
  password: z.string(),
})

export const zodFormText = z.object({
  type: z.literal('text'),
  required: z.boolean(),
})

export const zodFormTextarea = z.object({
  type: z.literal('textarea'),
  required: z.boolean(),
})

export const zodFormRadio = z.object({
  type: z.literal('radio'),
  options: z.array(z.string()).min(2),
})

export const zodFormCheckbox = z.object({
  type: z.literal('checkbox'),
  options: z.array(z.string()).min(2),
})

export const zodForm = z.object({
  id: z.string(),
  label: z.string().min(1).max(5000),
  form: z.union([zodFormText, zodFormTextarea, zodFormRadio, zodFormCheckbox]),
})

export const zodFormWithoutId = zodForm.omit({ id: true })

export const zodFormsItem = z.object({
  title: z.string().min(1).max(5000),
  mail: z.string(),
  date: z.string(),
  forms: z.array(zodForm),
})

export const zodFormsItemWithoutIdAndDate = z.object({
  title: z.string(),
  mail: z.string(),
  forms: z.array(zodFormWithoutId),
})

// id -> form
export const zodFormsFile = z.record(z.string(), zodFormsItem)

export const zodResponse = z.array(z.string())

export const zodResponseFile = z.record(z.string(), z.array(zodResponse))
