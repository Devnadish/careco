'use server'
import db from 'more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CollectRatine } from './rateDb'

export const getProviders = async (pageNo, query) => {
  const { vechile, type, sort, search } = query || {}

  const searchStr = search || ''
  const searchKey = searchStr[searchStr.length - 1]
  const searchString = searchStr.slice(0, -7)

  let searchWhere
  if (search) {
    switch (searchKey) {
      case '0':
        // searchWhere = { providerName: searchString }
        searchWhere = {
          providerName: {
            contains: searchString
          }
        }

        break
      case '1':
        searchWhere = {
          description: {
            contains: searchString
          }
        }
        // searchWhere = { description: searchString }
        break
      case '2':
        searchWhere = {
          detail: {
            contains: searchString
          }
        }
        // searchWhere = { detail: searchString }
        break

      default:
        searchWhere = {}
        break
    }
  }

  // TODO: fix this find solution for car rateing shold be in provider db

  let carId
  if (vechile) {
    carId = await db.car.findFirst({
      where: { name: vechile },
      select: { id: true }
    })
  }

  let carCondition = {}

  if (carId) {
    carCondition = {
      carFixing: {
        hasEvery: [carId.id]
      }
    }
  }

  let typeCondition = {}
  if (type) {
    typeCondition = { type: type }
  }

  const whereCondition = { ...carCondition, ...typeCondition, ...searchWhere }

  let sortBy
  switch (sort) {
    case 'star':
      sortBy = { starCount: 'desc' }
      break
    case 'comment':
      sortBy = { commentCount: 'desc' }
      break
    case 'viewer':
      sortBy = { viewerCount: 'desc' }
      break
    case 'fav':
      sortBy = { favCount: 'desc' }
      break
    case 'share':
      sortBy = { shareCount: 'desc' }
      break
    default:
      sortBy = { starCount: 'desc' }
      break
  }

  const limit = parseInt(process.env.PROVODER_PAGE_LIMIT)
  const skip = (pageNo - 1) * limit
  const providers = await db.provider.findMany({
    take: limit,
    skip,
    where: whereCondition,
    orderBy: sortBy
  })

  const totalProvidersCount = await db.provider.count({ where: carCondition })
  const pageCount = Math.ceil(totalProvidersCount / limit)
  revalidatePath('/')
  return { providers, pageCount, totalProvidersCount }
}

export const getProviderList = async (pageNo, query) => {
  const { providers, pageCount, totalProvidersCount } = await getProviders(
    pageNo,
    query
  )

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

    try {
      const rate = await CollectRatine(provider.id)
      return { provider, cars, department, service, rate }
    } catch (error) {
      // TODO: Handle error insteed of console log  show Error In  Front Component with Disgist NO
      console.log(error)
      return
    }
  }

  const newProviders = await Promise.all(providers.map(getProviderDetails))
  revalidatePath('/')

  return {
    providers: newProviders,
    pageCount: pageCount,
    totalProvidersCount: totalProvidersCount
  }
}
