'use client'
import React, { useState } from 'react'
import DialogBox from '@/components/shared/DialogBox'
import { Button } from '@/components/ui/button'
import { Search } from 'more/lib/icons'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Submit from '@/components/shared/Submit'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { removeQuery, urlQuery } from 'more/lib/nadish'
import { Input } from '@/components/ui/input'
import Text from '@/components/shared/Text'
import { Separator } from '@/components/ui/separator'

function SearchProvider({ searchText, setSearchText }) {
  // FIXME: WHEN THE USER CLICK ON THE SEARCH LOCATION  IT SHOLD CLICKED TWICS AND IF NOT DATA SHOW SHOW MSG NOT FOUND DO SHOW SPINNER
  const [open, setOpen] = useState(false)

  const [option, setOption] = useState('nadish0')
  const pathName = usePathname()
  const router = useRouter()

  const RemoveOldSearch = () => {
    const queryString = removeQuery('search')
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.push(updatedUrl)
  }

  const handleSearch = () => {
    const queryString = urlQuery('search', searchText + option)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`

    setOpen(false)
    router.push(updatedUrl)
  }
  return (
    <>
      <Button
        variant='ghost'
        onClick={() => {
          RemoveOldSearch()
          setOpen(true)
        }}
        size='sm'
        className='min-w-48 border border-border bg-black/50 shadow-lg '
      >
        <div className='flex h-8 w-full items-center justify-end gap-3 '>
          <Text fontSize='xs' opacity={'O70'}>
            {searchText && searchText}
          </Text>
          <Separator orientation='vertical' className='bg-white/30' />
          <Search size={24} className='opacity-70' strokeWidth={1} />
        </div>
      </Button>

      <DialogBox open={open} setOpen={setOpen}>
        <form
          action={handleSearch}
          className='mx-auto flex w-[90%] flex-col items-center justify-center gap-4 '
        >
          <FormSearch searchText={searchText} setSearchText={setSearchText} />
          <WhereTOSearch option={option} setOption={setOption} />

          <Submit
            title='بحث'
            icon={<Search />}
            color={'bg-secondary'}
            isDisabled={!searchText}
          />
        </form>
      </DialogBox>
    </>
  )
}

export default SearchProvider

const FormSearch = ({ searchText, setSearchText }) => {
  const handlechange = e => {
    setSearchText(e.target.value)
  }
  return (
    <Input
      value={searchText}
      icon={<Search strokeWidth={1} />}
      placeholder='ابحث عن.. '
      onChange={handlechange}
    />
  )
}

export function WhereTOSearch({ option, setOption }) {
  return (
    <RadioGroup
      defaultValue='nadish0'
      className='mt-4 flex w-full items-center justify-evenly'
      dir='RTL'
      onValueChange={value => setOption(value)}
    >
      <div className='flex items-center gap-2 space-x-2'>
        <RadioGroupItem value='nadish0' id='Sname' />
        <Label htmlFor='r1' className='font-cairo'>
          الاسم
        </Label>
      </div>

      <div className='flex items-center gap-2 space-x-2'>
        <RadioGroupItem value='nadish1' id='Sdetail' />
        <Label htmlFor='r2' className='font-cairo'>
          الوصف
        </Label>
      </div>

      <div className='flex items-center gap-2 space-x-2'>
        <RadioGroupItem value='nadish2' id='Sdescrption' />
        <Label htmlFor='r3' className='font-cairo'>
          الشرح
        </Label>
      </div>

      {/* <div className='flex items-center gap-2 space-x-2'>
        <RadioGroupItem value='nadish3' id='Scomment' />
        <Label htmlFor='r1' className='font-cairo'>
          التعلقات
        </Label>
      </div> */}
    </RadioGroup>
  )
}
