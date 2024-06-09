'use client'

import { Button } from '@/components/ui/button'
import { Search } from '@/more/lib/icons'
import React from 'react'

const SearchBtn = ({ setOpenSearch }) => {
  return (
    <Button
      variant='ghost'
      onClick={() => {
        setOpenSearch(true)
      }}
      size='icon'
      className=' rounded-full border border-foreground/25  p-0 text-foreground/70 shadow-lg '
    >
      <Search className='size-6 ' strokeWidth={1} />
    </Button>
  )
}
export default SearchBtn
