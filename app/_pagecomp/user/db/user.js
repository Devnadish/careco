'use server'
import {
  code200msg,
  code400msg,
  code401msg,
  htmlMsg,
  sender
} from 'more/constant/userMsg'
import db from 'more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import bcrypt from 'bcrypt'

const resend = new Resend(process.env.RESEND_API_KEY)

export const newUser = async data => {
  const userExists = await db.user.findFirst({ where: { email: data.email } })

  // if (userExists) {
  //   return {
  //     code: 401,
  //     msg: code401msg
  //   }
  // }

  const verifiedToken = Math.floor(1000 + Math.random() * 9000).toString()
  const hashpassword = bcrypt.hashSync(data.password, 8)
  const newData = {
    ...data,
    VerifiedToken: verifiedToken,
    password: hashpassword
  }

  // const newUser = await db.user.create({ data: newData })
  // if (newUser) {
  //   return {
  //     code: 200,
  //     msg: code200msg
  //   }
  // }
  const mailSent1 = await sendEmail(newData)

  const [newUser, mailSent] = await Promise.all([
    db.user.create({ data: newData }),
    sendEmail(newData)
  ])
  console.log(mailSent)

  if (mailSent && newUser) {
    return {
      code: 200,
      msg: code200msg
    }
  }

  return {
    code: 400,
    msg: code400msg
  }
}

export const sendEmail = async activationCode => {
  // TODO: validate email with Zod
  console.log(activationCode)

  try {
    const xdata = await resend.emails.send({
      from: sender,
      to: [activationCode.email],
      subject: 'تفعيل حسابك CarFriend',
      html: htmlMsg(activationCode.VerifiedToken, activationCode.name)
    })
    console.log(xdata)
    return xdata.data
  } catch (error) {
    return error
  }
}

export const activationsUser = async data => {
  const userExists = await db.user.findFirst({ where: { email: data.email } })
  if (!userExists) {
    return {
      code: 401,
      msg: 'الايميل غير صحيح'
    }
  }

  if (userExists.VerifiedToken !== data.VerifiedToken) {
    return {
      code: 402,
      msg: 'الرمز غير صحيح'
    }
  }

  const { isVerified } = await db.user.update({
    where: { email: userExists.email, VerifiedToken: userExists.VerifiedToken },
    data: { isVerified: true }
  })

  if (isVerified) {
    return {
      code: 200,
      msg: 'تم تنشيظ الحساب بنجاح استمتع معانا  يسعدنا اقتراحاتك لتطوير المنصة'
    }
  }
}
