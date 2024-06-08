import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter
} from '@/components/ui/sheet'

function SideBox({ open, setOpen, children, header, footer }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>{header}</SheetHeader>
        {children}
        <SheetFooter>{footer}</SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
export default SideBox
