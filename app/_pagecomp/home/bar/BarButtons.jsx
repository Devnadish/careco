'use client'
import { Button } from '@/components/ui/button'
import React, { useState, Suspense, lazy } from 'react'
import { FilterIcon } from '@/components/svg/FilterIcon'
import { Search } from '@/more/lib/icons'
import { InlineSpinner } from '@/components/shared/spinner/InlineSpinner'

const SortBtn = lazy(() => import('@/app/_pagecomp/home/bar/SortBtn'))
const FilterMenu = lazy(() => import('./FilterMenu'))

function BarButtons() {
  const [openFilter, setFilterMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  const getDepartmentsAndServices = async () => {
    setFilterMenu(true)
  }

  return (
    <>
      <div className='flex w-full  items-center justify-start gap-4'>
        <Button
          variant='ghost'
          onClick={() => {
            setOpenSearch(true)
          }}
          size='icon'
          className=' rounded-full border border-foreground/25  p-0 text-foreground/70 shadow-lg '
        >
          <Search className='size-6 ' strokeWidth={1} />
        </Button>
        <div className='flex items-center justify-center'>
          <Suspense fallback={<InlineSpinner />}>
            <Button
              variant='ghost'
              size='icon'
              className=' rounded-full border   border-foreground/25 p-0    text-foreground/70 shadow-lg '
              onClick={() => getDepartmentsAndServices()}
            >
              <FilterIcon className='size-6 opacity-85' />
            </Button>

            {openFilter && (
              <FilterMenu open={openFilter} setOpen={setFilterMenu} />
            )}
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default BarButtons

/* <div className='flex w-full flex-wrap items-center justify-start gap-4'>
        <Suspense fallback={<LogoSpinnerInline />}>
          <SearchBtn openSearch={openSearch} setOpenSearch={setOpenSearch} />
        </Suspense>

        <Suspense fallback={<LogoSpinnerInline />}>
          <FliterBtn
            departments={departments}
            extraServices={extraServices}
            filterType={filterType}
            setFilterType={setFilterType}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedExtraService={selectedExtraService}
            setSelectedExtraService={setSelectedExtraService}
          />
        </Suspense>

        <Suspense fallback={<LogoSpinnerInline />}>
          <SortBtn sortBy={sortBy} setSortBy={setSortBy} />
        </Suspense>
      </div> */
