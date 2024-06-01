import React from 'react'
import ActivationForm from '@/app/_pagecomp/user/rigestier/ActivationForm'
import UserLogout from '@/app/_pagecomp/user/logout/UserLogout'

export function UseMenuFooter({ isVerified, setOpen }) {
  return (
    <div
      className='flex w-full items-center justify-end gap-8 '
      onClick={() => setOpen(false)}
    >
      <UserLogout />
      {!isVerified && <ActivationForm />}
    </div>
  )
}
