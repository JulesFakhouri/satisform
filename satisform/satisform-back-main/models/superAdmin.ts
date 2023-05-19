import { readFile } from 'fs/promises'
import { join } from 'path'
import type { z } from 'zod'
import { zodSuperAdmin } from '../interface'

const read = async (): Promise<z.infer<typeof zodSuperAdmin> | undefined> => {
  const path = join(__dirname, '../data/superAdmin.json')
  const superAdminParse = zodSuperAdmin.safeParse(
    JSON.parse(await readFile(path, 'utf-8'))
  )
  if (superAdminParse.success) {
    return superAdminParse.data
  }
}

const superAdmin = {
  read,
}

export default superAdmin
