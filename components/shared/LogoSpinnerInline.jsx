import Image from 'next/image'
import React from 'react'

const LogoSpinnerInline = ({ msg = 'تحميل' }) => {
  return (
    <div className='fixed left-1/2 top-1/2  flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center  bg-secondary/55 backdrop-blur-sm'>
      <div className='flex h-52 w-full  max-w-sm flex-col  items-center justify-center gap-2 rounded-md border border-primary bg-primary/10 shadow-2xl'>
        <div className='animate-spin-slow relative flex size-12 rounded-full  '>
          <Image
            src='/logov5spinner.svg'
            alt='careco'
            fill
            className='absolute inset-0'
            style={{ animation: 'spin 1.5s linear infinite' }}
          />
          <div className='animate-ping-gray absolute inset-0 rounded-full bg-gray-200 opacity-20'></div>
        </div>
        <span className='font-tajwal font-bold'>{msg}</span>
      </div>
    </div>
  )
}

export default LogoSpinnerInline
