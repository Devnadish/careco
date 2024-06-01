'use client'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import Submit from '@/components/shared/Submit'
import { Input } from '@/components/ui/input'
import { sendMail } from '@/app/_pagecomp/admin/mailsystem/db/inbox'
import { Notify } from 'more/lib/nadish'
import { EMail } from '@/components/svg/Mail'
import { Mail } from 'more/lib/icons'
import { handleMail } from './logic/mailsystem'

const MsgForm = ({ to, urlPrefix, session }) => {
  const [selectedValue, setSelectedValue] = useState('msg') // Initial
  const handleMail = async formData => {
    const data = {
      from: session?.user?.email,
      to: to ? to : formData.get('to'),
      subject: formData.get('subject'),
      msg: formData.get('msg'),
      type: selectedValue,
      url: urlPrefix
    }
    const send = await sendMail(data)
    Notify(
      send.msg,
      send.stuts ? 'info' : 'error',
      send.stuts ? 'تمام' : 'خظاء'
    )
  }
  return (
    <form
      action={handleMail}
      className='flex w-full flex-col items-start gap-3 rounded border border-border bg-secondary/30 p-4'
    >
      <p className='flex items-center gap-2'>
        مرحبا <strong>{session.user.name}</strong>
      </p>

      <MsgType
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />

      <Label className='flex w-full items-center gap-3 font-tajwal'>
        من
        <Input
          name='from'
          defaultValue={session?.user?.email}
          disabled
          className='h-7'
        />
      </Label>
      <Label className='flex w-full items-center gap-3 font-tajwal'>
        <div className='flex items-center gap-2'>
          <span> الى </span>
          {urlPrefix === 'admin' && (
            <span className='rounded-md bg-primary px-2 py-0.5 text-white'>
              الادارة
            </span>
          )}
        </div>
        <Input
          name='to'
          defaultValue={to}
          disabled={urlPrefix !== 'user'}
          className='h-7'
        />
      </Label>

      <Input placeholder='الموضوع..' name='subject' />
      <Textarea
        placeholder={`${session?.user?.name} تفضل بكتابة رسالتك ..`}
        name='msg'
      />
      <Submit
        title='ارسال'
        icon={<Mail className='size-6 text-white' />}
        position={'center'}
        className={'justify-center'}
      />
    </form>
  )
}

export default MsgForm
export function MsgType({ selectedValue, setSelectedValue }) {
  const handleChange = newValue => {
    setSelectedValue(newValue)
  }
  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={handleChange}
      defaultValue='msg'
      className='flex w-full items-center justify-center rounded border border-border p-2 '
      dir='rtl'
    >
      <div className='flex items-center gap-2 space-x-2'>
        <RadioGroupItem value='msg' id='msg' />
        <Label className='font-tajwal' htmlFor='msg'>
          رسالة
        </Label>
      </div>
      <div className='flex items-center gap-2 space-x-2'>
        <RadioGroupItem value='suggest' id='suggest' />
        <Label className='font-tajwal' htmlFor='suggest'>
          اقتراح
        </Label>
      </div>

      <div className='flex items-center gap-2  space-x-2'>
        <RadioGroupItem value='quey' id='query' />
        <Label className='font-tajwal' htmlFor='query'>
          استفسار
        </Label>
      </div>

      <div className='flex items-center gap-2  space-x-2'>
        <RadioGroupItem value='complain' id='complain' />
        <Label className='font-tajwal' htmlFor='complain'>
          شكوى
        </Label>
      </div>
    </RadioGroup>
  )
}
