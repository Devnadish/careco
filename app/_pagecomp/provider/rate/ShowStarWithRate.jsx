import React from 'react'
import Link from 'next/link'
import { StarFilled } from '@/components/svg/StarFilled'

export const ShowStarWithRate = ({ rate = 99, slug }) => {
  return (
    <Link
      href={{
        pathname: `/rateing/${slug}`,
        query: {
          rate: 5
        }
      }}
      className='flex  flex-col items-center justify-center rounded-lg border border-primary bg-primary/30 p-1'
    >
      <div className='relative  flex size-20 flex-col items-center justify-center '>
        <StarFilled className='size-20 text-yellow-300' />
        <p className='absolute top-1/2 -translate-y-1/2 text-center text-xl font-bold text-black'>
          {rate}%
        </p>
      </div>
      <p className='animate-pulse font-cairo text-lg font-bold '>قيمني</p>
    </Link>
  )
}
