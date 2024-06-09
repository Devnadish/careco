'use client'
import { FilterIcon } from '@/components/svg/FilterIcon'
import MechancalMan from '@/components/svg/MechancalMan'
import { ShowAllIcon } from '@/components/svg/ShowAllIcon'
import WorkShopCenterSvg from '@/components/svg/WorkShopCenterSvg'
import WorkshopSVG from '@/components/svg/WorkshopSVG'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

export function FliterBtn({
  departments,
  extraServices,
  selectType,
  setSelectType,
  selectDepartment,
  setSelectDepartment,
  selectExtraService,
  setSelectExtraService
}) {
  return (
    <DropdownMenu dir='rtl'>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className=' rounded-full border   border-foreground/25 p-0    text-foreground/70 shadow-lg '
        >
          <FilterIcon className='size-6 opacity-85' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <OnTypeFilter selectType={selectType} setSelectType={setSelectType} />

        <OnDepratment
          departments={departments}
          selectDepartment={selectDepartment}
          setSelectDepartment={setSelectDepartment}
        />
        <OnExtraService
          extraServices={extraServices}
          selectExtraService={selectExtraService}
          setSelectExtraService={setSelectExtraService}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FliterBtn

const OnTypeFilter = ({ selectType, setSelectType }) => {
  return (
    <DropdownMenuRadioGroup value={selectType} onValueChange={setSelectType}>
      {/* <DropdownMenuGroup> */}

      <DropdownMenuRadioItem
        value={''}
        className='flex items-center gap-4 font-noto text-muted-foreground'
      >
        <ShowAllIcon className='size-4 ' />
        عرض الكل
      </DropdownMenuRadioItem>

      <DropdownMenuRadioItem
        value={'c'}
        className='flex items-center gap-4 font-noto text-muted-foreground'
      >
        <WorkShopCenterSvg className='size-4 ' />
        مراكز الصيانة
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem
        value={'w'}
        className='flex items-center gap-4 text-muted-foreground'
      >
        <WorkshopSVG className='size-4 ' />
        الورش
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem
        className='flex items-center gap-4 text-muted-foreground'
        value={'h'}
      >
        <MechancalMan className='size-4 ' />
        الافراد
      </DropdownMenuRadioItem>
      <DropdownMenuSeparator />
      {/* </DropdownMenuGroup> */}
    </DropdownMenuRadioGroup>
  )
}
const OnDepratment = ({
  departments,
  selectDepartment,
  setSelectDepartment
}) => {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='flex w-full items-center justify-between  '>
            الاقسام
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={selectDepartment}
                onValueChange={setSelectDepartment}
              >
                {departments.map(({ service, value, slug, logo }) => (
                  <DropdownMenuRadioItem
                    key={value}
                    value={service}
                    className='flex items-center gap-4'
                  >
                    <Image
                      src={`/extraservicelogo/${logo}`}
                      alt={service}
                      width={24}
                      height={24}
                      className='size-6 object-contain'
                    />
                    <span className='ml-2'>{service}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  )
}
const OnExtraService = ({
  extraServices,
  selectExtraService,
  setSelectExtraService
}) => {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>الخدمات الاضافية</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={selectExtraService}
                onValueChange={setSelectExtraService}
              >
                {extraServices.map(({ service, value, slug, logo }) => (
                  <DropdownMenuRadioItem
                    key={value}
                    value={service}
                    className='flex items-center gap-4'
                  >
                    <Image
                      src={`/extraservicelogo/${logo}`}
                      alt={service}
                      width={24}
                      height={24}
                      className='size-4 object-contain'
                    />
                    <span className='ml-2'>{service}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
    </>
  )
}
