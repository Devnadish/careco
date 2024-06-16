'use server'
import db from '@/more/lib/prisma'
import { revalidatePath } from 'next/cache'

export const newRate = async data => {
  const decodedSlug = decodeURIComponent(data.providerId)

  const provider = await db.provider.findFirst({
    where: { slug: decodedSlug }
  })

  const isExisit = await db.ProviderRating.findFirst({
    where: { userId: data.userId, providerId: provider.id }
  })

  console.log(isExisit)
  if (isExisit) {
    return { stuts: false, msg: 'تم تقييم هذا المستخدم من قبل' }
  }
  try {
    const newRate = await db.ProviderRating.create({
      data: { ...data, providerId: provider.id }
    })
    console.log(newRate)
    const reFactoreRate = await reCalculateRate(provider.id)
    console.log(reFactoreRate)
    return { stuts: true, msg: 'شكرت علي تقييمك' }
  } catch (error) {
    console.log(error)
  }
}
export const CollectRatine = async providerId => {
  const ratings = await Promise.all([
    db.ProviderRating.count({ where: { providerId, rate: 1, isPublic: true } }),
    db.ProviderRating.count({ where: { providerId, rate: 2, isPublic: true } }),
    db.ProviderRating.count({ where: { providerId, rate: 3, isPublic: true } }),
    db.ProviderRating.count({ where: { providerId, rate: 4, isPublic: true } }),
    db.ProviderRating.count({ where: { providerId, rate: 5, isPublic: true } }),
    db.ProviderRating.count({ where: { providerId, isPublic: true } })
  ])

  const totalRate =
    ratings[0] + ratings[1] + ratings[2] + ratings[3] + ratings[4]
  const percentage = parseInt((ratings[4] * 100) / totalRate)

  return {
    star1: ratings[0],
    star2: ratings[1],
    star3: ratings[2],
    star4: ratings[3],
    star5: ratings[4],
    overAllrate5: ratings[5],
    totalRate,
    percentage
  }
}

export const getRateData = async (slug, rateQuery = 5) => {
  const decodedSlug = decodeURIComponent(slug)

  const provider = await db.provider.findFirst({
    where: { slug: decodedSlug },
    select: { id: true }
  })

  const rateData = await CollectRatine(provider.id)

  const providerid = provider.id
  if (rateQuery === NaN || rateQuery === undefined) {
    Query = 0
  }
  let Query = 0
  rateQuery === 0 ? (Query = {}) : (Query = rateQuery)
  const allrate = await db.ProviderRating.findMany({
    where: { providerId: providerid, rate: Query },
    orderBy: { rate: 'desc' }
  })

  let newRateData = []
  for (let i = 0; i < allrate.length; i++) {
    const user = await db.user.findFirst({
      where: { id: allrate[i].userId }
    })
    newRateData.push({
      ...allrate[i],
      userName: user?.name,
      userImage: user?.image,
      userEmail: user?.email
    })
  }

  return { RateInfo: newRateData, rateData }
}

export const reCalculateRate = async providerId => {
  const percentage = await CollectRatine(providerId)
  const per = percentage.percentage
  console.log(per)

  const pr = await db.provider.update({
    where: { id: providerId },
    data: { starCount: per }
  })
  return pr
}

export const reFixrate = async () => {
  const providers = await db.provider.findMany({})

  for (let i = 0; i < providers.length; i++) {
    const providerid = providers[i].id
    const percentage = await CollectRatine(providerid)
    const per = percentage.percentage
    console.log(per)

    const pr = await db.provider.update({
      where: { id: providerid },
      data: { starCount: per }
    })
    console.log(pr)
  }
}
