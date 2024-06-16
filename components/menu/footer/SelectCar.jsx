'use client'
import CarToSelect from '@/app/_pagecomp/home/CarToSelect'
import CarIcon from '@/components/svg/CarIcon'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function SelectCar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        // variant='outline'
        // role='combobox'
        // aria-expanded={open}
        onClick={() => setOpen(true)}
        className='flex size-8  flex-col items-center justify-center rounded-full   p-0 shadow-xl hover:bg-secondary '
      >
        <CarIcon className='flex size-8   items-center justify-center  text-primary-foreground hover:text-primary  ' />
      </Button>
      {open && <CarToSelect open={open} setOpen={setOpen} />}
    </>
  )
}

export default SelectCar
