'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import SideBox from '@/components/shared/SideBox'
import { UserMenuHeader } from './UserMenuHeader'
import { UseMenuFooter } from './UseMenuFooter'
import ActivationForm from '@/app/_pagecomp/user/rigestier/ActivationForm'
import { Avatar } from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import {
  BotMessageSquare,
  Edit,
  HeartHandshake,
  Lock,
  MessageCircleMore,
  Share2,
  Star
} from 'more/lib/icons'
import { Like, Dislike } from '@/components/svg/LikeAndDislike'
import { SendService } from '@/components/svg/SendService'
import { ItemLink } from '@/app/_pagecomp/user/usermenu/ItemLink'
import { HistoryIcon } from '@/components/svg/History'

function UserMenu({ session, newMails }) {
  const [open, setOpen] = useState(false)
  const userId = session?.user?.id
  const userName = session?.user?.name
  const userAvatar = session?.user?.image
  const useremail = session?.user?.email
  const isVerified = session?.user?.isVerified
  const role = session?.user?.role

  return (
    <div className='flex   items-center     '>
      <div
        className='relative   cursor-pointer     rounded-full  bg-transparent '
        onClick={() => setOpen(true)}
      >
        <Avatar
          src={userAvatar}
          alt={useremail}
          fallBack={useremail}
          role={role}
        />
        {newMails?.length !== 0 ? null : (
          <div className='absolute left-0 top-2 flex size-5 items-center justify-center rounded-full  bg-destructive  text-primary-foreground'>
            <span className='text-[.6rem] text-destructive-foreground'>
              {newMails?.length || 0}
            </span>
          </div>
        )}
      </div>

      {!isVerified && <ActivationForm />}

      <SideBox open={open} setOpen={setOpen}>
        <UserMenuHeader
          image={userAvatar}
          name={userName}
          email={useremail}
          alt={userName}
          isVerified={isVerified}
          userid={userId}
          session={session}
          newMails={newMails}
        />
        <UserMenuBody
          isVerified={isVerified}
          userId={userId}
          setOpen={setOpen}
        />
        <UseMenuFooter
          userId={userId}
          isVerified={isVerified}
          setOpen={setOpen}
        />
      </SideBox>
    </div>
  )
}

export default UserMenu

export function UserMenuBody({ isVerified, userId, setOpen }) {
  const menuItems = [
    // TODO:  صفحتي Show only if Provider
    {
      href: `/reaction/${userId}/rate`,
      icon: <Edit size={20} strokeWidth={1} className='text-foreground' />,
      text: 'صفحتي'
    },
    {
      href: `/reaction/${userId}/rate`,
      icon: <Star size={20} strokeWidth={1} className='text-foreground' />,
      text: 'التقييم'
    },
    // {
    //   href: `/reaction/${userId}/favorate`,
    //   icon: (
    //     <HeartHandshake size={20} strokeWidth={1} className='text-foreground' />
    //   ),
    //   text: 'المفضلة'
    // },
    { href: `/reaction/${userId}/like`, icon: <Like />, text: 'إعجاب' },
    {
      href: `/reaction/${userId}/dislike`,
      icon: <Dislike />,
      text: 'الاعجاب السلبي'
    },
    {
      href: `/reaction/${userId}/history`,
      icon: <HistoryIcon />,
      text: 'سجل المشاهدات'
    },
    {
      href: `/user/conslntent/${userId}`,
      icon: (
        <BotMessageSquare
          size={20}
          strokeWidth={1}
          className='text-foreground'
        />
      ),
      text: 'استشارة'
    },
    {
      href: `/user/comments/${userId}`,
      icon: (
        <MessageCircleMore
          size={20}
          strokeWidth={1}
          className='text-foreground'
        />
      ),
      text: 'التعليقات'
    },
    {
      href: `/mailsystem`,
      icon: <Share2 className='size-5' />,
      text: 'المشاركة'
    },
    {
      href: `/user/sendmaintinance/${userId}`,
      icon: <SendService className='size-5' />,
      text: 'ارسال كرت صيانة'
    }
  ]

  return (
    <div className='' name='header' dir='rtl'>
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <ItemLink
            href={item.href}
            text={item.text}
            icon={item.icon}
            setOpen={setOpen}
          />
          {/* {index !== menuItems.length - 1 && <Separator />} */}
        </React.Fragment>
      ))}
      {!isVerified && (
        <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded  bg-secondary opacity-60'>
          <Lock size={80} className='text-red-500' />
          <Text
            fontFamily={'tajwal'}
            fontSize={'large'}
            className={'text-red-500'}
          >
            حساب غير نشط
          </Text>
        </div>
      )}
    </div>
  )
}
