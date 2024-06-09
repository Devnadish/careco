import React from 'react'

import { SectionTitle } from '@/components/shared/SectionTitle'
import { Dislike, Like } from '@/components/svg/LikeAndDislike'
import ProviderCard from '@/app/_pagecomp/home/ProviderCard'
import { StarFilled } from '@/components/svg/StarFilled'
import { HistoryIcon } from '@/components/svg/History'
import { HeartHandshake, Trash } from '@/more/lib/icons'
import Text from '@/components/shared/Text'
import RemoveActionButton from '@/app/_pagecomp/user/useractions/RemoveAction'
import { getUserActions } from '@/app/_pagecomp/user/db/reaction'
import { SadFace } from '@/components/svg/SadFace'
export const dynamic = 'force-dynamic'

// show menu for like and dislike and all reaction
// TODO:  restyle it to make it more beautiful and tablluar
export async function page({ params }) {
  const userId = params.userid[0]
  const requestType = params.userid[1]

  const requestCodeMap = {
    like: 1,
    dislike: 2,
    history: 3,
    rate: 4,
    favorate: 5
  }
  const requestCode = requestCodeMap[requestType]

  const requestMessageMap = {
    1: 'الاعجاب',
    2: 'عدم الاعجاب',
    3: 'السجل',
    4: 'التقييم',
    5: 'المفضلة'
  }
  const requestMessage = requestMessageMap[requestCode]

  const requestIconMap = {
    1: <Like className='size-12 text-primary' />,
    2: <Dislike className='size-12 text-primary' />,
    3: <HistoryIcon className='size-12 text-primary' />,
    4: <StarFilled className='size-12 text-primary' />,
    5: <HeartHandshake className='size-12 text-primary' />
  }
  const requestIcon = requestIconMap[requestCode]

  const providersList = await getUserActions(userId, requestCode)
  if (providersList.msg === 'noData') {
    return <NoDataToView msg={requestMessage} icon={requestIcon} />
  }

  const { providers: favoriteProviders } = providersList?.providers || {}

  return (
    <div className='absolute top-20 flex w-full flex-wrap items-center justify-center'>
      <div className='mb-4 flex w-full max-w-5xl items-center justify-start'>
        {requestIcon}
        <SectionTitle title={`قائمة ${requestMessage}`} />
      </div>

      <div className='flex w-full flex-wrap items-center justify-center gap-4'>
        {favoriteProviders.map(provider => {
          return (
            <div key={provider.id}>
              <RemoveActionButton
                providerId={provider.id}
                actionId={requestCode}
                userid={userId}
              />
              <ProviderCard providerInfo={provider} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page

const NoDataToView = ({ msg, icon }) => (
  <div className='container flex w-full flex-col items-center justify-center rounded-lg  p-4'>
    <div className='mb-4 flex w-full max-w-5xl items-center justify-start'>
      {icon}
      <SectionTitle title={`قائمة ${msg}`} />
    </div>
    <div className='flex h-[30vh] w-full max-w-sm flex-col flex-wrap items-center justify-center  gap-8 rounded-lg border border-primary bg-primary/10 text-primary'>
      <Text fontSize={'xl3'}>لاتوجد بيانات</Text>
      <SadFace className='size-9 ' />
    </div>
  </div>
)
