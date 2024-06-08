'use client'
import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/ui/button'
import React from 'react'

const UserMenuBtn = ({ userName, userAvatar, setOpenUserMenu }) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative '
      onClick={() => setOpenUserMenu(true)}
    >
      <Avatar src={userAvatar} alt={userName} />
    </Button>
  )
}
export default UserMenuBtn
