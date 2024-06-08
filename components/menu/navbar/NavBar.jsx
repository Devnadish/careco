'use client'
import React, { useState, Suspense, lazy } from 'react'
import { usePathname } from 'next/navigation'

const UserMenuBtn = lazy(() => import('@/components/menu/navbar/UserMenuBtn'))
const NotLogin = lazy(() => import('@/components/menu/navbar/NotLogin'))
const SearchBtn = lazy(() => import('@/components/menu/navbar/SearchBtn'))

const MainMenuBtn = lazy(() => import('@/components/menu/navbar/MainMenuBtn'))
const SearchProvider = lazy(() => import('@/app/_pagecomp/home/SearchProvider'))
const UserMenu = lazy(() => import('@/app/_pagecomp/user/usermenu/UserMenu'))
const MainMenu = lazy(() => import('@/components/menu/navbar/MainMenu'))
const LogoSpinnerInline = lazy(
  () => import('@/components/shared/LogoSpinnerInline')
)

const NavBar = ({ session, newMails }) => {
  const pathName = usePathname()
  const [openSearch, setOpenSearch] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [open, setOpen] = useState(false)

  const userAvatar = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${session?.user?.image}`
  const userName = session?.user?.name

  let urlPrefix

  if (pathName === '/') {
    urlPrefix = 'admin'
  }

  const shouldRenderLogin = !session

  return (
    <nav
      id='navbar'
      className='fixed left-0 top-0 z-50 flex h-[54px] w-full items-center justify-between gap-2 bg-background/55 px-3 shadow-xl backdrop-blur-md'
    >
      {shouldRenderLogin && (
        <Suspense fallback={<LogoSpinnerInline />}>
          <NotLogin />
        </Suspense>
      )}
      {session && (
        <Suspense fallback={<LogoSpinnerInline />}>
          <UserMenuBtn
            // session={session}
            userAvatar={userAvatar}
            userName={userName}
            openUserMenu={openUserMenu}
            setOpenUserMenu={setOpenUserMenu}
          />
        </Suspense>
      )}
      <div className='flex items-center gap-2'>
        <Suspense fallback={<LogoSpinnerInline />}>
          <SearchBtn session={session} setOpenSearch={setOpenSearch} />
        </Suspense>

        <Suspense fallback={<LogoSpinnerInline />}>
          <MainMenuBtn open={open} setOpen={setOpen} session={session} />
        </Suspense>
      </div>

      {openSearch && (
        <Suspense fallback={<LogoSpinnerInline />}>
          <SearchProvider
            open={openSearch}
            setOpen={setOpenSearch}
            session={session}
          />
        </Suspense>
      )}

      {openUserMenu && (
        <Suspense fallback={<LogoSpinnerInline />}>
          <UserMenu
            openUserMenu={openUserMenu}
            setOpenUserMenu={setOpenUserMenu}
            session={session}
            newMails={newMails}
          />
        </Suspense>
      )}

      {open && (
        <Suspense fallback={<LogoSpinnerInline />}>
          <MainMenu open={open} setOpen={setOpen} session={session} />
        </Suspense>
      )}
    </nav>
  )
}

export default NavBar
