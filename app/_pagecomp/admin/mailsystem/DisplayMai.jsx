'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { readDone } from './db/inbox'

export function DisplayMai({ children, title, icon: Icon, mailId }) {
  const handleClick = async () => {
    await readDone(mailId)
  }
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='item-1'>
        <AccordionTrigger
          className='flex w-full items-center gap-3'
          onClick={handleClick}
        >
          {Icon}
          <div className={'flex w-full items-center'}>{title}</div>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
