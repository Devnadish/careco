'use server'
import db from 'more/lib/prisma'
import { revalidatePath } from 'next/cache'

// code defination
// 1-like
// 2-dislike
// 3-view provider

export const addViewer = async (providerid, userid) => {
  const isExist = await db.userAction.findMany({
    where: { userid: userid, providerid: providerid, actionid: 3 }
  })

  if (isExist.length === 0) {
    await addViewAction(providerid, userid)
    await increaseProviderViewCounter(providerid)
    revalidatePath(`/reaction/${userid}/history`)
    revalidatePath(`/reaction/${userid}/rate`)
    revalidatePath(`/reaction/${userid}/dislike`)
    revalidatePath(`/reaction/${userid}/like`)
    revalidatePath(`/`)
    return { message: 'done' }
  }
}

async function addViewAction(providerid, userid) {
  await db.userAction.create({
    data: { userid, providerid, actionid: 3 }
  })
}

async function increaseProviderViewCounter(providerid) {
  await db.provider.update({
    where: { id: providerid },
    data: { viewerCount: { increment: 1 } }
  })
}

// --------------------addDViewAction--------------------------

// export const addDViewAction = async (providerid, userid) => {
//   return await db.userAction.create({
//     data: { userid: userid, providerid: providerid, actionid: 3 }
//   })
// }
// // --------------------IncreaseViewerProviderCounter--------------------------
// export const IncreaseViewerProviderCounter = async providerid => {
//   return await await db.provider.update({
//     where: { id: providerid },
//     data: {
//       viewerCount: { increment: 1 }
//     }
//   })
// }
