'use client'
import React from 'react'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { RegisterOutline } from '@/components/svg/Register'
import { RegularVisitor } from './RegularVisitor'

export const RegisterPage = () => {
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
