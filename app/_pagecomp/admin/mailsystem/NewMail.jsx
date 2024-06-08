'use client'
import * as React from 'react'

import { useMediaQuery } from '@react-hook/media-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger
} from '@/components/ui/drawer'
import MsgForm from '@/app/_pagecomp/admin/mailsystem/MsgForm'
import { EMail } from '@/components/svg/Mail'

function NewMail({ urlPrefix, session, to }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='ghost' size='icon'>
            <EMail className='size-6 text-white  hover:text-primary' />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <MsgForm urlPrefix={urlPrefix} session={session} to={to} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className='size-7 p-0 hover:bg-white hover:text-primary'
          variant='ghost'
        >
          <EMail className='size-6 text-white  hover:text-primary' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <MsgForm urlPrefix={urlPrefix} session={session} to={to} />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default NewMail
