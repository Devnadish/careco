import { providerMenu } from 'more/constant/menu'
import Link from 'next/link'
import Text from '@/components/shared/Text'

export const ProviderMenu = () => {
  return (
    <div className=' flex h-12 w-full  items-center  justify-between border-t-2  bg-secondary px-4 shadow-lg'>
      <div className='flex  w-full items-start    gap-2  px-4 lg:gap-6      '>
        {providerMenu.map(menuItem => {
          return (
            <Link
              key={menuItem.id}
              href={menuItem.href}
              className='flex h-9  w-full items-center     justify-center gap-2  bg-border/40  hover:bg-primary    '
            >
              <Text opacity='O100' fontSize={'xs'} className={'font-bold'}>
                {menuItem.title}
              </Text>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
