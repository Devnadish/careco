import React from 'react'
import Image64 from '@/components/shared/image/Image64'
import UserActions from '../../user/useractions/UserActions'
import { providerType, providerTypeIcon } from '@/more/lib/systemlib'
import { Badge } from '@/components/ui/badge'
import { ShowStarWithRate } from '../rate/ShowStarWithRate'

export const HeroSection = ({
  logo,
  providerName,
  city,
  dist,
  branchCount,
  session,
  providerEmail,
  heroSlogon,
  type,
  providerId,
  userActions,
  likeCount,
  disLikeCount,
  viewerCount,
  commentCount,
  shareCount,
  favCount,
  rate = 99,
  slug
}) => {
  return (
    <section className='flex  min-h-[calc(100vh-10.5rem)] w-full flex-col items-center justify-center  border-b border-r   border-primary    '>
      <div className='flex  w-full items-center justify-center   '>
        <div className='flex   w-full flex-col items-start justify-between  gap-5 px-3 '>
          <div className='flex w-full flex-col items-start '>
            {/* type and city */}
            <div className='flex-warap flex w-full items-center justify-between px-2'>
              <Badge className='gap-1' variant='secondary'>
                {providerTypeIcon(type)}
                {providerType(type)}
              </Badge>
              <Badge className='gap-1' variant='secondary'>
                {city} - {dist}- الفروع :{branchCount}
              </Badge>
            </div>
            {/* namee and rate */}
            <div className='flex-warap flex w-full items-center justify-between  px-2'>
              <h1 className='border-b-4 border-primary px-4 pb-2 font-cairo text-3xl font-bold text-primary'>
                {providerName}
              </h1>
              <ShowStarWithRate rate={rate} slug={slug} />
            </div>
          </div>

          <h2 className='flex w-full items-center justify-center font-cairo text-xl font-bold '>
            {heroSlogon}
          </h2>
        </div>

        <div className='hidden  w-full   flex-col items-start justify-center bg-secondary md:flex '>
          <Image64
            url={logo}
            alt={providerName}
            containerClass=' md:min-w-[250px]  h-full max-w-xs'
          />
        </div>
      </div>

      <UserActions
        providerName={providerName}
        session={session}
        providerId={providerId}
        providerEmail={providerEmail}
        userActions={userActions}
        likeCount={likeCount}
        disLikeCount={disLikeCount}
        viewerCount={viewerCount}
        commentCount={commentCount}
        shareCount={shareCount}
        favCount={favCount}
      />
    </section>
  )
}
