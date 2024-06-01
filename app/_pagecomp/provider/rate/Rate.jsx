'use client'
import Submit from '@/components/shared/Submit'
import Text from '@/components/shared/Text'
import { StarFilled } from '@/components/svg/StarFilled'
import { Textarea } from '@/components/ui/textarea'
// FIXME: ../ update to alis path

import { newRate } from '../db/rateDb'
import { Notify } from '@/lib/nadish'

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
    <div className='flex h-72  w-full flex-col items-center justify-center gap-4 rounded  border p-4'>
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
        التقويم{' '}
        <span className='rounded-lg border bg-primary px-2'>{props.rate}</span>{' '}
        نجوم
      </Text>
      <form
        action={handlerateing}
        className='flex w-full max-w-xs flex-col gap-4 rounded border p-2'
      >
        <Textarea
          placeholder='سبب التقيم مهم يساعد غيرك ...'
          name='rate'
          className='resize-none'
        />
        <Submit />
      </form>
    </div>
  )
}
