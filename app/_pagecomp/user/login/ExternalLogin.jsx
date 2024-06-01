import React from 'react'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  Apple,
  Github,
  Google,
  Instagram,
  InstagramColored,
  Twitter
} from '@/components/svg/Socail'
import Text from '@/components/shared/Text'
function ExternalLogin() {
  const iconStyle = 'size-7'
  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <div className='flex w-full items-center justify-start'>
        <Text fontFamily={'tajwal'} fontSize={'large'}>
          ادخل بواسطة
        </Text>
      </div>
      <div className='flex w-full items-center gap-4'>
        <Button
          variant='outline'
          className='flex w-full items-center justify-center rounded-md bg-secondary px-2'
          onClick={() => signIn()}
        >
          <Google className={iconStyle} />
        </Button>
        <Button
          variant='outline'
          className='flex w-full items-center justify-center rounded-md bg-secondary px-2'
          onClick={() => signIn()}
        >
          <Apple className={iconStyle} />
        </Button>
        <Button
          variant='outline'
          className='flex w-full items-center justify-center rounded-md bg-secondary px-2'
        >
          <Twitter className={iconStyle} />
        </Button>
        <Button
          variant='outline'
          className='flex w-full items-center justify-center rounded-md bg-secondary px-2'
          onClick={() => signIn()}
        >
          <InstagramColored className={iconStyle} />
        </Button>
        <Button
          variant='outline'
          className='flex w-full items-center justify-center rounded-md bg-secondary px-2'
          onClick={() =>
            signIn('github', {
              redirect: true,
              callbackUrl: '/'
            })
          }
        >
          <Github className={iconStyle} />
        </Button>
      </div>
    </div>
  )
}

export default ExternalLogin
