import { Avatar } from '@/components/shared/Avatar'
import { LocateFixed, Share2 } from '@/more/lib/icons'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { providerType, providerTypeIcon } from '@/more/lib/systemlib'
import { Badge } from '@/components/ui/badge'
import Text from '@/components/shared/Text'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { Eye, HeartHandshake, MessageCircleMore } from '@/more/lib/icons'
import { Like } from '@/components/svg/LikeAndDislike'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { StarFilled } from '@/components/svg/StarFilled'

function ProviderCard({ provider }) {
  return (
    // <Link
    //   href={{
    //     pathname: `/provider/${provider?.slug}`
    //   }}
    //   className=' flex h-full w-[300px]  rounded-md border border-border  shadow-lg hover:border-primary'
    // >
    <Card className='flex-grow'>
      <CardHeader className='relative mb-4 flex w-full  flex-col items-center border-b border-border pb-4 '>
        <Location
          city={provider?.city}
          dist={provider?.dist}
          typeIcon={providerTypeIcon(provider?.type)}
          typeName={providerType(provider?.type)}
        />
        <div className='flex w-full items-baseline gap-1 '>
          <Avatar
            src={provider?.logo}
            alt={provider?.providerName}
            fallBack={'kn'}
          />
          <p className='font-cairo text-muted-foreground '>
            {provider?.providerName}
          </p>
        </div>
        <RateAndExtraSevice
          moreService={provider?.service}
          // FIXME:RECalculate rate
          // rate={rate?.percentage}
          rate={provider?.starCount}
        />
      </CardHeader>

      <CardContent className='flex  h-full flex-col items-start justify-between gap-2'>
        <ProviderDepartments departments={provider?.department} />
        <CarFix carTypes={provider?.cars} />
        <Text fontSize='xs' opacity='O70' className='leading-relaxed'>
          {provider?.heroSlogon}
        </Text>
      </CardContent>

      <CardFooter className='flex w-full justify-between p-0'>
        <CardBar
          likeCount={provider?.likeCount}
          disLikeCount={provider?.disLikeCount}
          starCount={provider?.starCount}
          commentCount={provider?.commentCount}
          favCount={provider?.favCount}
          viewerCount={provider?.viewerCount}
          shareCount={provider?.shareCount}
        />
      </CardFooter>
    </Card>
    // </Link>
  )
}

export default ProviderCard

export function ProviderReactionCard({ provider }) {
  return (
    <Link
      href={{
        pathname: `/provider/${provider?.slug}`
      }}
      className=' flex h-full w-[300px]  rounded-md border border-border  shadow-lg hover:border-primary'
    >
      <Card className='flex w-full flex-grow flex-col items-center justify-between  rounded-md'>
        <CardHeader className='relative mb-4 flex w-full  flex-col items-center '>
          <Location
            city={provider?.city}
            dist={provider?.dist}
            typeIcon={providerTypeIcon(provider?.type)}
            typeName={providerType(provider?.type)}
          />
          <div className='flex w-full items-baseline gap-1 '>
            <Avatar
              src={provider?.logo}
              alt={provider?.providerName}
              fallBack={'kn'}
            />
            <p className='font-cairo text-muted-foreground '>
              {provider?.providerName}
            </p>
          </div>
          <div className='relative  flex size-20 flex-col items-center justify-center '>
            <StarFilled className='size-20 text-yellow-300' />
            <p className='absolute top-1/2 -translate-y-1/2 text-center text-xl font-bold text-black'>
              {provider?.starCount}%
            </p>
          </div>
        </CardHeader>

        {/* <CardContent className='flex  h-full flex-col items-start justify-between gap-2'>
          <ProviderDepartments departments={provider?.department} />
          <CarFix carTypes={provider?.cars} />
          <Text fontSize='xs' opacity='O70' className='leading-relaxed'>
            {provider?.heroSlogon}
          </Text>
        </CardContent> */}

        <CardFooter className='flex w-full justify-between p-0'>
          <CardBar
            likeCount={provider?.likeCount}
            disLikeCount={provider?.disLikeCount}
            starCount={provider?.starCount}
            commentCount={provider?.commentCount}
            favCount={provider?.favCount}
            viewerCount={provider?.viewerCount}
            shareCount={provider?.shareCount}
          />
        </CardFooter>
      </Card>
    </Link>
  )
}

