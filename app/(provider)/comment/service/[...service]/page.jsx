import { GoBack } from '@/components/shared/GoHome'
import Text from '@/components/shared/Text'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { Dot } from '@/more/lib/icons'

import { getServerSession } from 'next-auth'
import { options } from '@/more/provider/authentication/options'
import CommentRules from '@/app/_pagecomp/provider/comment/CommentRules'
import AddComment from '@/app/_pagecomp/provider/comment/AddComment'
import ShowComments from '@/app/_pagecomp/provider/comment/ShowComments'
import { getserviceData } from '@/app/_pagecomp/provider/comment/commentDb'

async function page({ params }) {
  const poviderSlug = decodeURIComponent(params.service[0])
  const serviceSlug = decodeURIComponent(params.service[1])
  const getData = await getserviceData(poviderSlug, serviceSlug)
  const session = await getServerSession(options)

  const { service, description, logo, subPoints } = getData.service

  return (
    <div className='relative mb-16 w-full'>
      <div className='absolute -top-4 right-0  rounded-full bg-primary px-4 py-1 text-secondary shadow-md'>
        <Text>معلومات الخدممات الاضافية و التعليقات</Text>
      </div>
      <div className='mt-3 flex w-full items-center justify-between'>
        <Text className={'text-3xl text-muted-foreground'}>
          {getData.providerName}
        </Text>
        <GoBack />
      </div>
      <Tabs defaultValue='comment' className='mt-5 w-full' dir='rtl'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='section'>
            <Text>{service}</Text>
          </TabsTrigger>
          <TabsTrigger value='comment'>
            <div className='flex items-center gap-4'>
              <Text>
                <span>التعليقات</span>
                <span className='rounded-full bg-primary px-2 text-white'>
                  {getData?.comment?.length}
                </span>
              </Text>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='section' className='flex w-full flex-col gap-4'>
          <Image
            src={`/extraservicelogo/${logo || 'logo.svg'}`}
            alt={service}
            width={100}
            height={100}
            className='rounded-lg object-cover p-1'
          />
          <Text
            fontFamily={'tajwal'}
            className={'text-pretty text-muted-foreground'}
          >
            {description}
          </Text>
          {subPoints.map((point, index) => (
            <Text
              key={index}
              className={
                'flex items-start gap-2 text-pretty text-muted-foreground  '
              }
            >
              <Dot size={30} />
              {point}
            </Text>
          ))}
        </TabsContent>
        <TabsContent value='comment'>
          <div className='flex w-full flex-col gap-4'>
            <CommentRules type='service' />
            <AddComment
              session={session}
              providerid={getData.poviderId}
              serviceid={getData.serviceid}
              poviderSlug={poviderSlug}
              departmentSlug={serviceSlug}
              type='service'
            />
            <ShowComments comment={getData.comment} type='service' />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page
