'use client'
import React from 'react'
import GoHome from '../shared/GoHome'
import DropMenu from '../shared/DropMenu'
import { Car, Eye, HeartHandshake, Menu } from '@/lib/icons'
import CarToSelect from '@/app/_pagecomp/home/CarToSelect'
import NewMail from '@/app/_pagecomp/admin/mailsystem/NewMail'
import { Separator } from '../ui/separator'
import Text from '../shared/Text'
import MainMenu from './MainMenu'
import { Button } from '../ui/button'
import ClearCarFilter from '../svg/ClearCarFilter'
import FavCar from '../svg/FavCar'
import { MyCar } from '../svg/MyCar'
import { usePathname, useSearchParams } from 'next/navigation'
// TODO: Read data from db

const Footer = ({ session, newMails }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const vechile = searchParams.get('vechile')

  const isHomePage = pathname === '/'

  let urlPrefix

  if (pathname === '/') {
    urlPrefix = 'admin'
  }
  return (
    <footer className='fixed bottom-0 z-50 h-14 w-full bg-accent' id='footer'>
      {isHomePage ? (
        <HomeFooter
          session={session}
          newMails={session}
          urlPrefix={urlPrefix}
          vechile={vechile}
        />
      ) : (
        <ProviderFooter />
      )}
    </footer>
  )
}

const ProviderFooter = () => (
  <div className='h-16 w-full bg-accent'>
    <div className='relative flex h-16 w-full items-center justify-center bg-accent'>
      <div className='absolute -top-1/3 left-1/2 flex size-20  -translate-x-1/2 items-center justify-center rounded-full bg-accent '>
        <GoHome />
      </div>
    </div>{' '}
  </div>
)

const HomeFooter = ({ session, newMails, urlPrefix, vechile }) => {
  return (
    <div className='relative flex h-16 w-full items-center justify-between bg-accent'>
      <div className='start flex  h-9 w-[75%]  items-center  gap-4  px-5'>
        <Button variant='ghost'>
          <HeartHandshake className='size-8 text-red-500 ' />
        </Button>

        <Button variant='ghost'>
          <FavCar className='size-8 text-red-500 ' />
        </Button>
        <Button variant='ghost'>
          <MyCar className='size-8 text-red-500 ' />
        </Button>
        {/* <Separator orientation='vertical' className='h-9 bg-primary' /> */}
      </div>

      <div className='flex size-16   flex-col items-center justify-center  rounded-full bg-accent'>
        <CarToSelect />
        {/* <SelectedCar data={vechile} providersLength={15} /> */}
      </div>
    </div>
  )
}

export default Footer

const SelectedCar = ({ data, providersLength }) => {
  return (
    <>
      {data && (
        <div className='flex h-6 items-center justify-between  gap-1 rounded-xl border border-primary px-4 text-sm '>
          <Text
            className='text-mdm font-semibold  capitalize '
            fontFamily={'tajwal'}
          >
            <Car className='size-5 text-primary  md:size-6' strokeWidth={1} />
            {data}
          </Text>
        </div>
      )}
    </>
  )
}

//  {
//    /* <NewMail
//         urlPrefix={urlPrefix}
//         session={session}
//         to={process.env.NEXT_PUBLIC_ADMIN_EMAIL}
//       /> */
//  }
//  {
//    /* <Separator orientation='vertical' className='h-9 bg-primary' /> */
//  }
// {
//   /* <MainMenu /> */
// }
