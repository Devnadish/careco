'use server'
import db from '@/more/lib/prisma'
import { revalidatePath } from 'next/cache'

export const addError = async (pathName, refrence, msg, error, userid) => {
  const errorData = {
    url: pathName,
    refrence: refrence,
    sourceCode: error,

    error: msg,
    userid
  }

  return await db.errors.create({ data: errorData }) // Assuming there is a count method in your database provider
}
