'use client'

import { Medal } from 'lucide-react'

import type { LeaderboardItem as LeaderboardItemType } from '@/shared/api/types'
import { cn } from '@/shared/utils/class-names'

interface LeaderboardItemProps {
  item: LeaderboardItemType
}

export function LeaderboardItem({ item }: LeaderboardItemProps) {
  const { rank, name, coins } = item

  const isTopThree = rank <= 3

  const getRankStyle = () => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-gradient-to-r from-yellow-100 to-yellow-50',
          border: 'border-yellow-400',
          medalColor: 'text-yellow-500',
          rankText: 'text-yellow-600',
        }
      case 2:
        return {
          bg: 'bg-gradient-to-r from-gray-100 to-gray-50',
          border: 'border-gray-400',
          medalColor: 'text-gray-400',
          rankText: 'text-gray-600',
        }
      case 3:
        return {
          bg: 'bg-gradient-to-r from-orange-100 to-orange-50',
          border: 'border-orange-400',
          medalColor: 'text-orange-600',
          rankText: 'text-orange-600',
        }
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          medalColor: '',
          rankText: 'text-gray-700',
        }
    }
  }

  const style = getRankStyle()

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg border-2 p-4 transition-all',
        style.bg,
        style.border,
        isTopThree && 'shadow-md',
      )}
    >
      <div className='flex w-16 items-center justify-center'>
        {isTopThree ? (
          <Medal className={cn('h-8 w-8', style.medalColor)} />
        ) : (
          <span className={cn('text-2xl font-bold', style.rankText)}>#{rank}</span>
        )}
      </div>

      <div className='flex-1'>
        <p className={cn('text-lg font-semibold', isTopThree && 'text-xl')}>{name}</p>
      </div>

      <div className='flex items-center gap-2'>
        <span className='text-2xl font-bold text-green-600'>{coins}</span>
        <span className='text-sm text-gray-500'>коинов</span>
      </div>
    </div>
  )
}
