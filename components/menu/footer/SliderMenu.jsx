'use client'
import React from 'react'
import { BotMessageSquare, HeartHandshake } from '@/more/lib/icons'
import CarToSelect from '@/app/_pagecomp/home/CarToSelect'
import { Button } from '../../ui/button'
import FavCar from '../../svg/FavCar'
import { MyCar } from '../../svg/MyCar'
import { InboxIcon } from '../../svg/InboxIcon'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'

export function SliderMenu({ menu }) {
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
    <div className='  flex w-full   items-center justify-between bg-background/55  px-3 shadow-xl  backdrop-blur-md'>
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
      <div className='flex size-16  w-[10%]  items-center justify-center bg-secondary '>
        <CarToSelect />
      </div>
    </div>
  )
}
