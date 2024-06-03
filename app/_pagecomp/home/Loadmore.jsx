'use client'
import { useEffect, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { getProviderList } from '@/app/_pagecomp/provider/db/providerList'
import { usePathname, useSearchParams } from 'next/navigation'
import ProviderCard from './ProviderCard'
import { Nodata } from './Nodata'
import { SubSpinner } from '@/components/shared/Spinner'
export const dynamic = 'force-dynamic'

const LoadMore = ({ query, pageCount }) => {
  const [providers, setProviders] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const { ref, inView } = useInView({
    // threshold: 0,
    // rootMargin: '0px 0px 10% 0px' // Adjusted to work with 90vh
  })
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const fetchNextPage = useCallback(async () => {
    if (pageIndex < pageCount) {
      const nextPage = pageIndex + 1
      const { providers: nextProviders } = await getProviderList(
        nextPage,
        query
      )
      setProviders(prevProviders => [...prevProviders, ...nextProviders])
      setPageIndex(nextPage)
    }
  }, [pageIndex, pageCount, query])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    setProviders([])
    setPageIndex(1)
  }, [pathname, searchParams])

  return (
    <>
      <div className='grid w-full   grid-cols-1  justify-items-center gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {providers.map(provider => (
          <ProviderCard key={provider.id} providerInfo={provider} />
        ))}
      </div>
      <div className=' flex items-center justify-center' ref={ref}>
        {pageCount > 1 && <SubSpinner />}
        {!pageCount && <Nodata carName={query.vechile} />}
      </div>
    </>
  )
}

export default LoadMore

export const SubSpinner1 = () => {
  return (
    <div className='fixed top-0 z-50 size-6 animate-spin rounded-full border-b-2 border-t-2 border-blue-600' />
  )
}
