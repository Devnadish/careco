'use server'
import db from '@/more/lib/prisma'

export const getDepartmentsAndServicesFromDB = async () => {
  const departments = await db.service.findMany({
    where: {
      type: 'department'
    }
  })

  const extraServices = await db.service.findMany({
    where: {
      type: 'subservice'
    }
  })

  return {
    departments: departments,
    services: extraServices
  }
}
