'use client'
import React from 'react'
import GoHome from '../shared/GoHome'
import DropMenu from '../shared/DropMenu'
import {
  BotMessageSquare,
  Car,
  Eye,
  HeartHandshake,
  ListRestart,
  Menu
} from '@/lib/icons'
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
import { useMediaQuery } from '@react-hook/media-query'
import { InboxIcon } from '../svg/InboxIcon'
// TODO: Read data from db

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

const Footer = ({ session, newMails }) => {
  const isMobile = useMediaQuery('(max-width: 500px)')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const vechile = searchParams.get('vechile')

  const isHomePage = pathname === '/'

  let urlPrefix

  if (pathname === '/') {
    urlPrefix = 'admin'
  }
  if (pathname === '/auth/login') return null
  if (pathname === '/auth/register') return null
  if (pathname === '/auth/error') return null
  return (
    <footer className='fixed bottom-0 z-50 h-14 w-full bg-accent' id='footer'>
      <div className='h-16 w-full bg-accent md:hidden'>
        {/* <MobileHomeFooter /> */}
        <SliderMenu />
      </div>
      {isHomePage ? (
        <SliderMenu />
      ) : (
        // <HomeFooter
        //   session={session}
        //   newMails={session}
        //   urlPrefix={urlPrefix}
        //   vechile={vechile}
        // />
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
        {/* <NewMail
          urlPrefix={urlPrefix}
          session={session}
          to={process.env.NEXT_PUBLIC_ADMIN_EMAIL}
        />
        <Separator orientation='vertical' className='h-9 bg-primary' />
        <MainMenu /> */}

        <Button variant='ghost'>
          <InboxIcon className='size-8 text-red-500 ' />
        </Button>

        <Button variant='ghost'>
          <BotMessageSquare className='size-8 text-blue-500 ' />
        </Button>

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

const MobileHomeFooter = ({ session, newMails, urlPrefix, vechile }) => {
  return (
    <div className='relative flex h-16 w-full items-center justify-between  '>
      <div className='start flex  h-9 w-[75%]  items-center  gap-4  px-5'>
        <Button variant='ghost'>
          <InboxIcon className='size-8 text-red-500 ' />
        </Button>

        <Button variant='ghost'>
          <BotMessageSquare className='size-8 text-blue-500 ' />
        </Button>

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

function SliderMenu({ menu }) {
  const menuItems = [
    {
      icon: <MyCar className='size-6 text-primary ' />,
      text: 'سيارتي'
    },
    {
      icon: <FavCar className='size-6 text-primary ' />,
      text: 'اهواها'
    },
    {
      icon: <InboxIcon className='size-6 text-primary ' />,
      text: 'المراسلات'
    },
    {
      icon: <BotMessageSquare className='size-6 text-primary ' />,
      text: 'استشارة'
    },
    {
      icon: <HeartHandshake className='size-6 text-destructive ' />,
      text: 'المفضلة'
    }
  ]

  return (
    <div className='  flex w-full   items-center justify-between '>
      <div className='flex   h-full  w-[75%] items-center justify-center '>
        <Carousel
          opts={{
            align: 'start'
          }}
          orientation='horizontal'
          className='w-[75%] md:w-fit  '
          dir='LTR'
        >
          <CarouselContent
            className='flex  w-full items-center  gap-2   '
            id='CarouselContent'
          >
            {menuItems.map(({ icon, text }, index) => (
              <div key={index}>
                <CarouselItem className='flex w-fit basis-4/12 items-center justify-center  '>
                  <Button
                    variant='ghost'
                    className='flex h-12  min-w-12 flex-col items-center justify-center  rounded-none     p-0 px-2'
                  >
                    {icon}
                    <span className='select-none font-noto text-[12px]'>
                      {text}
                    </span>
                  </Button>
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </div>
      <div className='flex size-16  w-[25%]  items-center justify-center bg-primary '>
        <CarToSelect />
      </div>
    </div>
  )
}
