import React from 'react'
import NewMail from '@/app/_pagecomp/admin/mailsystem/NewMail'
import { SectionTitle } from '@/components/shared/SectionTitle'
import Text from '@/components/shared/Text'
import CitySVG from '@/components/svg/CitySVG'
import Link from 'next/link'
import { Clock } from '@/more/lib/icons'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image64 from '@/components/shared/image/Image64'

export const HeroSection = ({
  heroSlogon,
  logo,
  providerName,
  city,
  dist,
  branchCount,
  session,
  providerEmail
}) => {
  return (
    <section className=' relative flex w-full  flex-wrap  items-center justify-between  gap-4 border-b border-r  border-primary bg-secondary p-4 md:flex-nowrap  '>
      <TextSide
        heroSlogon={heroSlogon}
        providerName={providerName}
        city={city}
        dist={dist}
        branchCount={branchCount}
        session={session}
        providerEmail={providerEmail}
      />

      <HeroImage logo={logo} providerName={providerName} />
    </section>
  )
}

export function HeroImage({ logo, providerName }) {
  return (
    <Image64
      url={logo}
      alt={providerName}
      containerClass='mt-5 min-w-[300px]  max-h-xs max-w-xs'
    />
  )
}

export function TextSide({
  providerName,
  city,
  branchCount,
  heroSlogon,
  session,
  providerEmail
}) {
  return (
    <div className='flex w-full max-w-md flex-col items-center justify-center gap-4 md:max-w-xs'>
      <SectionTitle title={providerName} />
      <div className='flex w-full items-center gap-2'>
        <CitySVG className='size-4' />
        <Text fontSize={'xs'} fontFamily={'tajwal'}>
          {city}
        </Text>
        <Text fontSize={'xs'} fontFamily={'tajwal'}>
          <span>عدد الفروع</span>
          {branchCount}
        </Text>
      </div>

      <Text
        className={'self-center px-1 text-center text-xl'}
        opacity={'O70'}
        fontFamily={'tajwal'}
      >
        {heroSlogon}
      </Text>

      <div className='flex w-full items-center justify-end gap-4'>
        <NewMail session={session} to={providerEmail} urlPrefix={'provider'} />
        <Link
          href='#footer'
          className='flex  items-center justify-center  rounded-md border bg-secondary p-2'
        >
          <Clock />
        </Link>
      </div>
    </div>
  )
}
