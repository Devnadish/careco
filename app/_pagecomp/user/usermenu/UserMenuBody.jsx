import React from 'react'
import Text from '@/components/shared/Text'
import {
  BotMessageSquare,
  Heart,
  HeartHandshake,
  Lock,
  MessageCircleMore,
  Star
} from 'more/lib/icons'
import { Like, Dislike } from '@/components/svg/LikeAndDislike'
import { SendService } from '@/components/svg/SendService'
import { ItemLink } from '@/app/_pagecomp/user/usermenu/ItemLink'
import { SelectCity } from './SelectCity'
import { HistoryIcon } from '@/components/svg/History'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from 'node_modules/@radix-ui/react-scroll-area/dist/index'
import { createUserMenuLinks, getUserMenu } from 'more/constant/menu'

export function UserMenuBody({ isVerified, userId, setOpen }) {
  const menuItems = [
    {
      href: `/reaction/${userId}/rate`,
      icon: <Star size={20} strokeWidth={1} className='text-foreground' />,
      text: 'التقييم'
    },
    {
      href: `/reaction/${userId}/favorate`,
      icon: (
        <HeartHandshake size={20} strokeWidth={1} className='text-foreground' />
      ),
      text: 'المفضلة'
    },
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
      icon: <SendService className='size-5' />,
      text: 'المراسلات'
    },
    {
      href: `/user/sendmaintinance/${userId}`,
      icon: <SendService className='size-5' />,
      text: 'ارسال كرت صيانة'
    }
  ]

  return (
    <>
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
          <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded bg-secondary opacity-60'>
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
      {/* <SelectCity /> */}
    </>
  )
}
