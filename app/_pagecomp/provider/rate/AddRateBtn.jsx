'use client'
import DialogBox from '@/components/shared/DialogBox'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { RateSection } from './RateSection'
import { reFixrate } from '../db/rateDb'

function AddRateBtn({ session, providerId, rateing }) {
  const [open, setOpen] = useState(false)
  const handleOpen = async () => {
    // await reFixrate()
    setOpen(true)
  }
  return (
    <div>
      <Button className='gap-2' onClick={() => handleOpen()}>
        <span className='text-xl'>+</span>
        <span className='text-sm'>اضافة تقييم</span>
      </Button>
      <DialogBox open={open} setOpen={setOpen}>
        <RateSection
          session={session}
          providerId={providerId}
          rateing={rateing}
          setOpen={setOpen}
        />
      </DialogBox>
    </div>
  )
}

export default AddRateBtn
