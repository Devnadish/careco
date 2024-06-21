import React from 'react'
import { Button } from '@/components/ui/button'
// import { CallIcon, EmailIcon } from '@/components/shared/ProviderIcons'
import { WhatsappIcon } from '@/components/svg/Whatsapp'
import {
  Facebook,
  Instagram,
  Tiktok,
  XTwitter,
  Youtube
} from '@/components/svg/Socail'
import { Avatar } from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import { CallIcon, EmailIcon } from '@/components/svg/ProviderIcons'

function Fotter({ workingHours }) {
  const parsedWorkingHours = JSON.parse(workingHours)
  return (
    <footer
      className='mb-[80px] flex w-full flex-col flex-wrap items-center justify-center gap-1 rounded  p-4'
      id='footer'
    >
      <WorkingHours days={parsedWorkingHours} />
      {/* <BrInfo branchInfo={branchInfo} /> */}
      <SocalContact />
    </footer>
  )
}

export default Fotter

export const SocalContact = () => {
  return (
    <div className='flex  flex-wrap items-center justify-evenly   gap-2 '>
      <Button size='icon' variant='ghost'>
        <CallIcon className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <EmailIcon className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <WhatsappIcon className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Tiktok className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Instagram className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Facebook className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <XTwitter className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Youtube className='size-6' />
      </Button>
    </div>
  )
}

export const WorkingHours = ({ days }) => {
  // TODO:  restyleing
  const arabicDays = {
    Sunday: 'الأحد',
    Monday: 'الاثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت'
  }
  return (
    <div
      className='flex w-full flex-col items-center justify-center gap-4'
      dir='ltr'
    >
      <h2 className='text-xl font-semibold'>مواعيد العمل</h2>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {Object.entries(days).map(([key, value]) => (
          <div
            key={key}
            className='flex flex-col justify-center rounded border border-foreground/25 px-2 text-muted-foreground '
            dir='rtl'
          >
            <div className='flex w-full items-center justify-between'>
              <span className='mr-4 rounded-lg bg-primary px-2 font-tajwal  font-bold text-primary-foreground'>
                {arabicDays[key]}
              </span>
              <span className='mb-3 flex  w-fit  rounded-lg px-2 text-lg text-foreground'>
                {value.workDay ? 'مفتوح' : 'مغلق'}
              </span>
            </div>
            <span className='text-xl font-semibold'>
              {value.hour.map((hour, index) => (
                <span key={index} className='mr-4'>
                  {hour}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
