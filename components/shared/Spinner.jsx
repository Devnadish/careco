import Image from 'next/image'
import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
      <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-200'></div>
    </div>
  )
}

export default Spinner

export const SubSpinner = () => {
  return (
    // <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
    <div className='size-6 animate-spin rounded-full border-b-2 border-t-2 border-gray-200'></div>
    // </div>
  )
}

export const LogoSpinner = () => {
  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
      <div className='animate-spin-slow relative h-16 w-16 rounded-full  '>
        <Image
          src='/logov5spinner.svg'
          alt='careco'
          fill
          className='absolute inset-0'
          style={{ animation: 'spin 1.5s linear infinite' }}
        />
        <div className='animate-ping-gray absolute inset-0 rounded-full bg-gray-200 opacity-20'></div>
      </div>
    </div>
  )
}
