'use client'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { SortTypebtn } from './Bar'

function SortType(props) {
  return (
    <div className=' flex h-9 w-full items-center gap-3 rounded-md  border  border-foreground/25  px-3   text-foreground/70 md:w-fit '>
      <p className='font-noto text-sm text-muted-foreground'>الترتيب </p>
      {props.sortBy && <Badge variant={'secondary'}>{props.sortBy}</Badge>}
      {props.isAsc ? (
        <Badge variant={'secondary'}>تصاعدي</Badge>
      ) : (
        <Badge variant={'secondary'}>تنازلي</Badge>
      )}
      <SortTypebtn isAsc={props.isAsc} setIsAsc={props.setIsAsc} />
    </div>
  )
}
export default SortType
