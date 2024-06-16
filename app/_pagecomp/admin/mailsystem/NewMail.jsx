'use client'
import * as React from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter
} from '@/components/ui/drawer'
import MsgForm from '@/app/_pagecomp/admin/mailsystem/MsgForm'

function NewMail({ urlPrefix, session, to, open, setOpen }) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <MsgForm urlPrefix={urlPrefix} session={session} to={to} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
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
