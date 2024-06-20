'use client'
import LogoSpinnerInline from '@/components/shared/spinner/LogoSpinnerInline'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState, lazy, Suspense } from 'react'
import logo from '../../../public/logov5.svg'
const MainMenu = lazy(() => import('@/components/menu/navbar/MainMenu'))

const MainMenuBtn = ({ session }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        variant='outline'
        size='icon'
        className='border'
        onClick={() => setOpen(true)}
      >
        <Image
          src={logo}
          alt='careco'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </Button>
      {open && (
        <Suspense fallback={<LogoSpinnerInline />}>
          <MainMenu open={open} setOpen={setOpen} session={session} />
        </Suspense>
      )}
    </>
  )
}
export default MainMenuBtn
