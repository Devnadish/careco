'use client'
import Text from '@/components/shared/Text'
import { Visitor } from '@/components/svg/Visitor'
import { Button } from '@/components/ui/button'
import { KeyRound, TriangleAlert } from '@/lib/icons'
import { useRouter } from 'next/navigation'
import React from 'react'

function page(context) {
  const router = useRouter()
  return (
    <div className='full flex h-[80vh] w-full flex-col items-center justify-center '>
      <div className='flex h-44 w-full flex-col  items-center justify-center  rounded-none rounded-t-md border bg-yellow-400 text-destructive'>
        <TriangleAlert size={100} className='text-destructive' />
        <Text
          fontSize={'large'}
          className={'font-semibold text-destructive'}
          fontFamily={'cairo'}
        >
          معلومات التسجيل غير صالحة
        </Text>
      </div>
      <div className='flex w-full items-center justify-between gap-4'>
        <Button
          className='flex flex-1  items-center justify-around rounded-none'
          onClick={() => router.push('/auth/login')}
        >
          <KeyRound size={20} />
          تسجيل الدخول
        </Button>
        <Button
          className='flex w-full flex-1 items-center justify-around rounded-none'
          onClick={() => router.push('/')}
        >
          <Visitor className='size-12' />
          الاستمرار كزائر
        </Button>
      </div>
    </div>
  )
}

export default page
