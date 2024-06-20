'use client'
import React from 'react'
import Image from 'next/image'
import logo from '../../../public/logov5.svg'
function AboutSystem() {
  return (
    <div
      className='flex  w-full cursor-pointer items-center justify-center gap-2'
      onClick={() => alert('معلومات عن الموقع')}
    >
      <Image
        src={logo}
        alt='careco'
        priority
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='size-24'
      />
    </div>
  )
}

export default AboutSystem
