import Image from 'next/image'
import React from 'react'

const LogoSpinnerInline = ({ message = 'جاري التحميل' }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-secondary/55 backdrop-blur-sm'>
    <div className='flex h-52 w-full max-w-sm flex-col items-center justify-center rounded-md border border-primary bg-primary/10 shadow-2xl'>
      <div className='animate-spin-slow relative flex h-12 w-12 items-center justify-center'>
        <Image
          src='/logo6spinner.svg'
          alt='careco'
          fill
          className='absolute inset-0'
        />
        <div className='animate-ping-gray absolute inset-0 rounded-full bg-gray-200 opacity-20'></div>
      </div>
      <span className='font-tajwal font-bold'>{message}</span>
    </div>
  </div>
)

export default LogoSpinnerInline
