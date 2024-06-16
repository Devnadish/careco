'use client'
import { menu } from '@/more/constant/menu'
import Link from 'next/link'
import Text from '../../shared/Text'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTrigger
} from '@/components/ui/sheet'
import ThemeSwitch from '../../shared/ThemeSwitch'
import { Instagram, Tiktok, XTwitter } from '../../svg/Socail'
import { JoinRequest } from '../../svg/JoinRequest'
import { Separator } from '../../ui/separator'
import { Button } from '../../ui/button'
import NewMail from '@/app/_pagecomp/admin/mailsystem/NewMail'
import { usePathname } from 'next/navigation'
import { ScrollArea } from '../../ui/scroll-area'
import { ExclamationCircle } from '../../svg/ExclamationCircle'
import Image from 'next/image'

const MainMenu = ({ open, setOpen, session }) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='flex w-full flex-col items-center justify-between '>
        <SheetHeader>
          <HeaderMenu />
          <Separator />
        </SheetHeader>
        <ScrollArea
          className='h-72   w-full rounded-md px-3'
          dir='rtl'
          type='auto'
        >
          <div className='flex  h-full w-full  flex-col  items-start   gap-1      '>
            {menu.map(menuItem => {
              return (
                <div
                  key={menuItem.id}
                  className='flex w-full items-center justify-between'
                >
                  <Link
                    href={menuItem.href}
                    className='flex w-full items-center  justify-between gap-2 rounded  px-3 py-1 text-sm hover:bg-secondary/80     '
                  >
                    <div className='flex items-center gap-2'>
                      {menuItem.icon}
                      <Text opacity={'O70'} fontFamily={'cairo'}>
                        {menuItem.title}
                      </Text>
                    </div>
                  </Link>
                  <Button
                    variant='ghost'
                    onClick={() => alert(menuItem.description)}
                  >
                    <ExclamationCircle className='text-muted-foreground' />
                  </Button>
                </div>
              )
            })}
          </div>
        </ScrollArea>
        <SheetFooter className='w-full flex-col'>
          <RequestToJoin session={session} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
export default MainMenu

const HeaderMenu = () => {
  return (
    <div className='mt-5 flex w-full items-center justify-between'>
      <ThemeSwitch />
      <div className='flex items-center gap-2'>
        <Tiktok className='size-8' />
        <Instagram className='size-8' />
        <XTwitter className='size-8' />
      </div>
    </div>
  )
}
const RequestToJoin = ({ session }) => {
  const pathName = usePathname()
  let urlPrefix

  if (pathName === '/') {
    urlPrefix = 'admin'
  }
  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <Separator />

      <div className='flex w-full items-center justify-between gap-2'>
        <div variant='ghost' className='flex  items-center gap-1'>
          <NewMail
            urlPrefix={urlPrefix}
            session={session}
            to={process.env.NEXT_PUBLIC_ADMIN_EMAIL}
          />
          <Text>راسلنا</Text>
        </div>
        <Button variant='ghost' className='flex  items-center gap-3'>
          <JoinRequest className='size-6' />
          <Text>طلب انضمام </Text>
        </Button>
      </div>
    </div>
  )
}
