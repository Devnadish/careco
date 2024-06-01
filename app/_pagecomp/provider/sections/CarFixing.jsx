import React from 'react'
import Image from 'next/image'
import { SectionTitle } from '@/components/shared/SectionTitle'

export const CarFixing = ({ providerCarTypes }) => {
  return (
    <section className='flex w-full flex-col items-center justify-center border-b border-l border-primary bg-secondary/40 p-2 py-4'>
      <SectionTitle title={'خبراتنا'} />
      <div className='flex flex-wrap items-center justify-center gap-4 overflow-y-auto'>
        {providerCarTypes.map(({ image, name }, index) => {
          return (
            <div
              key={index}
              className='flex size-16 items-center justify-center rounded-lg border border-border bg-secondary p-2 text-lg shadow hover:bg-secondary'
            >
              <Image
                src={image}
                alt={name}
                width={50}
                height={50}
                className='rounded-lg object-cover'
              />
              {/* <p className='text-xs capitalize text-black'>{name}</p> */}
            </div>
          )
        })}
      </div>
    </section>
  )
}
