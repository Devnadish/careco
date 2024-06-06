'use client'
import React, { useState } from 'react'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { LogIn, Mail, RectangleEllipsis } from 'more/lib/icons'
import InputWithIcon from '@/components/shared/InputWithIcon'
import Submit from '@/components/shared/Submit'
import { signIn } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation'
import { Visitor } from '@/components/svg/Visitor'
import { useSession } from 'next-auth/react'
import {
  LogoSpinner,
  LogoSpinnerInline,
  SubSpinner
} from '@/components/shared/Spinner'
import Swal from 'sweetalert2'
import Image from 'next/image'

import {
  Apple,
  Github,
  Google,
  InstagramColored,
  Twitter
} from '@/components/svg/Socail'
import { RegisterOutline } from '@/components/svg/Register'
import { Notify } from '@/lib/nadish'
import { Separator } from '@/components/ui/separator'

export const LoginPage = () => {
  const { data: session, status } = useSession()

  return (
    <div className='relative  -mt-10 flex h-screen w-full max-w-sm flex-col items-center justify-start gap-2 rounded-lg  '>
      {status === 'loading' && <LogoSpinnerInline msg={'مصادقة الحماية'} />}
      {status === 'authenticated' && redirect('/')}
      <div className='relative flex size-24  md:size-24'>
        <Image src='/logov5.svg' alt='careco' fill />
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

function ExternalLoginButtons({ status }) {
  const buttonStyles =
    'flex items-center justify-center rounded-md bg-secondary px-2'
  {
    status === 'unauthenticated' && (
      <Text fontFamily={'cairo'} className={'flex-col'} fontSize={'xs'}>
        <span>ادخل بحسابك</span>
        <span>او</span>
      </Text>
    )
  }

  const ExternalLoginButton = ({ icon, onClick }) => (
    <Button variant='outline' className={buttonStyles} onClick={onClick}>
      {icon}
    </Button>
  )

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='flex gap-4'>
        <ExternalLoginButton
          icon={<Google className='size-7' />}
          onClick={signIn}
        />
        <ExternalLoginButton
          icon={<Apple className='size-7' />}
          onClick={signIn}
        />
        <ExternalLoginButton
          icon={<Twitter className='size-7' />}
          onClick={signIn}
        />
        <ExternalLoginButton
          icon={<InstagramColored className='size-7' />}
          onClick={signIn}
        />
      </div>
    </div>
  )
}

function RegularVisitor() {
  const router = useRouter()
  return (
    <Button
      variant='outline'
      className='border border-blue-400 text-blue-400'
      onClick={() => router.push('/')}
    >
      <Visitor className='size-6' />
      <Text fontFamily={'cairo'}>استمر كزائر</Text>
    </Button>
  )
}

function LoginForm() {
  const handleSignIn = async formData => {
    const email = formData.get('email')
    const password = formData.get('password')
    Notify('جاري تسجيل الدخول', 'loading')

    try {
      const user = await signIn('credentials', {
        email,
        password
        // redirect: false
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
    <form action={handleSignIn} className='flex w-full flex-col gap-2  '>
      <InputWithIcon icon={<Mail strokeWidth={1} />} name='email' />
      <div className='flex flex-col items-center justify-center gap-4'>
        <InputWithIcon
          icon={<RectangleEllipsis strokeWidth={1} />}
          name='password'
        />
        <div className='flex w-full items-center justify-between'>
          <Submit
            icons={<LogIn size={20} strokeWidth={1} className='size-4' />}
            title='دخول'
            className={'w-1/2 bg-green-500'}
          />
          <Button variant='link' className='self-end pl-0' type='button'>
            <Text fontSize={'xs'} className={'self-end'}>
              نسيت كلمة المرور ؟
            </Text>
          </Button>
        </div>
      </div>
    </form>
  )
}

const RegisterPage = () => {
  const router = useRouter()
  return (
    <div className='flex w-full    items-center justify-between  '>
      <Button
        variant='link'
        className='flex  flex-col items-start  '
        onClick={() => {
          router.push('/auth/register')
        }}
      >
        <div className='flex items-center gap-2'>
          <RegisterOutline className='size-6 text-green-500' />
          <Text fontFamily={'tajwal'} fontSize={'medium'}>
            تسجيل
          </Text>
        </div>
        <Text fontSize={'xs'} className={'self-end text-green-500 '}>
          عروض حصرية تنتظرك !
        </Text>
      </Button>
      <RegularVisitor />
    </div>
  )
}
