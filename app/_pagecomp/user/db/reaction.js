'use server'

import db from '@/more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CollectRatine } from '../../provider/db/rateDb'

export const getUserActions = async (userid, actionid) => {
  const providerIds = await db.userAction.findMany({
    where: { userid, actionid },
    select: { providerid: true }
  })

  if (providerIds.length === 0) {
    return { msg: 'noData' }
  }

  const ids = providerIds.map(provider => provider.providerid)

  const requiestedProviders = await db.provider.findMany({
    where: { id: { in: ids } },
    include: {
      cars: true,
      department: true,
      service: true,
      images: true
    }
  })
  // const finalProviders = await ProviderList(requiestedProviders)

  return {
    // providers: finalProviders
    providers: requiestedProviders
    // pageCount: pageCount,
    // totalProvidersCount: totalProvidersCount
  }
  // return finalProviders
}

export const ProviderList = async ProviderIDS => {
  const getProviderDetails = async provider => {
    const cars = await db.ProviderCarFixing.findMany({
      where: { providerid: provider.id },
      select: { name: true }
    })

    const department = await db.ProviderDepartment.findMany({
      where: { providerid: provider.id },
      select: { department: true }
    })

    const service = await db.ProviderService.findMany({
      where: { providerid: provider.id },
      select: { logo: true }
    })
    const rate = await CollectRatine(provider.id)
    return { provider, cars, department, service, rate }
  }

  const newProviders = await Promise.all(ProviderIDS.map(getProviderDetails))
  revalidatePath('/')

  return {
    providers: newProviders
    // pageCount: pageCount,
    // totalProvidersCount: totalProvidersCount
  }
}
