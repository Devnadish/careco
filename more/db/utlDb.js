'use server'
import db from 'more/lib/prisma'

export const getCarIdRetunCarInfo = async id => {
  const carInfo = await db.car.findFirst({
    where: { id: id },
    select: { id: true, carid: true, name: true, image: true }
  })
  return carInfo
}

export const getServiceIdRetunServiceInfo = async id => {
  const serviceInfo = await db.service.findFirst({
    where: { id: id },
    select: { id: true, service: true, logo: true, type: true, subPoints: true }
  })
  return serviceInfo
}

export const grapActionFromProviderService = async (dep, providerid) => {
  const serviceInfo = await db.providerService.findFirst({
    where: { providerid: providerid, serviceid: dep },
    select: {
      likeCounter: true,
      dislikeCounter: true,
      commentCounter: true
    }
  })
  return serviceInfo
}

export const CheckIsHaveStarFromUser = async (providerid, userid) => {
  const existingRecord = await db.userAction.findFirst({
    where: {
      userid: userid,
      providerid: providerid,
      actionid: 4
    }
  })

  return !!existingRecord // Return true if record exists, false if not
}

export const CheckUserAction = async (providerid, userid) => {
  const isLike = await db.userAction.findFirst({
    where: {
      userid: userid,
      providerid: providerid,
      actionid: 1
    }
  })

  const isDisLike = await db.userAction.findFirst({
    where: {
      userid: userid,
      providerid: providerid,
      actionid: 2
    }
  })
  const isFav = await db.userAction.findFirst({
    where: {
      userid: userid,
      providerid: providerid,
      actionid: 5
    }
  })
  return {
    isLike: !!isLike,
    isDisLike: !!isDisLike,
    isFav: !!isFav
  }
}

export const userInfo = async useId => {
  const user = await db.user.findFirst({
    where: { id: useId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true
    }
  })
  return user
}

export const getCars = async () => {
  return await db.car.findMany({})
}

export const getDepartment = async () => {
  return await db.service.findMany({ where: { type: 'department' } })
}
export const getExtraService = async () => {
  return await db.service.findMany({ where: { type: 'subservice' } })
}
