'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import LogoSpinnerInline from '@/components/shared/spinner/LogoSpinnerInline'
import Image from 'next/image'

import { Github } from '@/components/svg/Socail'
import { Separator } from '@/components/ui/separator'
import { ExternalLoginButtons } from './_component/ExternalLoginButtons'
import { LoginForm } from './_component/LoginForm'
import { RegisterPage } from './_component/RegisterPage'
// import { RegisterPage } from './RegisterPage'

export const LoginPage = () => {
  const { data: session, status } = useSession()

  return (
    <div className='relative  -mt-10 flex h-screen w-full max-w-sm flex-col items-center justify-start gap-2 rounded-lg  '>
      {status === 'loading' && <LogoSpinnerInline msg={'مصادقة الحماية'} />}
      {status === 'authenticated' && redirect('/')}
      <div className='relative flex size-24  md:size-24'>
        <Image src='/logo6.svg' alt='careco' fill />
      </div>

      <div className='flex h-[65%] w-full max-w-sm flex-col items-center justify-around gap-6 rounded-lg border border-border p-3 shadow-lg'>
        <ExternalLoginButtons status={status} />
        <LoginForm />
        <div className='flex w-full flex-col gap-4'>
          <Separator />
          <RegisterPage />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
