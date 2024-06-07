'use client'
import React from 'react'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { LogIn, Mail, RectangleEllipsis } from 'more/lib/icons'
import InputWithIcon from '@/components/shared/InputWithIcon'
import Submit from '@/components/shared/Submit'
import { signIn } from 'next-auth/react'
import { Notify } from '@/lib/nadish'

export function LoginForm() {
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
          type='password'
        />
        <div className='flex w-full items-center justify-between'>
          <Submit
            icons={<LogIn size={20} strokeWidth={1} className='size-4' />}
            title='دخول'
            titleMsg='جاري تسجيل الدخول'
            className={
              'w-1/2 border border-primary bg-transparent text-foreground'
            }
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
