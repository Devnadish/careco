'use server'
import db from '@/more/lib/prisma'
import { revalidatePath } from 'next/cache'

export const getDepartmentData = async (poviderSlug, departmentSlug) => {
  const PID = await db.provider.findFirst({ where: { slug: poviderSlug } })
  const poviderId = PID.id
  const DID = await db.service.findFirst({ where: { slug: departmentSlug } })
  const departmentid = DID.id

  const departmentData = await db.ProviderDepartment.findFirst({
    where: { providerid: poviderId, departmentid: departmentid }
  })

  const comments = await ShowDepartmentComment(poviderId, departmentid)

  return {
    department: departmentData,
    comment: comments,
    poviderId,
    providerName: PID.providerName,
    departmentid
  }
}

export const addDepartmentComment = async (
  data,
  poviderSlug,
  departmentSlug
) => {
  // TODO: Add validation & Send email to provider for New department comment
  try {
    const save = await db.DepartmentComment.create({ data })
    await addCommentToProvider(data.providerid)
    revalidatePath(`/`)
    revalidatePath(`/comment/department/${poviderSlug}/${departmentSlug}`)
  } catch (error) {
    console.log(error)
  }
}

export const ShowDepartmentComment = async (providerid, departmentid) => {
  try {
    const data = await db.DepartmentComment.findMany({
      where: { providerid: providerid, departmentid: departmentid }
    })

    const userCommentsWithUserImage = await Promise.all(
      data.map(async comment => {
        const user = await db.user.findFirst({
          where: { id: comment.userid }
        })

        return {
          ...comment,
          userImage: user.image || '',
          userName: user.name || ''
        }
      })
    )

    return userCommentsWithUserImage
  } catch (error) {
    console.log(error)
  }
}

// const addCommentToProvider = async providerid => {
//   return await db.provider.update({
//     where: { id: providerid },
//     data: { commentCount: { increment: 1 } }
//   })
// }

export const getserviceData = async (poviderSlug, serviceSlug) => {
  const PID = await db.provider.findFirst({ where: { slug: poviderSlug } })
  const poviderId = PID.id

  const DID = await db.service.findFirst({ where: { slug: serviceSlug } })
  const serviceid = DID.id
  const serviceData = await db.ProviderService.findFirst({
    where: { providerid: poviderId, serviceid: serviceid }
  })

  const comments = await ShowserviceComment(poviderId, serviceid)

  return {
    service: serviceData,
    comment: comments,
    poviderId,
    providerName: PID.providerName,
    serviceid
  }
}

export const addserviceComment = async (data, poviderSlug, serviceSlug) => {
  // TODO: Add validation & Send email to provider for New Servicecomment
  try {
    const save = await db.ExtraServiceComment.create({ data })
    await addCommentToProvider(data.providerid)
    revalidatePath(`/`)
    revalidatePath(`/comment/service/${poviderSlug}/${serviceSlug}`)
  } catch (error) {
    console.log(error)
  }
}

export const ShowserviceComment = async (providerid, serviceid) => {
  try {
    const data = await db.ExtraServiceComment.findMany({
      where: { providerid: providerid, serviceid: serviceid }
    })
    const userCommentsWithUserImage = await Promise.all(
      data.map(async comment => {
        const user = await db.user.findFirst({
          where: { id: comment.userid }
        })
        return {
          ...comment,
          userImage: user.image || '',
          userName: user.name || ''
        }
      })
    )

    return userCommentsWithUserImage
  } catch (error) {
    console.log(error)
  }
}

const addCommentToProvider = async providerid => {
  return await db.provider.update({
    where: { id: providerid },
    data: { commentCount: { increment: 1 } }
  })
}
