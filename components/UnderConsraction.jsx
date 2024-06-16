import React from 'react'
import Text from './shared/Text'
import Image from 'next/image'

function UnderConsraction({ children, pageName }) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Text
        fontFamily={'cairo'}
        fontSize={'large'}
        className={'flex items-center justify-center gap-4 font-semibold'}
      >
        <span className='rounded-md border border-primary bg-primary/10 px-3 text-primary'>
          {pageName}
        </span>
        <span>تحت الانشاء</span>
      </Text>
      <div className='relative flex size-24  md:size-36'>
        <Image src='/logov5.svg' alt='careco' fill />
      </div>
      <MyArticle content={children} />
      {children}
    </div>
  )
}

export default UnderConsraction
