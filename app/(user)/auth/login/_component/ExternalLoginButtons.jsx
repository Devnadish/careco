'use client'
import React from 'react'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import {
  Apple,
  Google,
  InstagramColored,
  Twitter
} from '@/components/svg/Socail'

export function ExternalLoginButtons({ status }) {
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
