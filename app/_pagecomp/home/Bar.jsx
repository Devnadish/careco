'use client'
import { Eye, HeartHandshake, Share2, SortIcon, X } from 'more/lib/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MessageCircleMore } from 'more/lib/icons'
import WorkshopSVG from '@/components/svg/WorkshopSVG'
import WorkShopCenterSvg from '@/components/svg/WorkShopCenterSvg'
import MechancalMan from '@/components/svg/MechancalMan'
import { removeQuery, urlQuery } from 'more/lib/nadish'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { StarFilled } from '@/components/svg/StarFilled'
import DepartmentIcon from '@/components/svg/DepartmentIcon'
import ExtraSeviceIcon from '@/components/svg/ExtraSeviceIcon'
import {
  ProviderIconType,
  ProviderType
} from '@/components/svg/ProviderIconType'
import { Separator } from '@/components/ui/separator'
import Text from '@/components/shared/Text'
import Image from 'next/image'

export const Bar = ({ departments, extraServices }) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const IsTypeParams = searchParams.has('type')

  if (pathName.startsWith('/provider/')) {
    return
  }

  return (
    <div className='fixed left-0 top-[60px] z-40 flex h-14    w-full items-center justify-between bg-blue-950 px-4 '>
      <div className='flex items-center gap-4'>
        <WrokShopType />
        <DepartmentFilter departments={departments} />
        <ExtraServiceFilter extraServices={extraServices} />

        {IsTypeParams && <ClearTypeFilter />}
      </div>
      <SortMenu />
    </div>
  )
}

const DropDownMenu = ({ options, handleChange, trigerIcon: TrigerIcon }) => (
  <DropdownMenu dir='rtl' modal={true}>
    <DropdownMenuTrigger asChild>
      <Button
        className='flex    items-center    border  border-primary  bg-transparent shadow-lg    hover:bg-secondary/80 '
        size='sm'
      >
        <TrigerIcon className='size-6 text-primary ' />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className='flex min-w-[150px]  flex-col items-center justify-between gap-1 '>
      {options.map(({ value, label, title }) => (
        <DropdownMenuItem
          key={value}
          className='flex  w-full   items-center       hover:bg-secondary'
          onClick={() => handleChange('type', value)}
        >
          <div className='flex w-full items-center gap-4 '>
            {label}
            <Text>{title}</Text>
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

const WrokShopType = () => {
  const router = useRouter()
  const pathName = usePathname()
  const handleChange = (xtype, value) => {
    const queryString = urlQuery(xtype, value)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.push(updatedUrl)
  }
  const options = [
    {
      value: 'h',
      label: <MechancalMan className='size-6 text-primary' />,
      title: 'افراد'
    },
    {
      value: 'w',
      label: <WorkshopSVG className='size-6 text-primary' />,
      title: 'ورش'
    },
    {
      value: 'c',
      label: <WorkShopCenterSvg className='size-6 text-primary' />,
      title: 'مراكز'
    }
  ]
  return (
    <DropDownMenu
      options={options}
      handleChange={handleChange}
      trigerIcon={ProviderIconType}
    />
  )
}

const DepartmentFilter = ({ departments }) => {
  const options = departments.map(({ service, value, slug, logo }) => ({
    value: slug,
    label: (
      <Image
        src={`/extraservicelogo/${logo}`}
        alt={service}
        width={24}
        height={24}
        className='size-6 object-contain'
      />
    ),
    title: service
  }))

  return (
    <DropDownMenu
      options={options}
      // handleChange={handleChange}
      trigerIcon={DepartmentIcon}
    />
  )
}

const ExtraServiceFilter = ({ extraServices }) => {
  const options = extraServices.map(({ service, value, slug, logo }) => ({
    value: slug,
    label: (
      <Image
        src={`/extraservicelogo/${logo}`}
        alt={service}
        width={24}
        height={24}
        className='size-6 object-contain'
      />
    ),
    title: service
  }))

  return (
    <DropDownMenu
      options={options}
      // handleChange={handleChange}
      trigerIcon={ExtraSeviceIcon}
    />
  )
}

export function SortMenu() {
  const router = useRouter()
  const pathName = usePathname()
  const handleChange = (xtype, value) => {
    const queryString = urlQuery(xtype, value)
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
    router.push(updatedUrl)
  }
  return (
    <DropdownMenu dir='rtl' modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className='flex size-9 w-fit items-center  gap-2 rounded  bg-white/10 px-3 py-1 text-sm hover:bg-secondary/80 lg:w-fit   '>
          <SortIcon className='text-primary' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='flex min-w-9 flex-col items-center justify-center'>
        <DropdownMenuItem
          className='flex items-center gap-4 hover:bg-secondary'
          onClick={() => handleChange('sort', 'star')}
        >
          <StarFilled className='size-6 text-yellow-400' />
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex items-center gap-4 hover:bg-secondary'
          onClick={() => handleChange('sort', 'comment')}
        >
          <MessageCircleMore className='size-6 text-green-400' />
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex items-center gap-4 hover:bg-secondary'
          onClick={() => handleChange('sort', 'share')}
        >
          <Share2 className='size-6 text-primary' />
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex items-center gap-4 hover:bg-secondary'
          onClick={() => handleChange('sort', 'viewer')}
        >
          <Eye className='size-6 text-primary text-purple-700' />
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex items-center gap-4 hover:bg-secondary'
          onClick={() => handleChange('sort', 'fav')}
        >
          <HeartHandshake className='size-6 text-red-500' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ClearTypeFilter = () => {
  const pathName = usePathname()
  const router = useRouter()

  const updateUrl = () => {
    const queryString = removeQuery('type')
    const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
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
