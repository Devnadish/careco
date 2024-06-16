'use client'
import React, { lazy, Suspense, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
// import UserMenu from '@/app/_pagecomp/user/usermenu/UserMenu'
// import SearchProvider from '@/app/_pagecomp/home/SearchProvider'
// import { MainMenu } from './MainMenu'
import { Button } from '../ui/button'
import { Search, X } from '@/more/lib/icons'
import { removeQuery } from '@/more/lib/nadish'

import dynamic from 'next/dynamic'
import { SubSpinner } from '../shared/spinner/Spinner'
import LogoSpinnerInline from '../shared/spinner/LogoSpinnerInline'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import Text from '../shared/Text'
import { Avatar } from '../shared/Avatar'

const MainMenu = dynamic(() => import('./navbar/MainMenu'), { ssr: false })
const UserMenu = dynamic(
  () => import('@/app/_pagecomp/user/usermenu/UserMenu'),
  {
    ssr: false
  }
)
const SearchProvider = dynamic(
  () => import('@/app/_pagecomp/home/SearchProvider'),
  { ssr: false }
)

//  loading: () => <SubSpinner />
const NavBar = ({ session, newMails }) => {
  const pathName = usePathname()
  const [openSearch, setOpenSearch] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const userAvatar = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${session?.user?.image}`
  const userName = session?.user?.name

  const [open, setOpen] = useState(false)

  let urlPrefix

  if (pathName === '/') {
    urlPrefix = 'admin'
  }

  if (pathName === '/auth/login') return null
  if (pathName === '/auth/register') return null
  if (pathName === '/auth/register') return null
  if (pathName === '/auth/error') return null

  return (
    <nav
      id='navbar'
      className='fixed left-0 top-0 z-50 flex  h-[54px] w-full items-center justify-between gap-2  bg-background/55  px-3 shadow-xl  backdrop-blur-md  '
    >
      {session ? (
        <UserMenuBtn
          session={session}
          userAvatar={userAvatar}
          userName={userName}
        />
      ) : (
        <NotLogin />
      )}

      <SearchBtn session={session} />

      <MainMenuBtn open={open} setOpen={setOpen} session={session} />
      {/* serch */}
      <Suspense fallback={<LogoSpinnerInline />}>
        {openSearch && (
          <SearchProvider
            open={openSearch}
            setOpen={setOpenSearch}
            session={session}
          />
        )}
      </Suspense>
      {/* user menu */}
      <Suspense fallback={<LogoSpinnerInline />}>
        {openUserMenu && (
          <UserMenu
            openUserMenu={openUserMenu}
            setOpenUserMenu={setOpenUserMenu}
            session={session}
            newMails={newMails}
          />
        )}
      </Suspense>
      {/* app menu */}
      <Suspense fallback={<LogoSpinnerInline />}>
        {open && <MainMenu open={open} setOpen={setOpen} session={session} />}
      </Suspense>
    </nav>
  )
}
export default NavBar

const NotLogin = () => {
  return (
    <Link
      href='/auth/login'
      className='flex items-center gap-1 rounded-lg border bg-white/30 p-2'
    >
      <KeyRound strokeWidth={1} />
    </Link>
  )
}

const UserMenuBtn = ({ userName, userAvatar }) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative '
      onClick={() => setOpenUserMenu(true)}
    >
      <Avatar src={userAvatar} alt={userName} />
    </Button>
  )
}

const SearchBtn = ({ session }) => {
  return (
    <Button
      variant='ghost'
      onClick={() => {
        setOpenSearch(true)
      }}
      size='sm'
      className='min-w-48 rounded  border border-accent shadow-lg '
    >
      <div className='flex h-8 w-full items-center justify-end gap-3 '>
        <Text fontSize='xs' opacity={'O70'}>
          {searchText && searchText}
        </Text>
        <Separator orientation='vertical' className='bg-border' />
        <Search size={24} className='opacity-70' strokeWidth={1} />
      </div>
    </Button>
  )
}
const MainMenuBtn = ({ open, setOpen, session }) => {
  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        className='relative '
        onClick={() => setOpen(true)}
      >
        <Image src='/logov5.svg' alt='careco' fill />
      </Button>
    </>
  )
}

// import React, { useState, Suspense, lazy } from 'react';
// import { usePathname } from 'next/router'; // Use built-in hook for pathname

// const UserMenuBtn = React.lazy(() => import('./UserMenuBtn')); // Lazy load UserMenuBtn
// const NotLogin = React.lazy(() => import('./NotLogin')); // Lazy load NotLogin
// const SearchBtn = React.lazy(() => import('./SearchBtn')); // Lazy load SearchBtn
// const MainMenuBtn = React.lazy(() => import('./MainMenuBtn')); // Lazy load MainMenuBtn
// const SearchProvider = lazy(() => import('./SearchProvider')); // Lazy load SearchProvider
// const UserMenu = lazy(() => import('./UserMenu')); // Lazy load UserMenu
// const MainMenu = lazy(() => import('./MainMenu')); // Lazy load MainMenu
// const LogoSpinnerInline = React.lazy(() => import('./LogoSpinnerInline')); // Lazy load spinner

// const NavBar = ({ session, newMails }) => {
//   const pathName = usePathname();
//   const [openSearch, setOpenSearch] = useState(false);
//   const [openUserMenu, setOpenUserMenu] = useState(false);
//   const [open, setOpen] = useState(false);

//   const userAvatar = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${session?.user?.image}`;
//   const userName = session?.user?.name;

//   let urlPrefix;

//   if (pathName === '/') {
//     urlPrefix = 'admin';
//   }

//   const shouldRenderLogin = !session;

//   return (
//     <nav
//       id='navbar'
//       className='fixed left-0 top-0 z-50 flex h-[54px] w-full items-center justify-between gap-2 bg-background/55 px-3 shadow-xl backdrop-blur-md'
//     >
//       {shouldRenderLogin && <Suspense fallback={<LogoSpinnerInline />}><NotLogin /></Suspense>}
//       {session && (
//         <Suspense fallback={<LogoSpinnerInline />}><UserMenuBtn session={session} userAvatar={userAvatar} userName={userName} /></Suspense>
//       )}

//       <Suspense fallback={<LogoSpinnerInline />}><SearchBtn session={session} /></Suspense>

//       <Suspense fallback={<LogoSpinnerInline />}><MainMenuBtn open={open} setOpen={setOpen} session={session} /></Suspense>

//       {openSearch && (
//         <Suspense fallback={<LogoSpinnerInline />}>
//           <SearchProvider open={openSearch} setOpen={setOpenSearch} session={session} />
//         </Suspense>
//       )}

//       {openUserMenu && (
//         <Suspense fallback={<LogoSpinnerInline />}>
//           <UserMenu openUserMenu={openUserMenu} setOpenUserMenu={setOpenUserMenu} session={session} newMails={newMails} />
//         </Suspense>
//       )}

//       {open && (
//         <Suspense fallback={<LogoSpinnerInline />}>
//           <MainMenu open={open} setOpen={setOpen} session={session} />
//         </Suspense>
//       )}
//     </nav>
//   );
// };

// export default NavBar;
