import React, { Suspense, lazy } from 'react'
const UserMenuBtn = lazy(() => import('@/components/menu/navbar/UserMenuBtn'))
const NotLogin = lazy(() => import('@/components/menu/navbar/NotLogin'))
const MainMenuBtn = lazy(() => import('@/components/menu/navbar/MainMenuBtn'))

const NavBar = ({ session, newMails }) => {
  const userAvatar = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${session?.user?.image}`
  const userName = session?.user?.name

  return (
    <nav
      id='navbar'
      className='fixed left-0 top-0 z-50 flex h-[54px] w-full items-center justify-between gap-2 bg-background/55  px-3 shadow-xl backdrop-blur-md'
    >
      {session ? (
        <UserMenuBtn
          userAvatar={userAvatar}
          userName={userName}
          session={session}
          newMails={newMails}
        />
      ) : (
        <NotLogin />
      )}

      <MainMenuBtn session={session} />
    </nav>
  )
}

export default NavBar
