'use client'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Search } from '@/lib/icons'
import React from 'react'

const SearchBtn = ({ session, setOpenSearch }) => {
  return (
    <Button
      variant='ghost'
      onClick={() => {
        setOpenSearch(true)
      }}
      size='sm'
      className='min-w-48 rounded  border border-accent shadow-lg '
    >
      <div className='flex h-8 w-full items-center justify-end gap-3 '>
        {/* <Text fontSize='xs' opacity={'O70'}>
          {searchText && searchText}
        </Text> */}
        <Separator orientation='vertical' className='bg-border' />
        <Search size={24} className='opacity-70' strokeWidth={1} />
      </div>
    </Button>
  )
}
export default SearchBtn
