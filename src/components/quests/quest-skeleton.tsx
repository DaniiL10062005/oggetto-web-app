import { Card, CardContent, CardHeader } from '@/shared/components/card'
import { Skeleton } from '@/shared/components/skeleton'

export function QuestSkeleton() {
  return (
    <Card className='border-2'>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <Skeleton className='size-12 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>
          <Skeleton className='h-6 w-24 rounded-full' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-2'>
          <Skeleton className='size-5' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-6 w-12' />
          <Skeleton className='h-4 w-16' />
        </div>
      </CardContent>
    </Card>
  )
}

export function QuestListSkeleton() {
  return (
    <div className='space-y-6'>
      <section>
        <div className='mb-4 flex items-center gap-2'>
          <Skeleton className='size-8 rounded-full' />
          <Skeleton className='h-8 w-64' />
        </div>
        <QuestSkeleton />
      </section>

      <section>
        <div className='mb-4 flex items-center gap-2'>
          <Skeleton className='size-8 rounded-full' />
          <Skeleton className='h-8 w-56' />
        </div>
        <div className='grid gap-4 lg:grid-cols-2'>
          <QuestSkeleton />
          <QuestSkeleton />
        </div>
      </section>
    </div>
  )
}
