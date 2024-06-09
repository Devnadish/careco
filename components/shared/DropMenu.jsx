'use client'
import React, { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/more/lib/utils'
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
import { Button } from '../ui/button'
import Image from 'next/image'
import { urlQuery } from '@/more/lib/nadish'
import { usePathname, useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import Text from './Text'

function DropMenu({ frameworks, label, icon, placeholder, noDataMessage }) {
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
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          aria-expanded={open}
          className='fixed  bottom-4 left-2 z-50 flex size-12 flex-col items-center justify-center  rounded-full  border  bg-primary shadow-xl '
        >
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[250px] p-0'>
        <Command disablePointerSelection>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{noDataMessage}</CommandEmpty>
            <CommandGroup>
              {frameworks?.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className='flex w-full items-center justify-between'>
                    <Text fontSize='xs' opacity={'opacity-35'}>
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
export default DropMenu
