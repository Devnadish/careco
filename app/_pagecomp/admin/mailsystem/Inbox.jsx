'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import SideBox from '@/components/shared/SideBox'
import { Bell, Eye, Reply } from '@/more/lib/icons'
import Text from '@/components/shared/Text'
import { getTimeElapsed } from '@/more/lib/nadish'
import { ScrollArea } from '@/components/ui/scroll-area'
import DialogBox from '@/components/shared/DialogBox'
import { getSingleMail } from './db/inbox'

function Inbox({ newMails }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant='outline'
        size={'sm'}
        className='relative mb-2  flex items-center justify-center border border-muted-foreground/50 bg-transparent '
        onClick={() => setOpen(true)}
      >
        <Bell className='text-secondary-foreground' />
        <div className='absolute left-2 top-1 flex size-4 items-center justify-center rounded-full  bg-destructive  text-primary-foreground'>
          <span className='text-[.6rem] text-destructive-foreground'>
            {newMails?.length || 0}
          </span>
        </div>
      </Button>

      <SideBox
        open={open}
        setOpen={setOpen}
        header={<InboxHedear newMails={newMails} />}
      >
        <InboxPreview newMails={newMails} setOpen={setOpen} />
      </SideBox>
    </>
  )
}

export default Inbox

const InboxHedear = ({ newMails }) => {
  return (
    <div className='mt-5 flex h-9 w-full items-center justify-center gap-4 rounded bg-secondary/50'>
      <Text>يوجد لديك في صندوق الوارد عدد </Text>
      <Text>{newMails.length}</Text>
    </div>
  )
}

const InboxPreview = ({ newMails }) => {
  const [openMail, setOpenMail] = useState(false)
  const [mailId, setMailId] = useState('')
  const handleReadMail = mailIdNo => {
    setOpenMail(true)
    setMailId(mailIdNo)
  }
  return (
    <>
      <ScrollArea className='mt-2 px-3' dir='rtl'>
        <div className='flex flex-col gap-4 '>
          {newMails.map(mail => (
            <div
              key={mail.id}
              className='flex flex-col items-start gap-4 rounded-md border p-2'
            >
              <div className='flex w-full flex-col items-center justify-between  '>
                <div className='flex w-full items-center justify-between border-b border-opacity-35 pb-2 '>
                  <Text fontSize={'xs'} opacity={'O70'}>
                    {mail.from}
                  </Text>
                  <Text fontSize={'xs'} opacity={'O40'}>
                    {getTimeElapsed(mail.createdAt)}
                  </Text>
                </div>
              </div>
              <Text fontSize={'xs'}>{mail.subject}</Text>
              <div className='self-end '>
                <Button
                  variant='outline'
                  className=' h-8'
                  onClick={() => handleReadMail(mail.id)}
                >
                  <Eye className='size-4 text-primary' />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <DialogBox open={openMail} setOpen={setOpenMail}>
        <ReadMail mailId={mailId} />
      </DialogBox>
    </>
  )
}

const ReadMail = ({ mailId }) => {
  const [mail, setMail] = useState(null)
  useEffect(() => {
    const fetchMail = async () => {
      const singleMail = await getSingleMail(mailId)
      setMail(singleMail)
    }

    fetchMail()
  }, [mailId])

  return (
    <div className='flex w-full flex-col items-start gap-4 rounded-md border   '>
      <div className='flex w-full flex-col items-center justify-between  '>
        <div className='flex w-full items-center justify-between border-b border-opacity-35 p-2 px-3 '>
          <Text fontSize={'xs'} opacity={'O70'}>
            <span>من :</span> {mail?.from}
          </Text>
          <Text fontSize={'xs'} opacity={'O40'}>
            {getTimeElapsed(mail?.createdAt)}
          </Text>
        </div>
      </div>
      <Text fontSize={'xs'} className={'flex flex-col items-start'}>
        <span className='bg-secondary pl-2'>الموضوع </span>
        {mail?.subject}
      </Text>
      <Text fontSize={'xs'} className={'flex flex-col items-start p-2'}>
        <span className='bg-secondary pl-2'>الرسالة </span>
        {mail?.msg}
      </Text>
      <div className='self-end '>
        <Button variant='outline' className=' h-8'>
          <Reply className='size-4 text-primary ' />
        </Button>
      </div>
    </div>
  )
}
