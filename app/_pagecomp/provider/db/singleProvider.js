'use server'
import db from '@/more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { addViewer } from './providerVeiwer'
import { CollectRatine } from '@/app/_pagecomp/provider/db/rateDb'
import { CheckUserAction } from '@/more/db/utlDb'

export const providerData = async (providerSlug, userid) => {
  // get id from the slug
  const providerid = await db.provider.findFirst({
    where: { slug: decodeURIComponent(providerSlug) }
  })

  const id = providerid.id
  const providerInfo = await db.provider.findFirst({
    where: { id: id },
    include: {
      cars: true,
      department: true,
      service: true,
      images: true
    }
  })

  const rate = await CollectRatine(id)
  const userActions = await CheckUserAction(id, userid)

  // Increase viewr By One
  const addProviderViewer = await addViewer(id, userid)

  revalidatePath('/')
  return {
    providerInfo,
    rate,
    userActions
  }
}
