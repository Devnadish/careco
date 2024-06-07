'use client'
import React from 'react'
import Text from '@/components/shared/Text'
import { Pencil } from 'more/lib/icons'
import ThemeSwitch from '@/components/shared/ThemeSwitch'
import Link from 'next/link'
import Inbox from '../../admin/mailsystem/Inbox'
import { Avatar } from '@/components/shared/Avatar'
import { ActivationAndToggle } from './ActivationAndToggle'

export function UserMenuHeader({ session, newMails }) {
  const isVerified = session?.user?.isVerified
  const userAvatar = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${session?.user?.image}`
  return (
    <div className='flex w-full  flex-wrap items-center gap-0 rounded-t-xl bg-secondary/40'>
      <div className=' mb-5 flex w-full items-end justify-center gap-4'>
        <Avatar src={userAvatar} alt={session?.user?.name} size={20} />
        <div className='flex flex-col items-start'>
          <Text fontFamily={'tajwal'} fontSize={'xl2'}>
            {session?.user?.name}
          </Text>
          <Text fontFamily={'tajwal'} fontSize={'xs'}>
            {session?.user?.email}
          </Text>
        </div>
      </div>
      <InboxAndEditProfile session={session} newMails={newMails} />
    </div>
  )
}
function InboxAndEditProfile(props) {
  return (
    <div className='flex  w-full items-center  justify-between px-2'>
      <Inbox session={props.session} newMails={props.newMails} />
      <Link
        href={`/profile/${props.session?.user?.id}`}
        className='flex flex-col items-center justify-center gap-1 rounded border border-border p-1 px-6  hover:text-blue-500'
      >
        <Pencil className='size-4' />
        <Text fontSize={'xs'}> الملف الشخصي</Text>
      </Link>
    </div>
  )
}
