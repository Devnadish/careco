import { cn } from '@/more/lib/utils'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
