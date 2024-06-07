'use client'
import React from 'react'
import Text from '@/components/shared/Text'
import { NotActive } from '@/components/svg/NotActive'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/shared/Avatar'

export const ActivationAndToggle = ({
  isVerified,
  setOpen,
  session,
  image
}) => {
  const handleActivation = () => {
    if (isVerified) return
    setOpen(true)
  }
  return (
    <Button
      className='flex items-center gap-2 bg-destructive text-primary-foreground'
      onClick={() => handleActivation()}
    >
      <Avatar
        src={image}
        alt={session?.user?.name}
        fallBack={session?.user?.name}
      />
      <Text>تفعيل الحساب</Text>
      <NotActive className='size-6' fill='gray' />
    </Button>
  )
}
