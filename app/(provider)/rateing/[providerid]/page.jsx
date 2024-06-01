import React from 'react'
import Text from '@/components/shared/Text'
import { GoBack } from '@/components/shared/GoHome'
import { Avatar } from '@/components/shared/Avatar'
import { getTimeElapsed } from 'more/lib/nadish'
import { getRateData } from '@/app/_pagecomp/provider/db/rateDb'
import { StarFilter } from '@/app/_pagecomp/provider/rate/StarFilter'
import { StarCount } from '@/app/_pagecomp/provider/sections/RateSection'
// import { StarCount } from '@/app/_pagecomp/provider/rate/StarCount'

async function page({ params, searchParams }) {
  const rateData = await getRateData(
    params.providerid,
    parseInt(searchParams.rate)
  )

  return (
    <div className='mb-20 flex w-full flex-col gap-2'>
      <div className='flex w-full items-center justify-between  gap-2'>
        <Text>عدد التقيمات {rateData.length}</Text>
        <GoBack />
      </div>
      <StarFilter />
      <div className='flex w-full flex-col gap-2 md:flex-row md:flex-wrap'>
        {rateData.map(rate => {
          return (
            <div
              className='min-w-sm flex   flex-grow  flex-col gap-4 rounded-md border border-border p-2  px-2'
              key={rate.id}
            >
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Avatar
                    src={rate.userImage}
                    alt={rate.userName}
                    fallBack={rate.userName}
                  />
                  <Text className={'text-muted-foreground'} fontSize={'xs'}>
                    {rate.userName}
                  </Text>
                </div>
                <Text className={'text-muted-foreground'} fontSize={'xs'}>
                  {getTimeElapsed(rate.createdAt)}
                </Text>
              </div>
              <StarCount count={rate.rate} />
              <Text className={'text-muted-foreground'}>{rate.comment}</Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page
