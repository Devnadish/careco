// import { ShowDepartmentComment } from '@/app/_pagecomp/provider/db/departmentDb'
import { Avatar } from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import { Separator } from '@/components/ui/separator'
import { getTimeElapsed } from '@/more/lib/nadish'
import React from 'react'

const ShowComments = async ({ comment }) => {
  return (
    <div className='flex w-full flex-wrap items-center justify-start gap-4'>
      {comment.map(({ id, userImage, userName, comment, createdAt }, index) => (
        <div
          key={id}
          className='mr-10 flex w-full max-w-xs flex-grow flex-col items-center gap-2 rounded-md border border-primary bg-primary/10  p-2'
        >
          <div className='flex w-full flex-col items-center '>
            <div className='flex w-full flex-col  '>
              <div className='flex w-full  items-center justify-center  '>
                <Avatar src={userImage} alt={userName} size={6} />
              </div>
              <div className='flex w-full  items-center justify-between  '>
                <span className='text-xs text-muted-foreground'>
                  {userName}
                </span>
                <span className='flex w-full flex-1 justify-end text-xs text-muted-foreground'>
                  {getTimeElapsed(createdAt)}
                </span>
              </div>
            </div>
            <Separator className='m-2 w-full bg-primary/30' />
            <Text
              className={'w-full p-4 font-tajwal font-semibold text-primary '}
            >
              {comment}
            </Text>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowComments
