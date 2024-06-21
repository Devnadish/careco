import React from 'react'
import Image64 from '@/components/shared/image/Image64'
import UserActions from '../../user/useractions/UserActions'
import { providerType, providerTypeIcon } from '@/more/lib/systemlib'
import { Badge } from '@/components/ui/badge'
import { ShowStarWithRate } from '../rate/ShowStarWithRate'

function TypeAndCity(props) {
  return (
    <div className='flex-warap flex w-full items-center justify-between px-2'>
      <Badge className='gap-1' variant='secondary'>
        {providerTypeIcon(props.type)}
        {providerType(props.type)}
      </Badge>
      <Badge className='gap-1' variant='secondary'>
        {props.city} - {props.dist}- الفروع :{props.branchCount}
      </Badge>
    </div>
  )
}

function NameAndRate(props) {
  return (
    <div className=' flex w-full flex-col items-center justify-center  gap-4 '>
      <h1 className='border-b-4 border-primary px-4  font-cairo text-3xl font-bold text-primary'>
        {props.providerName}
      </h1>
      <h2 className='flex w-full items-center justify-center text-pretty text-center font-noto text-xl '>
        {props.heroSlogon}
      </h2>
    </div>
  )
}

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
    <section className='flex  min-h-[calc(100vh-10.5rem)] w-full flex-col items-center justify-between   border-b border-r   border-primary    '>
      <div className='flex  w-full items-center justify-center   '>
        <div className='flex   w-full flex-col items-center justify-between  gap-5 px-3 '>
          <TypeAndCity
            city={city}
            dist={dist}
            branchCount={branchCount}
            type={type}
          />
          <NameAndRate
            heroSlogon={heroSlogon}
            providerName={providerName}
            slug={slug}
          />
          {/* <ShowStarWithRate rate={rate} slug={slug} /> */}
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
            rate={rate}
            slug={slug}
          />
        </div>

        <div className='hidden  w-full   flex-col items-start justify-center bg-secondary md:flex '>
          <Image64
            url={logo}
            alt={providerName}
            containerClass=' md:min-w-[250px]  h-full max-w-xs'
          />
        </div>
      </div>
    </section>
  )
}
