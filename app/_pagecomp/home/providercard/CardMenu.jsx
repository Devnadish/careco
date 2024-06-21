import DropMenu from '@/components/shared/DropMenu'
import { MenuDot } from '@/components/svg/MenuDot'
import { Button } from '@/components/ui/button'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MessageCircleMore, Share2, Star } from '@/more/lib/icons'

function CardMenu() {
  const sty =
    'flex items-center justify-between font-noto text-sm leading-6 text-muted-foreground'
  return (
    <DropdownMenu dir='rtl' modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='size-12 rounded-full'>
          <MenuDot />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 border-foreground/40 shadow-lg '
        aligh='start'
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className={sty}>
            مشاهدة التعليقات
            <MessageCircleMore className='size-4 text-muted-foreground' />
          </DropdownMenuItem>
          <DropdownMenuItem className={sty}>
            مشاهدة التقييم
            <Star className='size-4 text-muted-foreground' />
          </DropdownMenuItem>
          <DropdownMenuItem className={sty}>
            ارسال لصديق
            <Share2 className='size-4 text-muted-foreground' />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={sty}>حجز موعد</DropdownMenuItem>
          <DropdownMenuItem className={sty}>طلب عرض سعر</DropdownMenuItem>
          <DropdownMenuItem className={sty}>اضافة للمفضلة</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem className={sty}>حجب</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default CardMenu
