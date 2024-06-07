import React from 'react'

import { LogoutIcon } from '@/components/svg/LogoutIcon'
import { signOut } from 'next-auth/react'
import ThemeSwitch from '@/components/shared/ThemeSwitch'
import { Button } from '@/components/ui/button'

export function UseMenuFooter({ isVerified, setOpen }) {
  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' })
  }
  return (
    <div className='flex w-full items-center justify-between  '>
      <ThemeSwitch />

      <Button variant='outline' onClick={handleLogout}>
        <LogoutIcon className='size-6' />
      </Button>
    </div>
  )
}
