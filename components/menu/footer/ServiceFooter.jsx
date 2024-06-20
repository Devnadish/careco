import React from 'react'
import { BotMessageSquare, HeartHandshake } from '@/more/lib/icons'
import FavCar from '../../svg/FavCar'
import { MyCar } from '../../svg/MyCar'
import { InboxIcon } from '../../svg/InboxIcon'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Link from 'next/link'

export function ServiceFooter({ userId }) {
  const menuItems = [
    {
      icon: <MyCar className='size-6 text-primary ' />,
      text: 'سيارتي',
      link: '/mdx/mycar'
    },
    {
      icon: <FavCar className='size-6 text-primary ' />,
      text: 'اهواها',
      link: '/mdx/dreamcar'
    },
    {
      icon: <InboxIcon className='size-6 text-primary ' />,
      text: 'المراسلات',
      link: '/mailsystem'
    },
    {
      icon: <BotMessageSquare className='size-6 text-primary ' />,
      text: 'استشارة',
      link: '/mdx/newconsoltation'
    },
    {
      icon: <HeartHandshake className='size-6 text-destructive ' />,
      text: 'المفضلة',
      link: `/reaction/${userId}/favorate`
    }
  ]

  return (
    <div className='flex   h-full  w-[90%] items-center justify-center '>
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
          {menuItems.map(({ icon, text, link }, index) => (
            <div key={index}>
              <CarouselItem className='flex w-fit basis-4/12 items-center justify-center  '>
                <Link
                  href={link}
                  className='flex h-12  min-w-12 flex-col items-center justify-center  rounded-none     p-0 px-2'
                >
                  {icon}
                  <span className='select-none font-noto text-[12px]'>
                    {text}
                  </span>
                </Link>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
export default ServiceFooter
