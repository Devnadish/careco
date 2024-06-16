'use client'
import { urlQuery } from '@/more/lib/nadish'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { StarCount } from './StarCount'

export function StarFilter({ star1, star2, star3, star4, star5 }) {
  const pathName = usePathname()
  const router = useRouter()

  const handleoptions = value => {
    const queryString = urlQuery('rate', value)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.replace(updatedUrl, { scroll: true })
  }
  return (
    <div className='flex w-full  flex-wrap items-center justify-evenly gap-2'>
      <Button
        className='w-full flex-grow'
        variant='outline'
        onClick={() => handleoptions(5)}
      >
        <StarCount count={5} />
        <span className='text-muted-foreground'>{star5}</span>
      </Button>
      <Button
        className='flex-grow'
        variant='outline'
        onClick={() => handleoptions(4)}
      >
        <StarCount count={4} />
        <span className='text-muted-foreground'>{star4}</span>
      </Button>
      <Button
        className='flex-grow'
        variant='outline'
        onClick={() => handleoptions(3)}
      >
        <StarCount count={3} />
        <span className='text-muted-foreground'>{star3}</span>
      </Button>
      <Button
        className='flex-grow'
        variant='outline'
        onClick={() => handleoptions(2)}
      >
        <StarCount count={2} />
        <span className='text-muted-foreground'>{star2}</span>
      </Button>
      <Button
        className='flex-grow'
        variant='outline'
        onClick={() => handleoptions(1)}
      >
        <StarCount count={1} />
        <span className='text-muted-foreground'>{star1}</span>
      </Button>
    </div>
  )
}
