'use client'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { providerType } from '@/more/lib/systemlib'
import { UnSlug, removeQuery } from '@/more/lib/nadish'
import { FilterIcon } from '@/components/svg/FilterIcon'
import { Xicon } from '@/components/svg/Xicon'
import { usePathname, useRouter } from 'next/navigation'
// TODO: SHOW PAGE NO YOU HAVE TO CHANGE THE LOADMORE TO READ PAGE O FROM URL
export const QueryFilter = ({ query, recordCount }) => {
  const pathName = usePathname()
  const router = useRouter()

  const { type = '', department = '', service = '' } = query || {}
  const handleRemoveQuery = key => {
    const queryString = removeQuery(key)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.replace(updatedUrl, { scroll: true })
  }

  return (
    <div className='flex w-full flex-wrap items-center justify-end gap-1'>
      <FilterIcon />
      {type && (
        <Badge
          className={'flex cursor-pointer items-center gap-2'}
          onClick={() => {
            handleRemoveQuery('type')
          }}
        >
          {providerType(type)}
          <Xicon />
        </Badge>
      )}
      {department && (
        <Badge
          className={'flex cursor-pointer items-center gap-2'}
          onClick={() => {
            handleRemoveQuery('department')
          }}
        >
          {UnSlug(department)} <Xicon />
        </Badge>
      )}
      {service && (
        <Badge
          className={'flex cursor-pointer items-center gap-2'}
          onClick={() => {
            handleRemoveQuery('service')
          }}
        >
          {UnSlug(service)}
          <Xicon />
        </Badge>
      )}
      <Badge variant={'outline'}>{recordCount}</Badge>
    </div>
  )
}
