import { Skeleton } from '@/components/ui/skeleton'

function RateSkelton() {
  return (
    <div className='flex flex-col space-y-3 rounded-lg  p-6 '>
      <div className='flex w-full items-center justify-between gap-2'>
        <div className='flex w-full items-center gap-2'>
          <div className='flex w-full flex-col items-start gap-1'>
            <Skeleton className='h-8 w-[120px]' />
            <div className='flex w-full  items-start gap-4 rounded-md border border-border p-2'>
              <Skeleton className='h-9 w-1/4' />
              <Skeleton className='h-9 w-1/4' />
              <Skeleton className='h-9 w-1/4' />
              <Skeleton className='h-9 w-1/4' />
              <Skeleton className='h-9 w-1/4' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full  flex-wrap items-center justify-center gap-4  p-2'>
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
        <Skeleton className='h-[125px] w-[300px] rounded-xl' />
      </div>
    </div>
  )
}
export default RateSkelton
