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

export const activationCode = async email => {
  const user = await db.user.findFirst({ where: { email } })
  const verifiedToken = Math.floor(1000 + Math.random() * 9000).toString()

  const mailSent = await sendEmail(user.email, user.name, verifiedToken)
}

export const sendEmail = async (email, name, verifiedToken) => {
  try {
    const xdata = await resend.emails.send({
      from: sender,
      to: [email],
      subject: 'تفعيل حسابك CarFriend',
      html: htmlMsg(verifiedToken, name)
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

function isUniqueConstraintError(error) {
  return error.code === 'P2002' // Replace with your specific error code check
}
