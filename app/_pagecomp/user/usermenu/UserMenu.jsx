'use client'
import React, { useState } from 'react'
import { Avatar } from '@/components/shared/Avatar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter
} from '@/components/ui/sheet'

import { UseMenuFooter } from './UseMenuFooter'
import { UserMenuHeader } from './UserMenuHeader'
import { UserMenuBody } from './UserMenuBody'
import { Button } from '@/components/ui/button'
import { ActivationAndToggle } from './ActivationAndToggle'

export const dynamic = 'force-dynamic'

function UserMenu({ session, newMails }) {
  const [open, setOpen] = useState(false)
  const userAvatar = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${session?.user?.image}`

  const useremail = session?.user?.email
  const role = session?.user?.role
  const isVerified = session?.user?.isVerified

  // <OTPDisgits />
  // <ActivationForm />

  return (
    <div className='flex  items-center   '>
      {isVerified ? (
        <Button onClick={() => setOpen(true)}>
          <Avatar
            src={userAvatar}
            alt={useremail}
            fallBack={useremail}
            role={role}
          />
        </Button>
      ) : (
        <ActivationAndToggle
          isVerified={isVerified}
          setOpen={setOpen}
          session={session}
          image={userAvatar}
        />
      )}

      {/* {newMails?.length !== 0 ? null : (
          <div className='absolute left-0 top-2 flex size-5 items-center justify-center rounded-full  bg-destructive  text-primary-foreground'>
            <span className='text-[.6rem] text-destructive-foreground'>
              {newMails?.length || 0}
            </span>
          </div>
        )} */}
      {/* </Button> */}

      {/* {!isVerified && <ActivationForm />} */}

      <UserSideMenu
        open={open}
        setOpen={setOpen}
        session={session}
        newMails={newMails}
      />
    </div>
  )
}

export default UserMenu

function UserSideMenu({ open, setOpen, session, newMails }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='flex h-full w-full flex-col items-center justify-between'>
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
