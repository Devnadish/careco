import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { LogoutIcon } from '@/components/svg/LogoutIcon'
import { Button } from '@/components/ui/button'

function UserLogout() {
  return (
    <Button variant='outline' onClick={() => signOut()}>
      <LogoutIcon className='size-8' />
    </Button>
  )
}

export default UserLogout
