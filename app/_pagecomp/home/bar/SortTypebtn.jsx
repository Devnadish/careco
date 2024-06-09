import { SortAsc, SortDesc } from '@/components/svg/SortIcons'
import { Button } from '@/components/ui/button'
import { urlQuery } from '@/more/lib/nadish'
import { usePathname, useRouter } from 'node_modules/next/navigation'
import React from 'react'

function SortTypebtn({ isAsc, setIsAsc }) {
  const router = useRouter()
  const pathName = usePathname()
  const handleSortType = () => {
    setIsAsc(!isAsc)
    const queryString = urlQuery('sorttype', isAsc ? 'asc' : 'desc')
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.push(updatedUrl)
  }
  return (
    <Button
      onClick={() => handleSortType()}
      variant='ghost'
      className='size-7  border border-foreground/25 bg-secondary p-0 shadow-lg'
    >
      {isAsc ? (
        <SortAsc className='size-6 ' />
      ) : (
        <SortDesc className='size-6 ' />
      )}
    </Button>
  )
}

export default SortTypebtn
