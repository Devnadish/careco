'use client'
import React, { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from 'more/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { urlQuery } from 'more/lib/nadish'
import { usePathname, useRouter } from 'next/navigation'
import Text from '@/components/shared/Text'

import { carLogos } from 'more/constant/carLogo'
import { Car } from '@/lib/icons'
import ClearCarFilter from '@/components/svg/ClearCarFilter'
import FavCar from '@/components/svg/FavCar'
import CarIcon from '@/components/svg/CarIcon'

function CarToSelect({
  label = 'اختار  سيارتك',
  placeholder = 'ابحث عن سيارتك',
  noDataMessage = 'لا توجد سيارتك'
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const pathName = usePathname()
  const router = useRouter()

  useEffect(() => {
    const queryString = urlQuery('vechile', value)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.replace(updatedUrl, { scroll: true })
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='flex w-fit'>
        <PopoverTrigger asChild>
          {value ? (
            <Button
              className='flex size-10  flex-col items-center justify-center border-[.5px] border-primary  p-0 shadow-xl'
              variant='ghost'
            >
              <ClearCarFilter className='size-6 text-red-500 ' />{' '}
            </Button>
          ) : (
            <Button
              // variant='outline'
              role='combobox'
              aria-expanded={open}
              className='flex size-8  flex-col items-center justify-center rounded-full   p-0 shadow-xl hover:bg-secondary '
            >
              <CarIcon className='flex size-8   items-center justify-center  text-primary-foreground hover:text-primary  ' />
            </Button>
          )}
        </PopoverTrigger>
      </div>
      <PopoverContent className='w-[250px] '>
        <Command disablePointerSelection>
          <CommandInput placeholder={placeholder} className='mr-2' />
          <CommandList>
            <CommandEmpty>{noDataMessage}</CommandEmpty>
            <CommandGroup>
              {carLogos?.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                  className='flex w-full items-center justify-between hover:bg-blue-500 hover:text-white'
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className='flex w-full items-center justify-between'>
                    <Text fontSize='xs' className={'text-foreground'}>
                      {framework.label}
                    </Text>
                    <Image
                      src={framework.logo} // Handle missing logo
                      alt={'car'}
                      width={25}
                      height={25}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CarToSelect
