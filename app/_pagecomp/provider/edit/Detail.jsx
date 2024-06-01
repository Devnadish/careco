import Text from '@/components/shared/Text'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export const Detail = () => {
  return (
    <section className='flex w-full  flex-grow flex-col items-start gap-3 rounded-md border border-border p-4 font-tajwal'>
      <Text fontSize={'large'}>تكلم عن خدمتك</Text>
      <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
        <Label htlmfor='' className='flex flex-grow flex-col gap-2 '>
          وصف عام
          <Textarea
            name='slogon'
            placeholder='اكتب عبارة ترويجية تساعد في تسويق خدمتك'
            className='resize-none'
          />
        </Label>
        <Label htlmfor='' className='flex flex-grow flex-col gap-2 '>
          وصف تفصيلي
          <Textarea
            name='slogon'
            placeholder='اكتب عبارة ترويجية تساعد في تسويق خدمتك'
            className='resize-none'
          />
        </Label>
      </div>
    </section>
  )
}
