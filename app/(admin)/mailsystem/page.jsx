import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from 'more/provider/authentication/options'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Text from '@/components/shared/Text'
import { getTimeElapsed } from 'more/lib/nadish'
import { Eye } from 'more/lib/icons'
import { DisplayMai } from '@/app/_pagecomp/admin/mailsystem/DisplayMai'
import NewMail from '@/app/_pagecomp/admin/mailsystem/NewMail'
import { collectMail } from '@/app/_pagecomp/admin/mailsystem/db/inbox'

function MailSystemheader(props) {
  return (
    <div className='flex w-full items-center justify-between'>
      <NewMail urlPrefix='user' session={props.session} />
      <div className='flex items-center gap-4'>
        <Text
          fontFamily={'tajwal'}
          fontSize={'xs'}
          className={'flex items-center gap-2'}
        >
          <span>جديد</span>
          <span className='rounded bg-primary px-2 text-white'>
            {props.mail?.newMailCount}
          </span>
        </Text>
        <Text
          fontFamily={'tajwal'}
          fontSize={'xs'}
          className={'flex items-center gap-2'}
        >
          <span>اجمالي</span>
          <span className='rounded bg-primary px-2 text-white'>
            {props.mail?.mailCount}
          </span>
        </Text>
      </div>
    </div>
  )
}

async function page() {
  const session = await getServerSession(options)
  const mail = await collectMail(session?.user?.email)
  return (
    <div className='w-full'>
      <Tabs defaultValue='inBox' className='mt-5 w-full' dir='rtl'>
        <MailSystemheader mail={mail} session={session} />
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='inBox'>الوارد {mail?.recive.length}</TabsTrigger>
          <TabsTrigger value='outBox'>الصادر {mail?.send.length}</TabsTrigger>
        </TabsList>
        <TabsContent value='inBox'>
          <Text>البريد الوارد</Text>
          <ShowMAils data={mail?.recive} />
        </TabsContent>
        <TabsContent value='outBox'>
          <Text>البريد الصادر</Text>
          <ShowMAils data={mail?.send} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default page

const ShowMAils = ({ data }) => {
  const handleClick = () => {
    alert('Under construction')
  }
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {data.map(mail => (
        <DisplayMai
          key={mail.id}
          title={
            <div className='flex w-full items-center justify-between'>
              {mail.subject}
              <Text className={'ml-4 text-muted-foreground'} fontSize={'xs'}>
                {getTimeElapsed(mail.createdAt)}
              </Text>
            </div>
          }
          icon={<Eye strokeWidth={1} className='h-4 w-4' />}
          mailId={mail.id}
        >
          <Card className='bg-base-100 shadow-md'>
            <CardContent>
              <Text>{mail.msg}</Text>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Text>{getTimeElapsed(mail.createdAt)}</Text>
            </CardFooter>
          </Card>
        </DisplayMai>
      ))}
    </div>
  )
}
