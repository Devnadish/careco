'use client'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { useState } from 'react'
import { StarFilled } from '@/components/svg/StarFilled'
import { Rate } from '@/app/_pagecomp/provider/rate/Rate'
import Text from '@/components/shared/Text'
import Link from 'next/link'

export const RateSection = ({ session, providerId, rateing }) => {
  const [rate, setRate] = useState(5)
  const [rateColor, setRateColor] = useState(null)

  return (
    <div className='flex w-full flex-col items-start'>
      <SectionTitle title={' تقييمات ومراجعات يعتمدالتقييم بعد انهاء عملية '} />
      <div
        className='flex  w-full flex-col items-center gap-4 rounded-md bg-primary/40 md:flex-row'
        id='rate_section'
      >
        <DiaplyRate rateing={rateing} providerId={providerId} />
        <Rate
          rate={rate}
          setRate={setRate}
          rateColor={rateColor}
          userId={session?.user?.id}
          providerId={providerId}
        />
      </div>
    </div>
  )
}

export function DiaplyRate({ rateing, providerId }) {
  return (
    <div className='flex h-72 w-full flex-col items-start justify-center gap-3 rounded border p-4  '>
      <div className='flex w-full flex-wrap items-center justify-between gap-2'>
        <Text>
          التقييم العام
          <spanb
            className={
              'rounded border border-green-300 bg-green-400   px-2 font-bold text-green-900 shadow-lg '
            }
          >
            {rateing.percentage} %
          </spanb>
        </Text>
        <Text> بناءً على {rateing.totalRate} تقييمات</Text>
      </div>
      <div className='flex h-full w-full flex-col items-center justify-between'>
        <StarCount count={1} rate={rateing.star1} />
        <StarCount count={2} rate={rateing.star2} />
        <StarCount count={3} rate={rateing.star3} />
        <StarCount count={4} rate={rateing.star4} />
        <StarCount count={5} rate={rateing.star5} />
      </div>

      <Link
        href={`/rateing/${providerId}?rate=0`}
        className='flex h-12 w-full items-center justify-center rounded border bg-secondary shadow-lg'
      >
        <Text fontSize={'xs'} className={'font-bold'}>
          مشاهدة التقييم
        </Text>
      </Link>
    </div>
  )
}

export const StarCount = ({ count, rate, text }) => {
  const totalStars = 5 // Total number of stars in the rating system
  const textValues = ['مستاء', 'غير راض', 'جيد', 'راض', 'راض جدا']
  const stars = Array.from({ length: totalStars }, (_, index) => (
    <StarFilled
      key={index}
      size={24}
      className={`text-${index < count ? 'yellow' : 'gray'}-400`}
    />
  ))

  return (
    <div className='flex w-full items-center gap-4 '>
      <div className='flex items-center'>{stars}</div>
      <div className='flex items-center'>{rate}</div>
      <Text fontSize={'xs'} className={'text-muted-foreground'}>
        {textValues[count - 1]}
      </Text>
    </div>
  )
}
