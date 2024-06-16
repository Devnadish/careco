import { Skeleton } from '@/components/ui/skeleton'

function CardSkelton() {
  return (
    <div className='flex flex-col space-y-3 rounded-lg border border-red-500 p-6'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Skeleton className='size-12 rounded-full' />
          <div className='flex flex-col items-start gap-1'>
            <Skeleton className='h-4 w-[220px]' />
            <Skeleton className='h-4 w-[160px]' />
          </div>
        </div>
      </div>
      <Skeleton className='h-[225px] w-[300px] rounded-xl' />

      <div className='flex items-center justify-between gap-4'>
        <Skeleton className='h-8 w-[40px] rounded-md' />
        <Skeleton className='h-8 w-[40px] rounded-md' />
        <Skeleton className='h-8 w-[40px] rounded-md' />
        <Skeleton className='h-8 w-[40px] rounded-md' />
      </div>
    </div>
  )
}
export default CardSkelton
