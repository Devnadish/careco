'use client'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { TriangleAlert } from 'more/lib/icons'

export const Nodata = ({ carName }) => {
  return (
    <div className='flex h-52 w-full max-w-sm flex-col items-center justify-center gap-4 rounded-md bg-yellow-300 '>
      <TriangleAlert size={40} className='text-destructive' />
      <span className='text-black'> {carName}</span>
      <Text>
        <span className='text-black'>لا يوجد ورشة للسيارة المطلوبة</span>
      </Text>
      <Button className='bg-destructive'>
        <Text>تواصل معنا للبحث لك عن الورشة</Text>
      </Button>
    </div>
  )
}
