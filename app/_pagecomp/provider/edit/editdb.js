'use server'
import db from 'more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCars, getDepartment, getExtraService } from 'more/db/utlDb'
export const getProviderData = async providerId => {
  const provider = await db.provider.findFirst({ where: { id: providerId } })

  const carList = await getCars()
  const department = await getDepartment()
  const extraService = await getExtraService()

  return {
    provider: provider,
    carList: carList,
    department: department,
    extraService: extraService
  }
}
