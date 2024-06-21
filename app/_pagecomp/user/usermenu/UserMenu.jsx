'use client'
import React, { useState } from 'react'
import { Avatar } from '@/components/shared/Avatar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter
} from '@/components/ui/sheet'
import { signOut } from 'next-auth/react'

import { UseMenuFooter } from './UseMenuFooter'
import { UserMenuHeader } from './UserMenuHeader'
import { UserMenuBody } from './UserMenuBody'
import { Button } from '@/components/ui/button'
import { ActivationAndToggle } from './ActivationAndToggle'
import { Lock } from '@/more/lib/icons'
import Text from '@/components/shared/Text'
import { OTPDisgits } from '../rigestier/OTPDisgits'
import { LogoutIcon } from '@/components/svg/LogoutIcon'

export const dynamic = 'force-dynamic'

function UserMenu({ session, newMails, openUserMenu, setOpenUserMenu }) {
  const [open, setOpen] = useState(false)
  const userAvatar = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${session?.user?.image}`

  const useremail = session?.user?.email
  const role = session?.user?.role
  const isVerified = session?.user?.isVerified

  return (
    <div className='flex  items-center   '>
      {isVerified ? (
        <UserSideMenu
          open={openUserMenu}
          setOpen={setOpenUserMenu}
          session={session}
          newMails={newMails}
        />
      ) : (
        <ActivationAndToggle
          isVerified={isVerified}
          setOpen={setOpen}
          session={session}
          image={userAvatar}
        />
      )}
    </div>
  )
}

export default UserMenu

function UserSideMenu({ open, setOpen, session, newMails }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='flex h-full w-full flex-col items-center justify-between'>
        {session?.user?.isVerified ? null : (
          <AccountInactive session={session} />
        )}
        <SheetHeader className={'w-full'} id='heaer'>
          <UserMenuHeader session={session} newMails={newMails} />
        </SheetHeader>

        <UserMenuBody
          isVerified={session?.user?.isVerified}
          userid={session?.user?.id}
          setOpen={setOpen}
        />

        <SheetFooter className={'w-full'} id='footer'>
          <UseMenuFooter
            isVerified={session?.user?.isVerified}
            setOpen={setOpen}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const AccountInactive = ({ session }) => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' })
  }
  return (
    <div className='absolute z-50 flex h-full w-full  flex-col bg-background/55  px-3 shadow-xl  backdrop-blur-sm '>
      <Button variant='outline' onClick={handleLogout}>
        <LogoutIcon className='size-6' />
      </Button>
      <div className='flex  h-full w-full flex-col items-center justify-center gap-4 '>
        <Lock size={80} strockWidth={1} />
        <Text
          fontFamily={'cairo'}
          fontSize={'large'}
          className={'font-semibold text-red-500'}
        >
          الحساب غير نشط
        </Text>
        <OTPDisgits session={session} />
      </div>
    </div>
  )
}
