import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter
} from '@/components/ui/sheet'

function SideBox({ open, setOpen, children, footer, header }) {
  return (
    <Sheet open={open} onOpenChange={setOpen} className=' flex h-full w-full '>
      <SheetContent className='flex h-full w-full flex-col items-center justify-between'>
        <SheetHeader className='flex w-full items-center  '>
          {header}
        </SheetHeader>
        <div>{children}</div>
        <SheetFooter>{footer}</SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
export default SideBox
