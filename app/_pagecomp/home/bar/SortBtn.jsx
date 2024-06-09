'use client'
import { StarFilled } from '@/components/svg/StarFilled'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SortIcon } from '@/more/lib/icons'
import {
  Eye,
  HeartHandshake,
  MessageCircleMore,
  Share2
} from '@/more/lib/icons'
import { urlQuery } from '@/more/lib/nadish'
import { useRouter, usePathname } from 'next/navigation'

export function SortBtn({ isAsc, setIsAsc, sortBy, setSortBy }) {
  const router = useRouter()
  const pathName = usePathname()

  const handleSortType = () => {
    setIsAsc(!isAsc)
    const queryString = urlQuery('sorttype', isAsc ? 'asc' : 'desc')
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.push(updatedUrl)
  }

  const handleChange = (xtype, value) => {
    const queryString = urlQuery(xtype, value)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.push(updatedUrl)
  }

  return (
    <DropdownMenu dir='rtl'>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className=' rounded-full border border-foreground/25  p-0 text-foreground/70 shadow-lg '
        >
          <SortIcon className='size-6 opacity-85' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='start'
        sideOffset={5}
        alignOffset={15}
      >
        <DropdownMenuLabel className='font-noto font-bold text-muted-foreground '>
          الترتيب{' '}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem
              className='flex items-center gap-4 hover:bg-secondary'
              onClick={() => handleChange('sort', 'star')}
              value='التقييم'
            >
              <StarFilled className='size-4 text-yellow-400' />
              التقييم
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              className='flex items-center gap-4 hover:bg-secondary'
              onClick={() => handleChange('sort', 'comment')}
              value='التعليقات'
            >
              <MessageCircleMore className='size-4 text-green-400' />
              التعليقات
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              className='flex items-center gap-4 hover:bg-secondary'
              onClick={() => handleChange('sort', 'share')}
              value='الشير'
            >
              <Share2 className='size-4 text-primary' />
              الشير
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              className='flex items-center gap-4 hover:bg-secondary'
              onClick={() => handleChange('sort', 'viewer')}
              value='المشاهدة'
            >
              <Eye className='size-4 text-primary text-purple-700' />
              المشاهدة
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              className='flex items-center gap-4 hover:bg-secondary'
              onClick={() => handleChange('sort', 'fav')}
              value='التفضيل'
            >
              <HeartHandshake className='size-4 text-red-500' />
              التفضيل
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortBtn
