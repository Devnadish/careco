import React from 'react'
import Text from '@/components/shared/Text'
import CitySVG from '@/components/svg/CitySVG'
import { Button } from '@/components/ui/button'

export const SelectCity = () => {
  return (
    <Button className='flex w-fit items-center gap-3' variant='ghost'>
      <CitySVG className='size-6' />
      <Text fontFamily={'tajwal'} fontSize={'medium'}>
        اختر مدينتك
      </Text>
    </Button>
  )
}
