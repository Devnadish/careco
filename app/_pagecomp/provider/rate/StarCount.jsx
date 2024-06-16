'use client'
import { StarFilled } from '@/components/svg/StarFilled'
import Text from '@/components/shared/Text'

export const StarCount = ({ count, rate, text }) => {
  const totalStars = 5 // Total number of stars in the rating system
  const textValues = ['مستاء', 'غير راض', 'جيد', 'راض', 'راض جدا']
  const stars = Array.from({ length: totalStars }, (_, index) => (
    <StarFilled
      key={index}
      size={24}
      className={`text-${index < count ? 'yellow' : 'gray'}-400`}
    />
  ))

  return (
    <div className='flex w-full flex-col items-center  '>
      <Text fontSize={'xs'} className={'text-foreground'}>
        {textValues[count - 1]}
      </Text>
      <div className='flex items-center'>{stars}</div>
      <div className='flex items-center'>{rate}</div>
    </div>
  )
}
