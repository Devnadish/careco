import { getProviderList } from '@/app/_pagecomp/provider/db/providerList'
import { Bar } from './_pagecomp/home/Bar'
import Loadmore from './_pagecomp/home/Loadmore'
import ProviderCard from './_pagecomp/home/ProviderCard'
import Text from '@/components/shared/Text'
import { providerType } from '@/lib/provider'
import { Fragment } from 'react'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }) {
  const query = searchParams || ''

  const { providers, pageCount, totalProvidersCount } = await getProviderList(
    1,
    query
  )

  return (
    <main className='  mt-[80px]   flex  w-full  flex-col items-center justify-center rounded-lg    '>
      {query.vechile && (
        <SearchData
          vechile={query.vechile}
          type={query.type}
          totalProvidersCount={totalProvidersCount}
        />
      )}

      <Bar query={query} providersLength={totalProvidersCount} />

      <div className='grid w-full   grid-cols-1  justify-items-center gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {providers.map(provider => (
          <ProviderCard key={provider.id} providerInfo={provider} />
        ))}
      </div>
      <Loadmore query={query} pageCount={pageCount} />
    </main>
  )
}

function SearchData(props) {
  return (
    <div className='flex w-full items-center justify-start   '>
      <Text className={'border-b-2 border-primary '}>
        <span className=' border-b-4 border-primary px-3 text-primary'>
          {props.totalProvidersCount}
        </span>
        <span className=' px-3 '>{providerType(props.type)} مختص لل</span>

        <span className='border-b-4 border-primary px-3 text-primary'>
          {props.vechile}
        </span>
      </Text>
    </div>
  )
}
