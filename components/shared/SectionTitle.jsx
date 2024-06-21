import Text from '@/components/shared/Text'
import React from 'react'

export const SectionTitle = ({ title, className }) => {
  return (
    <div
      className={`absolute right-0 top-0 mb-4 w-fit self-start border-b-4 border-primary px-4 font-bold ${className}`}
    >
      <Text className={'w-full text-xl'} opacity={'O70'}>
        {title}
      </Text>
    </div>
  )
}
