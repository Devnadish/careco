'use client'
import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { carLogos } from 'more/constant/carLogo'
import Image from 'next/image'
import Text from './Text'
import { Notify } from 'more/lib/nadish'
import { useRouter, usePathname } from 'next/navigation'
import { urlQuery } from 'more/lib/nadish'
import { ListRestart } from 'more/lib/icons'

function Slider() {
  const pathName = usePathname()
  const router = useRouter()

  const handleChange = value => {
    const queryString = urlQuery('vechile', value)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.replace(updatedUrl, { scroll: true })
    // router.prefetch()router.refresh()
    // router.refresh()
    router.prefetch(updatedUrl)
  }

  const clearAll = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete('vechile')

    const updatedUrl = `${pathName}${params.toString() ? `?${params.toString()}` : ''}`
    router.push(updatedUrl)
  }

  return (
    <div className='  flex h-full flex-col items-center justify-evenly'>
      <ListRestart onClick={clearAll} />
      <Carousel
        opts={{
          align: 'start'
        }}
        orientation='vertical'
        className='w-[50px]  '
        //   plugins={[
        //     Autoplay({
        //       delay: 2000
        //     })
        //   ]}
      >
        <div className='w-full   ' dir='LTR'>
          <CarouselContent className='-mt-1 h-[250px]'>
            {carLogos.map((car, index) => (
              <CarouselItem key={index} className='basis-1/12 pt-1'>
                <div className='p-1'>
                  <Card
                    className='cursor-pointer'
                    onClick={() => handleChange(car.label)}
                  >
                    <CardContent className='flex flex-col items-center justify-center p-1'>
                      <Image
                        src={car.logo} // Handle missing logo
                        // src={car.logo || '/default-car-logo.svg'} // Handle missing logo
                        alt={car.alt}
                        width={36}
                        height={36}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
export default Slider
