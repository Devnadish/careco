'use client'
import GoHome from '@/components/shared/GoHome'
// import { Logo } from '../Logo'
import MainMenu from './MainMenu'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import UserMenu from '@/app/_pagecomp/user/usermenu/UserMenu'
import LoginBtn from '@/app/_pagecomp/user/login/LoginBtn'
import NewMail from '@/app/_pagecomp/admin/mailsystem/NewMail'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Menu, Search, X } from '@/lib/icons'
import SearchProvider from '@/app/_pagecomp/home/SearchProvider'
import { ClearSearch } from '../svg/ClearSearch'
import { removeQuery } from '@/lib/nadish'
import { useState } from 'react'

const NavBar = ({ session, newMails }) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const IsSearchParams = searchParams.has('search')
  const [searchText, setSearchText] = useState('')

  let urlPrefix

  if (pathName === '/') {
    urlPrefix = 'admin'
  }

  if (pathName === '/auth/login') return null
  if (pathName === '/auth/register') return null
  if (pathName === '/auth/register') return null
  if (pathName === '/auth/error') return null

  http: return (
    <nav
      id='navbar'
      className='fixed left-0 top-0 z-50 flex  h-[54px] w-full items-center justify-between gap-2  bg-background/55  px-3 shadow-xl  backdrop-blur-md  '
    >
      {session ? (
        <UserMenu session={session} newMails={newMails} />
      ) : (
        <LoginBtn />
      )}

      <div className='flex  items-center gap-4'>
        <SearchProvider searchText={searchText} setSearchText={setSearchText} />
        {IsSearchParams && <ClearInputFilter setSearchText={setSearchText} />}
        <Button variant='outline' size='icon'>
          <Menu />
        </Button>
      </div>

      {/* {pathName !== '/' && <GoHome />} */}
    </nav>
  )
}
export default NavBar

const ClearInputFilter = ({ setSearchText }) => {
  const pathName = usePathname()
  const router = useRouter()

  const updateUrl = () => {
    const queryString = removeQuery('search')
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    setSearchText('')
    router.push(updatedUrl)
  }

  return (
    <div
      className='size-6 cursor-pointer rounded-full bg-primary text-red-900 outline outline-1 outline-offset-2 outline-red-500'
      onClick={updateUrl}
    >
      <X className='size-6  text-red-900' />
    </div>
  )
}

//  {
//    /* <MainMenu /> */
//  }
//  {
//    /* <NewMail
//       urlPrefix={urlPrefix}
//       session={session}
//       to={process.env.NEXT_PUBLIC_ADMIN_EMAIL}
//     /> */
//  }
