'use client'
import { KeyRound } from '@/more/lib/icons'
import Link from 'next/link'
import React from 'react'

const NotLogin = () => {
  return (
    <Link
      href='/auth/login'
      className='flex items-center gap-1 rounded-lg border bg-white/30 p-2'
    >
      <KeyRound strokeWidth={1} />
    </Link>
  )
}
export default NotLogin
