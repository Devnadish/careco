import { Skeleton } from '@/components/ui/skeleton'

function SingleProviderSkelton() {
  return (
    <div className='flex h-full w-full flex-col space-y-3 rounded-lg border border-border p-6'>
      <Skeleton className='h-72 w-full rounded-xl' />
      <Skeleton className='h-72 w-full rounded-xl' />
      <Skeleton className='h-72 w-full rounded-xl' />
      <Skeleton className='h-72 w-full rounded-xl' />
    </div>
  )
}

export default SingleProviderSkelton
