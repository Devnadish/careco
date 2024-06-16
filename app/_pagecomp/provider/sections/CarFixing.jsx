import React from 'react'
import Image from 'next/image'
import { SectionTitle } from '@/components/shared/SectionTitle'
import Image64 from '@/components/shared/image/Image64'

export const CarFixing = ({ providerCarTypes }) => {
  return (
    <section className='flex  min-h-[calc(100vh-10.5rem)]  w-full  flex-wrap  items-center justify-center gap-4 border-b border-l border-primary bg-secondary/40 p-2 py-4'>
      <SectionTitle title={'خبراتنا'} />
      {providerCarTypes.map(({ image, name }, index) => {
        return (
          <div
            key={index}
            className='flex size-[200px] items-center justify-center rounded-lg border border-secondary bg-secondary p-4 text-lg shadow hover:border-primary'
          >
            <Image
              src={image}
              alt={name}
              width={150}
              height={150}
              className='rounded-lg object-cover hover:border-primary'
            />
          </div>
        )
      })}
    </section>
  )
}
