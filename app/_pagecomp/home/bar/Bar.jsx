'use client'
import React, { useState, Suspense, lazy } from 'react'
import { usePathname } from 'next/navigation'

const LogoSpinnerInline = lazy(
  () => import('@/components/shared/LogoSpinnerInline')
)
const FilteerType = lazy(() => import('@/app/_pagecomp/home/bar/FilteerType'))
const SortType = lazy(() => import('@/app/_pagecomp/home/bar/SortType'))
const SearchBtn = lazy(() => import('@/app/_pagecomp/home/bar/SearchBtn'))
const SortBtn = lazy(() => import('@/app/_pagecomp/home/bar/SortBtn'))
const FliterBtn = lazy(() => import('@/app/_pagecomp/home/bar/FliterBtn'))
export const SortTypebtn = lazy(
  () => import('@/app/_pagecomp/home/bar/SortTypebtn')
)

const Bar = ({ departments, extraServices }) => {
  const pathname = usePathname()
  const [openSearch, setOpenSearch] = useState(false)
  const [filterType, setFilterType] = useState('c')
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedExtraService, setSelectedExtraService] = useState(null)
  const [isAscending, setIsAscending] = useState(false)
  const [sortBy, setSortBy] = useState(null)

  if (pathname.startsWith('/provider/')) {
    return null
  }

  return (
    <div className='sticky top-[50px] z-30 flex w-full flex-col items-center justify-center gap-4 bg-background/25 p-4 shadow-lg backdrop-blur-3xl md:flex-row md:justify-between'>
      {/* Icons side */}
      <div className='flex w-full flex-wrap items-center justify-start gap-4'>
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
      </div>
      {/* Filter info side */}
      <div className='flex w-full flex-wrap items-center justify-end gap-4'>
        {filterType || selectedDepartment || selectedExtraService ? (
          <FilteerType
            filterType={filterType}
            selectedDepartment={selectedDepartment}
            selectedExtraService={selectedExtraService}
          />
        ) : null}
        <SortType
          isAscending={isAscending}
          setIsAscending={setIsAscending}
          sortBy={sortBy}
        />
      </div>
    </div>
  )
}
export default Bar
