import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 } from 'uuid'
import type { z } from 'zod'
import { zodFormsFile, zodFormsItem } from '../interface'

const read = async (): Promise<z.infer<typeof zodFormsFile> | undefined> => {
  const path = join(__dirname, '../data/forms.json')
  const dataParse = zodFormsFile.safeParse(
    JSON.parse(await readFile(path, 'utf-8'))
  )
  if (dataParse.success) {
    return dataParse.data
  }
}

const write = async (data: z.infer<typeof zodFormsFile>): Promise<boolean> => {
  const path = join(__dirname, '../data/forms.json')
  const dataParse = zodFormsFile.safeParse(data)
  if (!dataParse.success) {
    return false
  }
  if (dataParse.success) {
    await writeFile(path, JSON.stringify(dataParse.data, null, 2))
  }
  return true
}

const add = async (
  formsItem: z.infer<typeof zodFormsItem>
): Promise<boolean> => {
  const formsItemParse = zodFormsItem.safeParse(formsItem)
  if (!formsItemParse.success) {
    return false
  }
  const data = await read()
  if (data === undefined) {
    return false
  }
  const id = v4()
  data[id] = formsItemParse.data
  return await write(data)
}

const remove = async (id: string): Promise<boolean> => {
  const data = await read()
  if (data === undefined) {
    return false
  }
  if (data[id] === undefined) {
    return false
  }
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete data[id]
  return await write(data)
}

const forms = {
  add,
  read,
  remove,
}

export default forms
