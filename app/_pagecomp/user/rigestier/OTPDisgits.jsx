'use client'

import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { useState } from 'react'
import { activationsUser } from '../db/user'
import { LogoSpinnerInline } from '@/components/shared/LogoSpinnerInline'
import { Notify } from '@/lib/nadish'
import { useSession } from 'next-auth/react'

export function OTPDisgits({ session }) {
  const [value, setValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const { data: newSession, update } = useSession()

  const handleConfirmation = async mail => {
    setLoading(true)
    const ApproveActivation = await activationsUser(mail, value)

    // update session
    if (ApproveActivation.code === 200) {
      await update({
        ...newSession,
        user: { ...newSession?.user, isVerified: true }
      })
      window.location.reload(true)
    }
    setLoading(false)
    Notify(ApproveActivation.msg, 'info', 'تنشيط الحساب', 5000)
  }
  return (
    <>
      {loading && <LogoSpinnerInline msg={'تنشيط الحساب .. انتظر'} />}
      <div
        className='flex w-full flex-col items-center justify-center gap-4'
        dir='ltr'
      >
        <Text className={'flex flex-col items-center gap-2'} dir={'rtl'}>
          <span>مرحبا {session?.user?.name}</span>
          <span>تم ارسال رمز التفعيل علي الايميل </span>
          <span> {session?.user?.email} </span>
          <span>الرجاء ادخال الرمز</span>
        </Text>
        <InputOTP
          maxLength={4}
          value={value}
          onChange={value => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <div className='flex w-full flex-col items-center justify-center gap-2'>
          <Button
            className='w-1/2 bg-primary'
            onClick={() => {
              handleConfirmation(session?.user?.email)
            }}
          >
            تاكيد
          </Button>
          {/* <Button variant='outline' className='w-1/2 text-blue-500'>
          اعادة ارسال الرمز
        </Button> */}
        </div>
      </div>
    </>
  )
}
