'use server'
import db from '@/more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CollectRatine } from './rateDb'
import { Slug } from '@/more/lib/nadish'
import { CldImage } from 'node_modules/next-cloudinary/dist/index'

export const getProviders = async (pageNo, query) => {
  const { vechile, type, sort, search, sorttype } = query || {}

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

  //     categories: {
  //       some: {
  //         name: {
  //           contains: "Servers",
  //         },
  //       },
  //     },
  //   },

  let carId
  if (vechile) {
    carId = await db.car.findFirst({
      where: { name: vechile },
      select: { id: true }
    })
  }

  let carCondition = {}

  if (carId) {
    // carCondition = { carFixing: { hasEvery: [carId.id] } }
    carCondition = { carFixing: { hasEvery: ['66266c340077c051cd4ad2f0'] } }
  }
  console.log(carCondition)

  let typeCondition = {}
  if (type) {
    typeCondition = { type: type }
  }

  const whereCondition = { ...carCondition, ...typeCondition, ...searchWhere }

  let sortBy
  switch (sort) {
    case 'star':
      sortBy = { starCount: sorttype }
      break
    case 'comment':
      sortBy = { commentCount: sorttype }
      break
    case 'viewer':
      sortBy = { viewerCount: sorttype }
      break
    case 'fav':
      sortBy = { favCount: sorttype }
      break
    case 'share':
      sortBy = { shareCount: sorttype }
      break
    default:
      sortBy = { starCount: sorttype }
      break
  }
  console.log(carId)
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
  console.log(providers)
  const DeptAndServices = await db.service.findMany({
    select: { type: true, service: true, logo: true, slug: true }
  })

  const departments = DeptAndServices.filter(s => s.type === 'department')
  const extraServices = DeptAndServices.filter(s => s.type === 'subservice')

  const getProviderDetails = async provider => {
    console.log(provider.id)
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

  console.log(providers)
  const newProviders = await Promise.all(providers.map(getProviderDetails))

  console.log({ newProviders })

  revalidatePath('/')

  return {
    providers: newProviders,
    pageCount: pageCount,
    totalProvidersCount: totalProvidersCount,
    departments: departments,
    extraServices: extraServices
  }
}

// export const getProviderList = async (pageNo, query) => {
//   const { providers, pageCount, totalProvidersCount } = await getProviders(
//     pageNo,
//     query
//   )

//   const DeptAndServices = await db.service.findMany({
//     select: { type: true, service: true, logo: true, slug: true }
//   })

//   const departments = DeptAndServices.filter(s => s.type === 'department')
//   const extraServices = DeptAndServices.filter(s => s.type === 'subservice')

//   const getProviderDetails = async provider => {
//     const cars = await db.ProviderCarFixing.findMany({
//       where: { providerid: provider.id },
//       select: { name: true }
//     })
//     const department = await db.ProviderDepartment.findMany({
//       where: { providerid: provider.id },
//       select: { department: true }
//     })
//     const service = await db.ProviderService.findMany({
//       where: { providerid: provider.id },
//       select: { logo: true }
//     })

//     try {
//       const rate = await CollectRatine(provider.id)
//       return { provider, cars, department, service, rate }
//     } catch (error) {
//       // TODO: Handle error insteed of console log  show Error In  Front Component with Disgist NO
//       console.log(error)
//       return
//     }
//   }

//   const newProviders = await Promise.all(providers.map(getProviderDetails))
//   revalidatePath('/')
//   console.log(newProviders)

//   return {
//     providers: newProviders,
//     pageCount: pageCount,
//     totalProvidersCount: totalProvidersCount,
//     departments: departments,
//     extraServices: extraServices
//   }
// }
