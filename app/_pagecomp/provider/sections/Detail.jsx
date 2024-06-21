import Text from '@/components/shared/Text'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import { SectionTitle } from '@/components/shared/SectionTitle'

export const Detail = ({ detail, description }) => {
  return (
    <section className='relative flex min-h-[calc(100vh-10.5rem)]  w-full flex-col items-center justify-center border-b  border-r border-primary bg-secondary  p-2 py-4'>
      <SectionTitle title={'من نحن'} />
      <div className='mt-4 flex w-full flex-wrap items-center justify-center gap-4 overflow-y-auto   '>
        <ScrollArea className='h-fit max-h-[30%] w-full px-4 py-2' dir='rtl'>
          <Text className={'leading-6'}>{description}</Text>
        </ScrollArea>
        <ScrollArea
          className='h-fit max-h-[60%] w-full   border-t px-4 py-2'
          dir='rtl'
        >
          <Text className={'leading-6'}>{detail}</Text>
        </ScrollArea>
      </div>
    </section>
  )
}
