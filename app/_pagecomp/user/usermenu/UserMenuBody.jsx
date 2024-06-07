import React from 'react'
import { ItemLink } from '@/app/_pagecomp/user/usermenu/ItemLink'
import { SelectCity } from './SelectCity'
import { menuItemsUser } from 'more/constant/menu'

export function UserMenuBody({ isVerified, userid, setOpen }) {
  const menuItems = menuItemsUser(userid)
  return (
    <div className='relative max-h-[60%] w-full overflow-auto '>
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
