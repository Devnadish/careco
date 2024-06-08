import React from 'react'
import { ItemLink } from '@/app/_pagecomp/user/usermenu/ItemLink'
import { SelectCity } from './SelectCity'
import { menuItemsUser } from 'more/constant/menu'
import { ScrollArea } from '@/components/ui/scroll-area'

export function UserMenuBody({ isVerified, userid, setOpen }) {
  const menuItems = menuItemsUser(userid)
  return (
    <ScrollArea
      className='h-72   w-full rounded-md  px-3'
      dir='rtl'
      type='auto'
    >
      <div className='flex  h-full w-full  flex-col  items-start   gap-1      '>
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
    </ScrollArea>
  )
}

// /* <SelectCity /> */
