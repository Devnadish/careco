'use server'
import db from 'more/lib/prisma'
import { revalidatePath } from 'next/cache'

// ############################ Like Action
export const addLikeAction = async (providerid, userid, comment) => {
  try {
    await db.userAction.create({
      data: { userid, providerid, actionid: 1, comment }
    })
    await db.provider.update({
      where: { id: providerid },
      data: { likeCount: { increment: 1 } }
    })
    revalidatePath('/')
    return { stuts: true, msg: 'done' }
  } catch (error) {
    return { stuts: false, origin: 'likeAction', message: error.message }
  }
}

// ############################ disLike Action
export const addDislikeAction = async (providerid, userid, comment) => {
  try {
    await db.userAction.create({
      data: { userid, providerid, actionid: 2, comment: comment }
    })

    await db.provider.update({
      where: { id: providerid },
      data: { disLikeCount: { increment: 1 } }
    })
    revalidatePath('/')
    return { stuts: true, msg: 'done' }
  } catch (error) {
    return { stuts: false, origin: 'disLikeAction', message: error.message }
  }
}

// ############################ fav Action
export const addFavoriteAction = async (providerid, userid) => {
  try {
    await db.userAction.create({
      data: { userid, providerid, actionid: 5 }
    })
    await db.provider.update({
      where: { id: providerid },
      data: { favCount: { increment: 1 } }
    })
    revalidatePath('/')
    return { stuts: true, msg: 'done' }
  } catch (error) {
    return { stuts: false, origin: 'favAction', message: error.message }
  }
}
