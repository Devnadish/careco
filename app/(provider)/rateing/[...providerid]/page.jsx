import React from 'react'
import Text from '@/components/shared/Text'
import { GoBack } from '@/components/shared/GoHome'
import { Avatar } from '@/components/shared/Avatar'
import { getTimeElapsed } from '@/more/lib/nadish'
import { getRateData } from '@/app/_pagecomp/provider/db/rateDb'
import { StarFilter } from '@/app/_pagecomp/provider/rate/StarFilter'
import { StarCount } from '@/app/_pagecomp/provider/rate/StarCount'
import { Button } from '@/components/ui/button'
import AddRateBtn from '@/app/_pagecomp/provider/rate/AddRateBtn'
import { getServerSession } from 'next-auth'
import { options } from '@/more/provider/authentication/options'
import { ShowStarWithRate } from '@/app/_pagecomp/provider/rate/ShowStarWithRate'
import { StarFilled } from '@/components/svg/StarFilled'
// import { StarCount } from '@/app/_pagecomp/provider/rate/StarCount'

async function page({ params, searchParams }) {
  const session = await getServerSession(options)
  const providerSlug = params.providerid[0]
  const rateInformation = await getRateData(
    providerSlug,
    parseInt(searchParams.rate)
  )
  const {
    star1,
    star2,
    star3,
    star4,
    star5,
    overAllrate5,
    totalRate,
    percentage
  } = rateInformation.rateData
  const rateData = rateInformation.RateInfo
  return (
    <div className='mb-20  flex w-full flex-col gap-2'>
      <div className='flex w-full items-center justify-between  gap-2'>
        <Text
          fontSize={'sm'}
          fontFamily={'tajwal'}
          className='flex flex-col items-start justify-start  gap-2 text-muted-foreground'
        >
          <span>عدد التقيمات {rateData.length}</span>
        </Text>
        <div className='relative  flex size-20 flex-col items-center justify-center '>
          <StarFilled className='size-20 text-yellow-300' />
          <p className='absolute top-1/2 -translate-y-1/2 text-center text-xl font-bold text-black'>
            {percentage}%
          </p>
        </div>

        <GoBack />
      </div>
      <div className='flex w-full flex-col items-center justify-between gap-2 md:flex-row'>
        <AddRateBtn session={session} providerId={providerSlug} />
      </div>

      <StarFilter
        star1={star1}
        star2={star2}
        star3={star3}
        star4={star4}
        star5={star5}
      />
      <div className='flex w-full flex-col gap-2 md:flex-row md:flex-wrap'>
        <StarCount count={searchParams.rate} />
        {rateData.map(rate => {
          return (
            <div
              className='min-w-sm  flex   flex-grow  flex-col gap-4 rounded-md border border-foreground/40 p-2  px-2'
              key={rate.id}
            >
              <div className='flex w-full items-center justify-between border-b border-foreground/40 '>
                <div className='flex items-center gap-1'>
                  <Avatar
                    src={rate.userImage}
                    alt={rate.userName}
                    fallBack={rate.userName}
                    size={8}
                  />
                  <Text className={'text-muted-foreground'} fontSize={'xs'}>
                    {rate.userName}
                  </Text>
                </div>
                <Text className={'text-muted-foreground'} fontSize={'xs'}>
                  {getTimeElapsed(rate.createdAt)}
                </Text>
              </div>

              <Text className={'text-muted-foreground'}>{rate.comment}</Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page
