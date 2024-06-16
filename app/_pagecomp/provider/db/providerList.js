'use server'
import db from '@/more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CollectRatine } from './rateDb'
import { Slug } from '@/more/lib/nadish'

export const getProviderList = async (pageNo, query) => {
  const { vechile, type, sort, search, sorttype, service, department } =
    query || {}

  // await fixSlug()  // Function to update slug
  const searchStr = search || ''
  const searchKey = searchStr[searchStr.length - 1]
  const searchString = searchStr.slice(0, -7)

  let carCondition = carFilter(vechile)
  let departmentcondition = departmentFilter(department)
  let servicecondition = serviceFilter(service)
  let typeCondition = typeFilter(type)
  let searchWhere = searchFilter(searchKey, searchString)

  const whereCondition = {
    ...carCondition,
    ...typeCondition,
    ...searchWhere,
    ...departmentcondition,
    ...servicecondition
  }
  const sortBy = Sorting(sort, sorttype)

  const limit = parseInt(process.env.PROVODER_PAGE_LIMIT)
  const skip = (pageNo - 1) * limit
  const providers = await db.provider.findMany({
    take: limit,
    skip,
    where: whereCondition,
    orderBy: sortBy,
    include: {
      cars: true,
      department: true,
      service: true
    }
  })

  revalidatePath('/')
  const ProvidersCount = await db.provider.findMany({
    where: whereCondition,
    include: {
      cars: true,
      department: true,
      service: true
    }
  })

  const totalProvidersCount = ProvidersCount.length

  const pageCount = Math.ceil(totalProvidersCount / limit)
  revalidatePath('/')
  return {
    providers,
    pageCount,
    totalProvidersCount
  }
}

const departmentFilter = department => {
  let departmentcondition = {}

  if (department) {
    departmentcondition = {
      department: {
        some: {
          slug: department
        }
      }
    }
  }

  return departmentcondition
}

const serviceFilter = department => {
  let departmentcondition = {}

  if (department) {
    departmentcondition = {
      service: {
        some: {
          slug: department
        }
      }
    }
  }

  return departmentcondition
}
const carFilter = car => {
  let carCondition = {}

  if (car) {
    carCondition = {
      cars: {
        some: {
          name: car
        }
      }
    }
  }

  return carCondition
}
const Sorting = (sort, sorttype) => {
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
  return sortBy
}

const searchFilter = (searchKey, search) => {
  let searchWhere
  if (search) {
    switch (searchKey) {
      case '0':
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
        break
      case '2':
        searchWhere = {
          detail: {
            contains: searchString
          }
        }
        break

      default:
        searchWhere = {}
        break
    }
  }

  return searchWhere
}

const typeFilter = type => {
  const typeCondition = type ? { type } : {}
  return typeCondition
}

const fixSlug = async () => {
  const departments = await db.PRdepartment.findMany({})
  const services = await db.PRservice.findMany({})

  for (const department of departments) {
    const newSlug = Slug(department.name)
    console.log('🚀 ~ fixSlug ~ newSlug:', newSlug)
    await db.PRdepartment.update({
      where: { id: department.id },
      data: { slug: newSlug }
    })
  }

  for (const department of services) {
    const newSlug = Slug(department.name)
    console.log('🚀 ~ fixSlug ~ newSlug-services:', newSlug)
    await db.PRservice.update({
      where: { id: department.id },
      data: { slug: newSlug }
    })
  }
}
