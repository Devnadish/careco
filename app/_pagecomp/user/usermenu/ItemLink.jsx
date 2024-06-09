import React from 'react'
import Text from '@/components/shared/Text'
import Link from 'next/link'
import { Dot } from '@/more/lib/icons'

export const ItemLink = ({ href, text, icon, setOpen }) => {
  return (
    <div
      className='flex w-full items-center justify-end gap-8'
      onClick={() => setOpen(false)}
    >
      <Link
        href={href}
        className='flex h-9 w-full items-center gap-2 rounded  px-3 py-1 hover:bg-secondary'
      >
        {icon ? icon : <Dot />}
        <Text opacity={'O70'}>{text}</Text>
      </Link>
    </div>
  )
}
