'use client'

import { Coins } from 'lucide-react'

import { usePointBalance } from '@/shared/hooks/use-point-balance'
import { cn } from '@/shared/utils/class-names'

interface BalanceWidgetProps {
  className?: string
}

export function BalanceWidget({ className }: BalanceWidgetProps) {
  const { data: point, isLoading, error } = usePointBalance()

  if (error) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-600',
          className,
        )}
      >
        <Coins className='h-5 w-5' />
        <span className='text-sm font-medium'>Ошибка загрузки баланса</span>
      </div>
    )
  }

  if (isLoading || !point) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2',
          className,
        )}
      >
        <Coins className='h-5 w-5 animate-pulse text-gray-400' />
        <span className='text-sm font-medium text-gray-400'>Загрузка...</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 shadow-sm',
        className,
      )}
    >
      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100'>
        <Coins className='h-5 w-5 text-green-600' />
      </div>
      <div className='flex flex-col'>
        <span className='text-xs font-medium text-gray-500'>Баланс</span>
        <span className='text-lg font-bold text-green-700'>{point.balance}</span>
      </div>
    </div>
  )
}
