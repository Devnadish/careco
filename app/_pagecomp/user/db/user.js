'use server'
import { htmlMsg, sender } from 'more/constant/userMsg'
import db from 'more/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import bcrypt from 'bcrypt'

const resend = new Resend(process.env.RESEND_API_KEY)

export const newUser = async data => {
  const hashpassword = bcrypt.hashSync(data.password, 8)
  const newData = {
    ...data,
    password: hashpassword
  }

  try {
    const newUser = await db.user.create({ data: newData })
    return newUser
      ? { code: 200, msg: 'Account created. Please activate.' }
      : null
  } catch (error) {
    if (error.code === 'P2002') {
      return { code: 400, msg: 'Email already in use' }
    } else {
      console.error(error) // Log other errors for debugging
      return { code: 500, msg: 'Registration failed' }
    }
  }
}

export const sendConfirmationCode = async userEemail => {
  const user = await db.user.findFirst({ where: { email: userEemail } })
  if (user.VerifiedToken !== '') {
    return null
  }
  const { email, name } = user
  const verifiedToken = Math.floor(1000 + Math.random() * 9000).toString()
  try {
    const mailData = await resend.emails.send({
      from: sender,
      to: [email],
      subject: 'تفعيل حسابك CarFriend',
      html: htmlMsg(verifiedToken, name)
    })
  } catch (error) {
    return error
  }
  const addToketTouser = await db.user.update({
    where: { id: user.id },
    data: { VerifiedToken: verifiedToken }
  })
}

export const activationsUser = async (mail, VerifiedToken) => {
  const userExists = await db.user.findFirst({ where: { email: mail } })
  if (!userExists) {
    return {
      code: 401,
      msg: 'الايميل غير صحيح'
    }
  }

  if (userExists.VerifiedToken !== VerifiedToken) {
    return {
      code: 402,
      msg: 'رمز التفعيل غير صحيح'
    }
  }

  const { isVerified } = await db.user.update({
    where: { email: mail, VerifiedToken: VerifiedToken },
    data: { isVerified: true }
  })

  if (isVerified) {
    return {
      code: 200,
      msg: 'تم تنشيظ الحساب بنجاح استمتع معانا  يسعدنا اقتراحاتك لتطوير المنصة'
    }
  }
}

function isUniqueConstraintError(error) {
  return error.code === 'P2002' // Replace with your specific error code check
}
