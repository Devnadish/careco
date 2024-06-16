'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'
import { multiUrlQuery } from '@/more/lib/nadish'
import { usePathname, useRouter } from 'next/navigation'
import Text from '@/components/shared/Text'

import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import WorkshopSVG from '@/components/svg/WorkshopSVG'
import MechancalMan from '@/components/svg/MechancalMan'
import WorkShopCenterSvg from '@/components/svg/WorkShopCenterSvg'
import { Badge } from '@/components/ui/badge'
import { providerType } from '@/more/lib/systemlib'
import { OkIcon } from '@/components/svg/OkIcon'
import { Xicon } from '@/components/svg/Xicon'
import { getDepartmentsAndServicesFromDB } from './db'
import { InlineSpinner } from '@/components/shared/spinner/InlineSpinner'
import { handleRoute, removeRoute, useStateHook } from './barLogic'
import Spinner from '@/components/shared/spinner/Spinner'
// FIXME: when remove filter the radio button not change

function CarToSelect({ open, setOpen }) {
  const {
    providerTYPE,
    setProviderTYPE,
    department,
    setDepartment,
    service,
    setService,
    url,
    setUrl,
    data,
    setData,
    loading,
    setLoading
  } = useStateHook()
  const pathName = usePathname()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const getData = await getDepartmentsAndServicesFromDB()
      // await new Promise(resolve => setTimeout(resolve, 23000))

      setData(getData)

      setLoading(false)
    }

    fetchData()
  }, [])

  //
  return (
    <Sheet open={open} onOpenChange={setOpen} dir='rtl'>
      <SheetContent className='flex  w-[320px] flex-col  ' side='right'>
        <ScrollArea
          className='mt-3  flex h-full w-full pl-5  '
          dir='rtl'
          type='auto'
        >
          <div className='flex h-full w-full flex-col gap-5 '>
            <section className=' flex min-h-[20%] w-full  items-center  justify-center  gap-1 rounded-lg   '>
              <ProveiderType
                setProviderTYPE={setProviderTYPE}
                providerTYPE={providerTYPE}
                setUrl={setUrl}
                url={url}
              />
            </section>
            {/* departments */}
            <section className=' flex  min-h-[40%]  w-full flex-col gap-1 rounded-lg border border-foreground/25 bg-primary/10 p-1'>
              {loading ? (
                <div className='flex h-full w-full items-center justify-center '>
                  <InlineSpinner />
                </div>
              ) : (
                <Department
                  data={data?.departments}
                  setService={setDepartment}
                  setUrl={setUrl}
                  type={'department'}
                  url={url}
                />
              )}
            </section>

            {/* services */}
            <section className=' flex  h-[40%]  w-full flex-col gap-1 rounded-lg border border-foreground/25 bg-primary/10 p-1'>
              {loading ? (
                <div className='flex h-full w-full items-center justify-center '>
                  <InlineSpinner />
                </div>
              ) : (
                <Department
                  data={data?.services}
                  setService={setService}
                  setUrl={setUrl}
                  type={'service'}
                  url={url}
                />
              )}
            </section>
          </div>
        </ScrollArea>
        <SheetFooter className={'w-full p-0'}>
          <div className={'flex w-full   items-center  justify-between gap-2'}>
            <div className='flex w-full flex-wrap items-center justify-around gap-2 '>
              {providerTYPE && <Badge>{providerType(providerTYPE)}</Badge>}
              {department && <Badge>{department}</Badge>}
              {service && <Badge>{service}</Badge>}
            </div>
            {(providerTYPE || department || service) && (
              <div className='flex flex-col items-center justify-center gap-2'>
                <Button
                  className='size-7 bg-primary/50  p-0'
                  onClick={() => {
                    handleRoute(pathName, router, url, setOpen)
                  }}
                >
                  <OkIcon className='size-6' />
                </Button>
                <Button
                  onClick={() => {
                    removeRoute(
                      setUrl,
                      setProviderTYPE,
                      setDepartment,
                      setService
                    )
                  }}
                  className='size-7 bg-destructive/50 p-0'
                >
                  <Xicon className='size-6 text-destructive' />
                </Button>
              </div>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CarToSelect

const ProveiderType = ({ setProviderTYPE, providerTYPE, setUrl, url }) => {
  const handlechange = value => {
    setProviderTYPE(value)
    setUrl({ ...url, type: value })
  }

  return (
    // <div className=' flex h-full w-full    rounded-lg  p-1'>
    //   {/* <Text fontSize={'xs'} className={'rounded-t-md bg-secondary '}>
    //     مزود الخدمة
    //   </Text> */}

    <RadioGroup
      defaultValue={providerTYPE}
      className='flex w-full flex-wrap  items-center justify-between gap-1  rounded-lg '
      onValueChange={value => handlechange(value)}
    >
      <RadioComponentType
        icon={<WorkShopCenterSvg className='size-4 ' />}
        title='مراكز '
        value={'c'}
        // id={providerTYPE}
      />
      <RadioComponentType
        icon={<WorkshopSVG className='size-4 ' />}
        title='الورش'
        value={'w'}
        // id={providerTYPE}
      />
      <RadioComponentType
        icon={<MechancalMan className='size-4 ' />}
        title='الافراد'
        value={'h'}
        // id={providerTYPE}
      />
    </RadioGroup>
    // </div>
  )
}

const RadioComponent = ({ icon, title, value, id }) => {
  return (
    <Label
      htmlFor={id}
      className='flex h-7 w-full items-center justify-between  px-2  hover:bg-secondary '
    >
      {icon}
      <div className='flex  items-center gap-2 '>
        <Text fontSize={'xs'}>{title}</Text>
        <RadioGroupItem value={value} id={id} className='h-3 w-3' />
      </div>
    </Label>
  )
}
const Department = ({ data, type, setService, setUrl, url }) => {
  const handlechange = value => {
    setService(value)
    setUrl({ ...url, [type]: value })
  }
  return (
    <div className=' flex h-full w-full flex-col gap-1 rounded-lg  p-1'>
      <Text fontSize={'sm'} className={'rounded-t-md bg-secondary p-1'}>
        {type === 'department' ? 'الاقسام' : 'الخدمات'}
      </Text>
      <ScrollArea
        className='h-full  w-full rounded-md  px-3'
        dir='rtl'
        type='auto'
      >
        <RadioGroup
          defaultValue='comfortable'
          className='flex w-full flex-col gap-1 rounded-lg  '
          onValueChange={value => handlechange(value)}
        >
          {data?.map(({ service, image, id, slug }) => (
            <RadioComponent
              icon={
                <Image
                  src={`/extraservicelogo/${image}`}
                  alt={service}
                  width={24}
                  height={24}
                  className='size-4 object-contain'
                />
              }
              title={service}
              key={id}
              value={slug}
              url={slug}
            />
          ))}
        </RadioGroup>
      </ScrollArea>
    </div>
  )
}

const RadioComponentType = ({ icon, title, value, id }) => {
  return (
    <Label
      htmlFor={id}
      className='flex  flex-col items-center justify-center  gap-2 rounded-md  border  border-foreground/25 p-2 text-muted-foreground hover:bg-secondary '
    >
      {icon}
      <div className='flex  items-center gap-2 '>
        <Text fontSize={'xs'}>{title}</Text>
        <RadioGroupItem value={value} id={id} className='h-3 w-3' />
      </div>
    </Label>
  )
}
