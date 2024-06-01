'use client'
import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { Input } from '@/components/ui/input'
import Submit from '../Submit'
import { Textarea } from '@/components/ui/textarea'
import { addCar } from '@/app/_pagecomp/admin/standerdata/db/masterFile'

function ShowImage({ imageName, setImageCarLink }) {
  return (
    <div
      className='flex size-12 flex-grow '
      onClick={() => setImageCarLink(imageName)}
    >
      <CldImage
        width={1500}
        height={1600}
        src={imageName}
        sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
        alt='Description1'
        loading='lazy'
        className='rounded-md   border  p-2'
      />
    </div>
  )
}

export const NewCar = ({ carsCounter, systemsCar }) => {
  const [imageCarLink, setImageCarLink] = useState('')
  const handleNewCar = async formData => {
    const data = {
      carid: carsCounter,
      name: formData.get('name'),
      image: imageCarLink,
      metaTag: formData.get('metaTag'),
      history: formData.get('history'),
      userid: 'khalid'
    }
    const result = await addCar(data)
  }
  return (
    <div className='flex w-full items-center justify-evenly gap-4'>
      <form
        action={handleNewCar}
        className='flex w-full flex-col gap-2 border p-4'
      >
        <div className='flex items-center gap-4'>
          <Input
            placeholder='اسم السيارة'
            name='name'
            className='h-7 text-xs'
          />
          <Input
            placeholder='نص لتحسين البحث'
            name='metaTag'
            className='h-7 text-xs'
          />
        </div>
        <Textarea placeholder='معلومات عن السيارة' name='history' />
        <div className='flex items-center justify-between'>
          <Input
            placeholder='رابط الشعار'
            name='image'
            disabled
            value={imageCarLink}
            onChange={() => setImageCarLink(e.target.value)}
            className='h-7 text-xs'
          />

          <Submit notifyMsg={'تم حفظ السيارة بنجاح'} />
        </div>
      </form>
      <DisplayAllCars
        systemsCar={systemsCar}
        setImageCarLink={setImageCarLink}
      />
    </div>
  )
}

export const DisplayAllCars = ({ systemsCar, setImageCarLink }) => {
  return (
    <div className='flex h-44 w-full max-w-sm flex-wrap items-center  justify-center gap-4 overflow-auto rounded-lg border p-4'>
      {systemsCar.map(system => (
        <ShowImage
          key={system.id}
          imageName={system.image}
          setImageCarLink={setImageCarLink}
        />
      ))}
    </div>
  )
}
export default ShowImage
