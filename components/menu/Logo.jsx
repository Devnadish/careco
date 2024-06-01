'use client'
import Image from 'next/image'
export const Logo = () => {
  return (
    <div className='flex h-full w-1/5 items-center justify-center border-x border-border'>
      <Image
        src={'/logo.svg'} // Handle missing logo
        alt={'car'}
        width={145}
        height={145}
      />
    </div>
  )
}
