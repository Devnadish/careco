import { getProviderList } from '@/app/_pagecomp/provider/db/providerList'
import Bar from './_pagecomp/home/bar/Bar'
import Loadmore from './_pagecomp/home/Loadmore'
import ProviderCard from './_pagecomp/home/ProviderCard'
import { Suspense } from 'react'
import LogoSpinnerInline from '@/components/shared/spinner/LogoSpinnerInline'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }) {
  const query = searchParams || ''

  return (
    <>
      <Suspense fallback={<LogoSpinnerInline />}>
        <MainPage query={query} />
      </Suspense>
    </>
  )
}

const MainPage = async ({ query }) => {
  const { providers, pageCount, totalProvidersCount } = await getProviderList(
    1,
    query
  )
  return (
    <main className='relative  flex  w-full  flex-col items-center justify-center gap-2 rounded-lg    '>
      <div className='sticky top-[50px] z-30   mt-[50px]   w-full    overflow-hidden rounded-lg border border-foreground/25  '>
        <Bar query={query} count={totalProvidersCount} />
      </div>
      <div className='  mb-[50px] grid w-full  grid-cols-1 place-items-center gap-4   p-4 md:grid-cols-2 lg:grid-cols-3'>
        {providers.map(provider => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
      {/* <Loadmore query={query} pageCount={pageCount} /> */}
    </main>
  )
}
