import Text from '@/components/shared/Text'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Image } from 'more/lib/icons'
import { Input } from '@/components/ui/input'

export const ImageSlider = () => {
  return (
    <section className='flex w-full flex-col items-start gap-3 rounded-md border border-border p-4'>
      <Text fontSize={'large'}>البوم الصور</Text>
      <div className='flex w-full flex-shrink flex-grow items-center gap-4'>
        <Label
          className='flex size-20 flex-grow cursor-pointer flex-col items-center  justify-center gap-2
        border border-border'
        >
          <Image />
          البوم
          <Input
            name='coverImage'
            placeholder='صورة جذابة للعميل'
            type='file'
            className='hidden'
          />
        </Label>
        <Label
          className='flex size-20 flex-grow cursor-pointer flex-col items-center  justify-center gap-2
        border border-border'
        >
          <Image />
          الغلاف
          <Input
            name='coverImage'
            placeholder='صورة جذابة للعميل'
            type='file'
            className='hidden'
          />
        </Label>
        <Label
          className='flex size-20 flex-grow cursor-pointer flex-col items-center  justify-center gap-2
        border border-border'
        >
          <Image />
          الشعار
          <Input
            name='logoImage'
            placeholder='صورة جذابة للعميل'
            type='file'
            className='hidden'
          />
        </Label>
      </div>
    </section>
  )
}
