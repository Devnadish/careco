'use client'
import React, { useState } from 'react'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { LogIn, Mail, RectangleEllipsis } from 'more/lib/icons'
import InputWithIcon from '@/components/shared/InputWithIcon'
import Submit from '@/components/shared/Submit'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Visitor } from '@/components/svg/Visitor'
import { Register } from '@/app/_pagecomp/user/rigestier/Register'
import ExternalLogin from '@/app/_pagecomp/user/login/ExternalLogin'
import { useSession } from 'next-auth/react'
import { SubSpinner } from '@/components/shared/Spinner'

export const LoginPage = () => {
  const { data, status } = useSession()
  const router = useRouter()
  const handleSignIn = async formData => {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const user = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (!user.error) {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }
  return (
    <div className='relative flex h-[80vh] w-full max-w-sm flex-col items-center justify-center gap-4 rounded-lg  p-4 '>
      {status === 'loading' && <SubSpinner />}
      {status === 'unauthenticated' && <p>سجل</p>}
      {status === 'authenticated' && <p>مرحبا</p>}
      <ExternalLogin />
      <form
        action={handleSignIn}
        className='flex w-full flex-col gap-2 rounded-lg border p-4 '
      >
        <div className='flex flex-col gap-4'>
          <InputWithIcon icon={<Mail strokeWidth={1} />} name='email' />
          <InputWithIcon
            icon={<RectangleEllipsis strokeWidth={1} />}
            name='password'
          />
        </div>
        <div className='flex items-center justify-between'>
          <Submit
            icons={<LogIn size={20} strokeWidth={1} className='size-4' />}
            title='دخول'
            color='bg-secondary'
          />
          <Button variant='link' className='self-end'>
            <Text fontSize={'xs'}>نسيت كلمة المرور ؟</Text>
          </Button>
        </div>
      </form>
      <div className='flex w-full items-center justify-between'>
        <Register />
        <Button
          variant='link'
          className='flex items-center justify-center gap-2   rounded-none  border-b text-blue-500'
        >
          <Visitor className='size-6' />
          <Text fontFamily={'tajwal'}>زائر</Text>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
