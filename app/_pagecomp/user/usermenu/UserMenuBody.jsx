import React from 'react'
import Text from '@/components/shared/Text'
import { Lock } from 'more/lib/icons'
import { ItemLink } from '@/app/_pagecomp/user/usermenu/ItemLink'
import { SelectCity } from './SelectCity'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from 'node_modules/@radix-ui/react-scroll-area/dist/index'
import { menuItemsUser } from 'more/constant/menu'

export function UserMenuBody({ isVerified, userid, setOpen }) {
  const menuItems = menuItemsUser(userid)
  return (
    <div className='relative max-h-[60%] w-full overflow-auto '>
      {isVerified ? null : <AccountInactive />}
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <ItemLink
            href={item.href}
            text={item.text}
            icon={item.icon}
            setOpen={setOpen}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

// /* <SelectCity /> */

const AccountInactive = () => {
  return (
    <div className='absolute z-50 flex h-full w-full bg-background/55  px-3 shadow-xl  backdrop-blur-sm '>
      <div className='flex  h-full w-full flex-col items-center justify-center gap-4 '>
        <Lock size={80} />
        <Text
          fontFamily={'tajwal'}
          fontSize={'large'}
          className={'text-red-500'}
        >
          الحساب غير نشط
        </Text>
      </div>
    </div>
  )
}