function Location({ city, dist, typeName, typeIcon }) {
  return (
    <div className='absolute  top-1 flex  w-full items-center justify-between   px-3'>
      <div className='flex items-center gap-1'>
        <LocateFixed size={14} className='text-muted-foreground' />
        <span className='font-tajwal text-xs text-muted-foreground'>
          {city}-{dist}
        </span>
      </div>

      <Badge variant={'secondary'}>
        {typeIcon}
        {typeName}
      </Badge>
    </div>
  )
}

export const ProviderDepartments = ({ departments }) => {
  return (
    <div className='flex w-full max-w-[300px] flex-wrap items-center justify-evenly gap-2 rounded-lg border border-border p-1'>
      {departments?.map(({ name }, index) => (
        <Badge
          variant='outline'
          className='flex flex-grow items-center justify-center border-border'
          key={index}
        >
          <Text className=' text-xs'>{name}</Text>
        </Badge>
      ))}
      {/* <Separator /> */}
    </div>
  )
}

export const CarFix = ({ carTypes }) => {
  return (
    <ScrollArea className='w-72 whitespace-nowrap rounded-md ' type='auto'>
      <div className='flex w-max space-x-4 p-4'>
        {carTypes?.map(({ name, image }, index) => {
          return (
            <div className='overflow-hidden rounded-md'>
              <Image
                key={index}
                // src={`/car/${image}`}
                src={`${image || 'logo.svg'}`}
                alt={name}
                width={36}
                height={36}
                // placeholder='blur'
                className='size-12  object-contain'
              />
              {/* <Badge
                key={index}
                variant='outline'
                className='flex flex-grow items-center justify-center border-border'
              >
                <Text className='font-montserrat text-sm text-muted-foreground'>
                  {name}
                </Text>
              </Badge> */}
            </div>
          )
        })}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}

export const RateAndExtraSevice = ({ moreService, rate }) => {
  //FIXME:will use NAME for toolTip
  return (
    <div className='relative flex w-full items-end justify-between gap-1 px-2'>
      <div className='flex    flex-wrap items-center justify-center gap-2'>
        {moreService?.map(({ image, name }, index) => {
          return (
            <Image
              key={index}
              src={`/extraservicelogo/${image}`}
              alt={name}
              width={24}
              height={24}
              // placeholder='blur'
              className='size-6 object-contain'
            />
          )
        })}
      </div>
      <div
        className='absolute bottom-3 left-0 flex size-9 items-center justify-center '
        style={{
          backgroundImage: `url(${'/icons/star.svg' || ''})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        }}
      >
        <span className='text-center text-sm font-bold text-black'>
          {rate || 0}
        </span>
        <span className='absolute -bottom-3 flex h-3 w-10 items-center justify-center rounded  bg-yellow-400 text-xs text-black'>
          %
        </span>
      </div>
    </div>
  )
}

export const CardBar = ({
  likeCount,
  viewerCount,
  commentCount,
  favCount,
  shareCount
}) => {
  const style1 =
    'flex h-8 w-12  items-center justify-center rounded  p-1 text-muted-foreground '
  return (
    <div className='flex h-9 w-full items-center justify-evenly  border-t border-border'>
      <Text fontSize={'xs'} className={style1}>
        <MessageCircleMore className='size-6 text-green-500' />
        {commentCount}
      </Text>
      <Separator orientation='vertical' />
      <Text fontSize={'xs'} className={style1}>
        <Share2 className='size-6 text-blue-800' />
        {shareCount}
      </Text>
      <Separator orientation='vertical' />
      <Text fontSize={'xs'} className={style1}>
        <Eye className='size-6 text-purple-800 ' />
        {viewerCount}
      </Text>
      <Separator orientation='vertical' />
      <Text fontSize={'xs'} className={style1}>
        <HeartHandshake className='size-6 text-red-500' />
        {favCount}
      </Text>
    </div>
  )
}
