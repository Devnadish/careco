import Text from '@/components/shared/Text'
import { Label } from '@/components/ui/label'
import React from 'react'

export const Location = () => {
  return (
    <section className='flex flex-grow flex-col items-start gap-3 rounded-md border border-border p-4'>
      <Text fontSize={'large'}>العنوان</Text>
      <div className=''>
        <Label htlmfor=''> المدينة </Label>
        <Label htlmfor=''> الحي </Label>
        <Label htlmfor=''> عدد الفروع </Label>
      </div>
    </section>
  )
}
