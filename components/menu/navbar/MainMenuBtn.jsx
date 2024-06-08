'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const MainMenuBtn = ({ open, setOpen, session }) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative '
      onClick={() => setOpen(true)}
    >
      <Image src='/logov5.svg' alt='careco' fill />
    </Button>
  )
}
export default MainMenuBtn
