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
import { SubSpinner } from '@/components/shared/Spinner'
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

export const LoginPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <div className='relative mt-5 flex h-screen w-full max-w-sm flex-col items-center justify-start gap-2 rounded-lg md:mt-0 md:justify-center '>
      {status === 'loading' && <SubSpinner />}
      {status === 'authenticated' && redirect('/')}
      <div className='relative flex h-12 w-7 md:h-24 md:w-20'>
        <Image src='/careco.svg' alt='careco' fill />
      </div>
      <ExternalLoginButtons status={status} />
      <RegularVisitor />
      <div className='flex w-full  max-w-sm flex-col items-center justify-center gap-2 rounded-lg border border-primary p-3 shadow-lg'>
        <LoginForm />
        <RegisterPage />
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
      className='w-full gap-2 text-blue-500'
      onClick={() => router.push('/')}
    >
      <Visitor className='size-6' />
      <Text fontFamily={'cairo'}>استمر كزائر</Text>
    </Button>
  )
}

function LoginForm() {
  const { data: session, status } = useSession()

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
    </form>
  )
}

const RegisterPage = () => {
  const router = useRouter()
  return (
    <div className='flex w-full  flex-col items-center justify-around  '>
      <Button
        variant='outline'
        className='flex w-full flex-col items-center '
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
      </Button>
      <Text fontSize={'xs'} className={'self-end text-green-500 '}>
        عروض حصرية تنتظرك !
      </Text>
    </div>
  )
}

const LoginOK = ({ status, session }) => {
  routr.redirect('/')
}
