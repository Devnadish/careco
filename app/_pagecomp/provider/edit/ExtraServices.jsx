'use client'
import React, { useState } from 'react'
import Text from '@/components/shared/Text'
import { Label } from '@/components/ui/label'
import { Avatar } from '@/components/shared/Avatar'

export const ExtraServices = ({ extraService }) => {
  return (
    <section className='flex flex-grow flex-col items-start gap-3 rounded-md border border-border p-4'>
      <Text fontSize={'large'}>خدمات اضافية</Text>
      <div className=''>
        <Label htlmfor=''> الخدمة </Label>
      </div>
      <MultiSelect data={extraService} />
    </section>
  )
}

const MultiSelect = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([])

  const handleSelect = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item)
      )
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  return (
    <div className='flex w-full flex-wrap items-center gap-1'>
      {data.map(item => (
        <div
          key={item.id}
          className='flex h-20 flex-grow cursor-pointer flex-col items-center rounded-md bg-secondary px-2 py-1'
          onClick={() => handleSelect(item.id)}
        >
          <Avatar src={item.image} alt={item.service} fallBack={item.service} />
          <div className='flex flex-grow  items-center gap-2  '>
            <input
              type='checkbox'
              id={item.id}
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelect(item.id)}
            />
            <label className='font-tajwal text-xs'>{item.service}</label>
          </div>
        </div>
      ))}
    </div>
  )
}
