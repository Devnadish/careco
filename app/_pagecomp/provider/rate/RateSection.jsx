'use client'
import { useState } from 'react'
import Submit from '@/components/shared/Submit'
import Text from '@/components/shared/Text'
import { StarFilled } from '@/components/svg/StarFilled'
import { Textarea } from '@/components/ui/textarea'
// FIXME: ../ update to alis path

import { newRate } from '../db/rateDb'
import { Notify } from '@/more/lib/nadish'
import { Button } from '@/components/ui/button'

export const RateSection = ({ session, providerId, setOpen }) => {
  const [rate, setRate] = useState(5)
  const [rateColor, setRateColor] = useState(null)

  return (
    <div className='flex w-full flex-col items-start'>
      <span className='w-full border border-destructive bg-destructive/40 p-2 text-center font-tajwal text-xs  '>
        يعتمدالتقييم بعد مسح{' '}
        <span className='rounded-full bg-destructive px-2'>QrCode</span> الخاص
        بمزود الخدمة
      </span>

      <Rate
        rate={rate}
        setRate={setRate}
        rateColor={rateColor}
        userId={session?.user?.id}
        providerId={providerId}
        setOpen={setOpen}
      />
    </div>
  )
}

export function Rate(props) {
  const handlerateing = async formData => {
    const data = {
      rate: props.rate,
      comment: formData.get('rate'),
      userId: props.userId,
      providerId: props.providerId
    }
    const addRate = await newRate(data)
    addRate.stuts
      ? Notify(addRate.msg, 'success', 'شكرا')
      : Notify(addRate.msg, 'error', 'خلل')
  }

  return (
    <div className='flex h-72  w-full flex-col items-center justify-center gap-4 rounded   p-4'>
      <div className='flex items-center gap-4  '>
        {[...Array(5)].map((star, index) => {
          const currentRate = index + 1
          return (
            <>
              <label>
                <input
                  type='radio'
                  name='rate'
                  hidden
                  value={currentRate}
                  onChange={() => {
                    props.setRate(currentRate)
                  }}
                />
                <StarFilled
                  size={34}
                  className={`${currentRate <= (props.rateColor || props.rate) ? 'text-yellow-400' : 'text-gray-400'} text-3xl`}
                />
              </label>
            </>
          )
        })}
      </div>
      <Text fontSize={'xl2'}>
        التقويم
        <span className='mx-2 rounded-lg border bg-primary  px-2'>
          {props.rate}
        </span>
        نجوم
      </Text>
      <form
        action={handlerateing}
        className='flex w-full max-w-xs flex-col gap-4 rounded  p-2'
      >
        <Textarea
          placeholder='سبب التقيم مهم يساعد غيرك ...'
          name='rate'
          className='resize-none'
        />
        <Submit className={'bg-secondary'} />
        <Button
          variant='outline'
          onClick={() => props.setOpen(false)}
          type='button'
        >
          اغلاق
        </Button>
      </form>
    </div>
  )
}
