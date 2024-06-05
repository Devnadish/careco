import React from 'react'
import { Input } from '../ui/input'

function InputWithIcon({ icon, ...props }) {
  return (
    <div className='flex w-full items-center gap-1 overflow-hidden rounded-lg border border-border p-0'>
      <div className='flex h-10 items-center justify-center rounded-r-lg bg-white/20 px-2'>
        {icon}
      </div>
      <Input
        className='ml-1 flex
       h-8 rounded-sm border-none bg-background px-1 py-2 text-sm outline-none ring-0 ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-[1px] 
      '
        {...props}
      />
    </div>
  )
}

export default InputWithIcon
