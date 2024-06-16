'use client'
import React, { useState } from 'react'
import Text from '@/components/shared/Text'
import { NotActive } from '@/components/svg/NotActive'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/shared/Avatar'
import { sendConfirmationCode } from '../db/user'
import LogoSpinnerInline from '@/components/shared/spinner/LogoSpinnerInline'

export const ActivationAndToggle = ({
  isVerified,
  setOpen,
  session,
  image
}) => {
  const [loading, setLoading] = useState(false)
  const handleActivation = async mail => {
    if (isVerified) return
    setLoading(true)
    const confirmationCode = await sendConfirmationCode(mail)
    setLoading(false)
    setOpen(true)
  }
  return (
    <>
      {loading && <LogoSpinnerInline msg={'فحص رمز الحماية .. انتظر'} />}

      <Button
        variant='outline'
        className='flex items-center gap-2'
        onClick={() => handleActivation(session?.user?.email)}
      >
        <Avatar
          src={image}
          alt={session?.user?.name}
          fallBack={session?.user?.name}
          size={6}
        />
        <Text>تفعيل الحساب</Text>

        <NotActive className='size-6 text-primary' />
      </Button>
    </>
  )
}
