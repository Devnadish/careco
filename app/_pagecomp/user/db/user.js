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

  if (userExists) {
    return {
      code: 401,
      msg: code401msg
    }
  }

  const verifiedToken = Math.floor(1000 + Math.random() * 9000).toString()
  const hashpassword = bcrypt.hashSync(data.password, 8)
  const newData = {
    ...data,
    VerifiedToken: verifiedToken,
    password: hashpassword
  }

  const newUser = await db.user.create({ data: newData })
  if (newUser) {
    return {
      code: 200,
      msg: code200msg
    }
  }

  // const [newUser, mailSent] = await Promise.all([
  //   db.user.create({ data: newData }),
  //   sendEmail(newData)
  // ])

  // if (mailSent && newUser) {
  //   return {
  //     code: 200,
  //     msg: code200msg
  //   }
  // }

  return {
    code: 400,
    msg: code400msg
  }
}

export const sendEmail = async activationCode => {
  // TODO: validate email with Zod
  try {
    const { data } = await resend.emails.send({
      from: sender,
      to: [activationCode.email],
      subject: 'تفعيل حسابك CarFriend',
      html: htmlMsg(activationCode.VerifiedToken, activationCode.name)
    })
    return data
  } catch (error) {
    return error
  }
}

// html: `
//       <h1>رقم تفعيل حسابك لمنصة صديق السيارة</h1>
//       <p>مرحبا  ${activationCode.name},</p>
//      <p>مرحبًا بك في كار فريند! لتفعيل حسابك والبدء باستخدام خدماتنا، يرجى إدخال رمز التفعيل التالي:</p>
//       <div style="background-color: #009933; padding: 10px; border: 1px solid #ddd; display: inline-block; font-size: 24px; font-weight: bold; color: white">
//         ${activationCode.VerifiedToken}
//       </div>
//       <p>If you cannot use the code for some reason, please contact us at [Support Email Address] for assistance.</p>
//       <p>Thanks,</p>
//       <p>The CarFriend Team</p>

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
