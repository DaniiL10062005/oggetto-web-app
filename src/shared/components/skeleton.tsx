import { cn } from '../utils/class-names'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-gray-200/70', className)} {...props} />
  )
}
