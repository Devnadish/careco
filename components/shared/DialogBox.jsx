'use client'
import * as React from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter
} from '@/components/ui/drawer'
import { Separator } from '../ui/separator'

function DialogBox({ open, setOpen, children, title, Description }) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const showHeader =
    (title !== undefined && title !== '') ||
    (Description !== undefined && Description !== '')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className='flex  flex-col items-center justify-center sm:max-w-[370px]'
          dir='rtl'
        >
          {showHeader && (
            <DialogHeader className='mt-5 flex items-start'>
              <DialogTitle className='font-tajwal text-sm'>{title}</DialogTitle>

              <DialogDescription className='flex w-full items-center justify-end  font-tajwal'>
                {Description}
              </DialogDescription>

              <Separator className='bg-accent/50' />
            </DialogHeader>
          )}

          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm p-2 '>{children}</div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DialogBox
