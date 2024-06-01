'use server'
import db from 'more/lib/prisma'
import { revalidatePath } from 'next/cache'

export const checkMails = async mail => {
  const inboxMail = await db.inbox.findMany({
    where: { to: mail, isOpen: false }
  })
  return inboxMail
}

export const getSingleMail = async mail => {
  const Mail = await db.inbox.findFirst({
    where: { id: mail }
  })

  const flagReadIt = await db.inbox.update({
    where: { id: mail },
    data: { isOpen: true }
  })
  revalidatePath('/')

  return Mail
}

export const sendMail = async data => {
  try {
    if (data.to === data.from) {
      return {
        stuts: false,
        msg: 'لا يمكن ارسال البريد الالكتروني لنفسك'
      }
    }
    const checkToMailInUser = await db.user.findFirst({
      where: { email: data.to }
    })

    if (!checkToMailInUser) {
      return {
        stuts: false,
        msg: 'البريد الالكتروني غير موجود'
      }
    }

    const newMail = await db.inbox.create({ data: data })
    await revalidatePath('/')
    await revalidatePath('/mailsystem')

    if (newMail.id) {
      return {
        stuts: true,
        msg: 'تم ارسال الايميل شاكرين تعاونكم وستم الرد عليكم في اقرب وقت ممكن'
      }
    } else {
      throw new Error('لم يتم ارسال الايمبل')
    }
  } catch (error) {
    console.error('sendMail error', error)
    return {
      stuts: false,
      msg: 'لم يتم ارسال الايمبل اعد المحاوله في وقت لاحق'
    }
  }
}

export const sendReactionMail = async (from, to, subject, msg, type) => {
  const newMail = await db.inbox.create({
    data: { from, to, subject, msg, url: 'reaction', type }
  })
  if (newMail.id) {
    return {
      stuts: true,
      msg: 'تم ارسال الايميل شاكرين تعاونكم وستم الرد عليكم في اقرب وقت ممكن'
    }
  } else {
    return {
      stuts: false,
      msg: 'لم يتم ارسال الايمبل اعد المحاوله في وقت لاحق'
    }
  }
}

export const collectMail = async userid => {
  const send = await db.inbox.findMany({
    where: { from: userid }
  })
  const recive = await db.inbox.findMany({
    where: { to: userid }
  })

  const mailCount = await db.inbox.count({
    where: {
      OR: [{ to: userid }, { from: userid }]
    }
  })

  const newMailCount = await db.inbox.count({
    where: { to: userid, isOpen: false }
  })
  return { mailCount, newMailCount, send, recive }
}

export const readDone = async mailId => {
  const updateMail = await db.inbox.update({
    where: { id: mailId },
    data: { isOpen: true }
  })

  await revalidatePath('/')
  await revalidatePath('/mailsystem')
  return updateMail
}
