import { NotActive } from '@/components/svg/NotActive'
import { Verifyed } from '@/components/svg/Verifyed'
import Image from 'next/image'
import React from 'react'

function AvatarImage({ src, alt, size, isVerified, location }) {
  const navStyle = 'ring-2 ring-white/40 '
  const profileStyle =
    'outline  outline-offset-4 outline-blue-400 ring-4 ring-blue-400 '
  return (
    <div
      className={`relative flex shadow-lg size-${size} items-center  rounded-full   ${location === 'nav' ? navStyle : profileStyle} ${isVerified ? 'border-green-300' : 'border-red-500'}`}
    >
      <Image
        src={src}
        alt={alt}
        className={`rounded-full object-contain ${location === 'nav' ? 'p-1' : 'p-2'} `}
        fill
      />
    </div>
  )
}

export default AvatarImage
