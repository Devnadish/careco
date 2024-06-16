'use client'
import React from 'react'
import { SectionTitle } from '@/components/shared/SectionTitle'
import Text from '@/components/shared/Text'
import Image from 'next/image'
import Link from 'next/link'
import { MoveLeft } from '@/more/lib/icons'

export const Department = ({ department, providerId, providerSlug }) => {
  return (
    <section className='mt-2 flex min-h-[calc(100vh-10.5rem)] w-full  flex-col  items-center justify-between  border-b  border-l border-primary bg-secondary/40  p-4  px-4'>
      <SectionTitle title={'الاقسام الرئسية'} />
      <div className='mx-auto flex w-full  flex-wrap  items-center justify-center  gap-4'>
        {department.map(service => {
          return (
            <div
              className='flex h-full w-[200px] flex-grow flex-col flex-wrap items-start justify-between gap-2  rounded-lg  border border-primary p-4 hover:shadow-xl  md:max-w-lg'
              key={service.id}
            >
              <div className='min-w-xs flex w-full flex-col items-center justify-center gap-3'>
                <Image
                  src={`/extraservicelogo/${service.image || 'logo.svg'}`} // Handle missing logo
                  alt={service.name}
                  width={45}
                  height={45}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='rounded-lg fill-white object-contain '
                />
                <Text fontSize={'large'}>{service.name}</Text>
              </div>

              <Link
                href={{
                  pathname: `/comment/department/${providerSlug}/${service.slug}`
                }}
                className='flex  w-full items-end justify-end gap-4 border-t border-primary text-primary'
              >
                <span className='font-tajwal'>التفاصيل</span>
                <MoveLeft />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
