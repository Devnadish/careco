'use client'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { providerType } from '@/more/lib/systemlib'

function FilteerType(props) {
  return (
    <div className=' flex h-9 w-full items-center gap-3 rounded-md border border-foreground/25  px-3 text-foreground/70 md:w-fit '>
      <p className='font-noto text-sm text-muted-foreground'>التصنيف </p>
      {props.selectType && (
        <Badge variant={'secondary'}>{providerType(props.selectType)}</Badge>
      )}
      {props.selectDepartment && (
        <Badge variant={'secondary'}>{props.selectDepartment}</Badge>
      )}
      {props.selectExtraService && (
        <Badge variant={'secondary'}>{props.selectExtraService}</Badge>
      )}
    </div>
  )
}
export default FilteerType
