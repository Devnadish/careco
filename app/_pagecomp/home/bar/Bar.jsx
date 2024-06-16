import React, { Suspense, lazy } from 'react'
import BarButtons from './BarButtons'
import { QueryFilter } from './QueryFilter'
import { InlineSpinner } from '@/components/shared/spinner/InlineSpinner'

const FilteerType = lazy(() => import('@/app/_pagecomp/home/bar/FilteerType'))
const SortType = lazy(() => import('@/app/_pagecomp/home/bar/SortType'))

export const SortTypebtn = lazy(
  () => import('@/app/_pagecomp/home/bar/SortTypebtn')
)

const Bar = ({ count, query }) => {
  return (
    <div className=' flex h-12  w-full items-center  justify-between  bg-background/25 p-4 shadow-lg backdrop-blur-3xl md:flex-row md:justify-between'>
      {/* Icons side */}
      <BarButtons />
      <QueryFilter query={query} recordCount={count} />
    </div>
  )
}
export default Bar

// {
/* Filter info side */
// }
// {
/* <div className='flex w-full flex-wrap items-center justify-end gap-4'>
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
      </div> */
// }
