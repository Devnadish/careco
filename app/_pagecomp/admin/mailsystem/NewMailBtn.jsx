'use client'
import LogoSpinnerInline from '@/components/shared/spinner/LogoSpinnerInline'
import { EMail } from '@/components/svg/Mail'
import { Button } from '@/components/ui/button'
import React, { useState, lazy, Suspense } from 'react'
const NewMail = lazy(() => import('./NewMail'))

function NewMailBtn({ session, providerEmail }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        className='flex h-16 w-full flex-col items-center justify-center'
        variant='ghost'
        // size='icon'
        onClick={() => setOpen(true)}
      >
        <EMail className='size-6 text-foreground  ' />
        <span className='font-noto text-sm text-foreground'>راسلنا</span>
      </Button>

      {open && (
        <Suspense fallback={<LogoSpinnerInline />}>
          <NewMail
            session={session}
            to={providerEmail}
            urlPrefix={'provider'}
            open={open}
            setOpen={setOpen}
          />
        </Suspense>
      )}
    </>
  )
}

export default NewMailBtn
