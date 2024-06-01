import Text from '@/components/shared/Text'
import { menu } from 'more/constant/menu'
import Link from 'next/link'

const MainMenu = () => {
  return (
    <div className='flex h-[50px]   w-full  items-center justify-between gap-2   px-3 md:justify-center    '>
      {menu.map(menuItem => {
        return (
          <Link
            key={menuItem.id}
            href={menuItem.href}
            className='flex size-9 w-fit items-center  gap-2 rounded  bg-white/10 px-3 py-1 text-sm hover:bg-secondary/80 lg:w-fit   '
          >
            {menuItem.icon}
            <Text opacity={'O70'} className={'hidden md:block'}>
              {menuItem.title}
            </Text>
          </Link>
        )
      })}
    </div>
  )
}
export default MainMenu
