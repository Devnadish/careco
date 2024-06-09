'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Text from '@/components/shared/Text'

const ShowDropdownMenu = ({
  options,
  onChange,
  // triggerIcon: TriggerIcon,
  triggerIcon,
  title
}) => (
  // <p>ssdsddd</p>
  <DropdownMenu dir='rtl' modal>
    <DropdownMenuTrigger asChild>
      <Button
        variant='ghost'
        className='flex items-center justify-center border border-white/20 p-2 shadow-lg'
        size='sm'
      >
        {/* <TriggerIcon className='text-primary' /> */}
        {triggerIcon}
        <Text size='sm'>{title}</Text>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className='flex flex-col items-center justify-between gap-1'>
      {options.map(({ value, label, title }) => (
        <DropdownMenuItem
          key={value}
          className='flex items-center hover:bg-secondary'
          onClick={() => onChange('type', value)}
        >
          <div className='flex items-center gap-2'>
            {label}
            <Text>{title}</Text>
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)
export default ShowDropdownMenu
