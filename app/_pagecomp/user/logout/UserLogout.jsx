import React from 'react'
import { signOut } from 'next-auth/react'
import { LogoutIcon } from '@/components/svg/LogoutIcon'
import { Button } from '@/components/ui/button'

const UserLogout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <Button variant='outline' onClick={handleLogout}>
      <LogoutIcon className='size-8' />
    </Button>
  )
}

export default UserLogout
