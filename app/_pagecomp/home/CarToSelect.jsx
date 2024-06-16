'use client'
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter
} from '@/components/ui/sheet'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'
import { urlQuery } from '@/more/lib/nadish'
import { usePathname, useRouter } from 'next/navigation'
import Text from '@/components/shared/Text'

import { carLogos } from '@/more/constant/carLogo'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function CarToSelect({ open, setOpen }) {
  const [value, setValue] = useState('')
  const pathName = usePathname()
  const router = useRouter()
  const [cars, setCars] = useState(carLogos)

  const handleCarRoute = () => {
    console.log(value)
    if (value === '') return
    const queryString = urlQuery('vechile', value)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.replace(updatedUrl, { scroll: true })

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className='flex  w-[250px] flex-col gap-4 '>
        {/* <SheetHeader className='border-b border-foreground/25 pb-4'> */}
        <SheetHeader className='mt-4 border-b border-foreground/25 pb-4'>
          <Input
            className='h-9 w-full'
            placeholder='ابحث عن سيارتك'
            onChange={e => {
              const search = e.target.value
              const filtered = carLogos.filter(car =>
                car.value.toLowerCase().includes(search.toLowerCase())
              )
              setCars(filtered)
            }}
          />
        </SheetHeader>

        <ScrollArea
          className='h-[80%]   w-full rounded-md  px-3'
          dir='rtl'
          type='auto'
        >
          <RadioGroup
            defaultValue='comfortable'
            className='flex w-full flex-col gap-2'
            onValueChange={setValue}
          >
            {cars?.map(car => (
              <Label
                key={car.value}
                htmlFor={car.value}
                className='flex h-9 w-full items-center justify-between  px-2  hover:bg-secondary'
              >
                <Image
                  src={car.logo} // Handle missing logo
                  alt={'car'}
                  height={0}
                  width={0}
                  style={{ width: '24px', height: 'auto' }}
                  // width={25}
                  // height={25}
                />
                <div className='flex  items-center gap-2 '>
                  {/* <Label htmlFor={car.value}>{car.value}</Label> */}
                  {car.value}
                  <RadioGroupItem value={car.value} id={car.value} />
                </div>
              </Label>
            ))}
          </RadioGroup>
        </ScrollArea>
        <SheetFooter
          className={'flex w-full items-center  sm:justify-between '}
        >
          <p>{value}</p>
          <Button variant='outline' onClick={handleCarRoute}>
            <Text>تم</Text>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CarToSelect
