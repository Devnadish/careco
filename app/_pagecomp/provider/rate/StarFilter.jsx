'use client'
import { StarFilled } from '@/components/svg/StarFilled'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { urlQuery } from 'more/lib/nadish'
import { usePathname, useRouter } from 'next/navigation'

export function StarFilter() {
  const [option, setOption] = useState(0)
  const pathName = usePathname()
  const router = useRouter()

  const handleoptions = value => {
    setOption(pre => value)

    const queryString = urlQuery('rate', value)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.replace(updatedUrl, { scroll: true })
  }
  return (
    <RadioGroup
      defaultValue='0'
      className='flex  w-full flex-wrap items-center justify-around rounded-md border border-border p-2'
      onValueChange={value => handleoptions(value)}
    >
      <Label htmlFor='s1' className='flex items-center gap-1'>
        <RadioGroupItem value='1' id='s1' />
        <StarFilled /> 1
      </Label>
      <Label htmlFor='s2' className='flex items-center gap-1'>
        <RadioGroupItem value='2' id='s2' />
        <StarFilled /> 2
      </Label>
      <Label htmlFor='s3' className='flex items-center gap-1'>
        <RadioGroupItem value='3' id='s3' />
        <StarFilled /> 3
      </Label>
      <Label htmlFor='s4' className='flex items-center gap-1'>
        <RadioGroupItem value='4' id='s4' />
        <StarFilled /> 4
      </Label>
      <Label htmlFor='s5' className='flex items-center gap-1'>
        <RadioGroupItem value='5' id='s5' />
        <StarFilled /> 5
      </Label>
      <Label htmlFor='s0' className='flex items-center gap-1'>
        <RadioGroupItem value='0' id='s0' />
        <StarFilled />
        الكل
      </Label>
    </RadioGroup>
  )
}
