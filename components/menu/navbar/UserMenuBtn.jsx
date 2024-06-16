'use client'
import React, { useState, lazy, Suspense } from 'react'
import { Avatar } from '@/components/shared/Avatar'
import LogoSpinnerInline from '@/components/shared/spinner/LogoSpinnerInline'
import { Button } from '@/components/ui/button'
const UserMenu = lazy(() => import('@/app/_pagecomp/user/usermenu/UserMenu'))

const UserMenuBtn = ({ userName, userAvatar, session, newMails }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false)
  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        className='relative '
        onClick={() => setOpenUserMenu(true)}
      >
        <Avatar src={userAvatar} alt={userName} />
      </Button>
      {openUserMenu && (
        <Suspense fallback={<LogoSpinnerInline />}>
          <UserMenu
            openUserMenu={openUserMenu}
            setOpenUserMenu={setOpenUserMenu}
            session={session}
            newMails={newMails}
          />
        </Suspense>
      )}
    </>
  )
}
export default UserMenuBtn
