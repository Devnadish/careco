'use client'
import React, { useState } from 'react'
import Text from '@/components/shared/Text'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
// c=center  w=workshop h=human

export const GeneralInfo = data => {
  const [option, setOption] = useState(data.type)
  return (
    <section className='flex flex-grow flex-col items-center gap-3 rounded-md border border-border p-4 font-tajwal'>
      <Text fontSize={'large'}>معلومات عامة</Text>
      <div className='flex flex-wrap items-center gap-4'>
        <ProviderType option={option} setOption={setOption} />
        <Label className='flex flex-grow flex-col gap-2 '>
          الاسم{' '}
          <Input
            name='name'
            placeholder='اسم المركز'
            defaultValue={data.providerName}
          />
        </Label>
        <Label className='flex flex-grow flex-col gap-2 '>
          الايميل
          <Input
            name='email'
            placeholder='ايميل التعاملات الرسمي للتعاملات '
            defaultValue={data.email}
          />
        </Label>
        <Label className='flex flex-grow flex-col gap-2 '>
          الجوال
          <Input
            name='mobile'
            placeholder='رقم الجوال للتواصل مع العميل'
            defaultValue={data.mobile}
          />
        </Label>

        <Label className='flex flex-grow flex-col gap-2 '>
          عبارة تحفيزية
          <Textarea
            name='slogon'
            placeholder='اكتب عبارة ترويجية تساعد في تسويق خدمتك'
            className='resize-none'
            defaultValue={data.heroSlogon}
          />
        </Label>
      </div>
    </section>
  )
}

export function ProviderType({ option, setOption }) {
  const handleoptions = value => {
    setOption(pre => value)
  }
  return (
    <>
      <Text>النوع</Text>
      <RadioGroup
        defaultValue={option}
        className='flex h-9 w-full items-center justify-around rounded-md border border-border p-2'
        onValueChange={value => handleoptions(value)}
        dir='rtl'
      >
        <Label htmlFor='t1' className='flex items-center gap-1'>
          <RadioGroupItem value='c' id='t1' />
          مركز
        </Label>
        <Label htmlFor='t2' className='flex items-center gap-1'>
          <RadioGroupItem value='w' id='t2' />
          ورشة
        </Label>
        <Label htmlFor='t3' className='flex items-center gap-1'>
          <RadioGroupItem value='h' id='t3' />
          افراد
        </Label>
      </RadioGroup>
    </>
  )
}
