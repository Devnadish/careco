'use client'
import React, { useState } from 'react'
import { KeyRound } from 'more/lib/icons'
import Link from 'next/link'

function LoginBtn() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Link
        href='/auth/login'
        className='flex items-center gap-1 rounded-lg border bg-white/30 p-2'
      >
        <KeyRound strokeWidth={1} />
      </Link>
    </>
  )
}

export default LoginBtn
