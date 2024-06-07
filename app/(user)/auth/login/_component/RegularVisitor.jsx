'use client'
import React from 'react'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Visitor } from '@/components/svg/Visitor'

export function RegularVisitor() {
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
