import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import type { z } from 'zod'
import { zodResponse, zodResponseFile } from '../interface'

const read = async (): Promise<z.infer<typeof zodResponseFile> | undefined> => {
  const path = join(__dirname, '../data/responses.json')
  const dataParse = zodResponseFile.safeParse(
    JSON.parse(await readFile(path, 'utf-8'))
  )
  if (dataParse.success) {
    return dataParse.data
  }
}

const write = async (
  data: z.infer<typeof zodResponseFile>
): Promise<boolean> => {
  const path = join(__dirname, '../data/responses.json')
  console.log(data)
  const dataParse = zodResponseFile.safeParse(data)
  if (!dataParse.success) {
    return false
  }
  if (dataParse.success) {
    await writeFile(path, JSON.stringify(dataParse.data, null, 2))
  }
  return true
}

const add = async (
  idForm: string,
  responses: z.infer<typeof zodResponse>
): Promise<boolean> => {
  const responseParse = zodResponse.safeParse(responses)
  if (!responseParse.success) {
    return false
  }
  const data = await read()
  if (data === undefined) {
    return false
  }
  if (data[idForm] === undefined) {
    data[idForm] = []
  }
  data[idForm].push(responseParse.data)
  return await write(data)
}

const responses = {
  add,
  read,
}

export default responses
