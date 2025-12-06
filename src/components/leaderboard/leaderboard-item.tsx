'use client'

import { Coins, Trophy } from 'lucide-react'

import type { LeaderboardItem as LeaderboardItemType } from '@/shared/api/types'

interface LeaderboardItemProps {
  item: LeaderboardItemType
}

export function LeaderboardItem({ item }: LeaderboardItemProps) {
  const { rank, name, coins } = item

  // Top 3 - Hero Treatment
  if (rank === 1) {
    return (
      <div className='bg-brand-yellow overflow-hidden rounded-xl border-2 border-brand-yellow p-5 shadow-xl transition-all hover:shadow-2xl lg:p-6'>
        <div className='flex items-center gap-4 lg:gap-6'>
          <div className='bg-brand-black flex size-16 shrink-0 items-center justify-center rounded-full shadow-lg lg:size-20'>
            <Trophy className='text-brand-yellow size-8 lg:size-10' />
          </div>

          <div className='flex-1'>
            <div className='mb-1 flex items-center gap-2'>
              <span className='text-brand-black text-xs font-bold uppercase tracking-wider lg:text-sm'>
                🥇 Первое место
              </span>
            </div>
            <p className='text-brand-black text-xl font-black lg:text-2xl'>{name}</p>
          </div>

          <div className='bg-brand-black flex items-center gap-2 rounded-full px-5 py-3 shadow-lg lg:gap-3 lg:px-6 lg:py-4'>
            <Coins className='text-brand-yellow size-6 lg:size-7' />
            <div className='flex flex-col items-end'>
              <span className='text-brand-yellow text-2xl font-black leading-none lg:text-3xl'>
                {coins}
              </span>
              <span className='text-xs text-zinc-400 lg:text-sm'>коинов</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (rank === 2) {
    return (
      <div className='overflow-hidden rounded-xl border-2 border-gray-300 bg-gradient-to-r from-gray-50 to-white p-4 shadow-lg transition-all hover:shadow-xl lg:p-5'>
        <div className='flex items-center gap-4 lg:gap-5'>
          <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-gray-200 shadow-md lg:size-16'>
            <Trophy className='size-7 text-gray-500 lg:size-8' />
          </div>

          <div className='flex-1'>
            <div className='mb-1 flex items-center gap-2'>
              <span className='text-xs font-bold uppercase tracking-wider text-gray-600 lg:text-sm'>
                🥈 Второе место
              </span>
            </div>
            <p className='text-brand-black text-lg font-bold lg:text-xl'>{name}</p>
          </div>

          <div className='flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 shadow-sm lg:gap-3 lg:px-5 lg:py-3'>
            <Coins className='text-brand-yellow size-5 lg:size-6' />
            <div className='flex flex-col items-end'>
              <span className='text-brand-black text-xl font-black leading-none lg:text-2xl'>
                {coins}
              </span>
              <span className='text-xs text-gray-600'>коинов</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (rank === 3) {
    return (
      <div className='overflow-hidden rounded-xl border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-white p-4 shadow-lg transition-all hover:shadow-xl lg:p-5'>
        <div className='flex items-center gap-4 lg:gap-5'>
          <div className='flex size-14 shrink-0 items-center justify-center rounded-full bg-orange-200 shadow-md lg:size-16'>
            <Trophy className='size-7 text-orange-600 lg:size-8' />
          </div>

          <div className='flex-1'>
            <div className='mb-1 flex items-center gap-2'>
              <span className='text-xs font-bold uppercase tracking-wider text-orange-600 lg:text-sm'>
                🥉 Третье место
              </span>
            </div>
            <p className='text-brand-black text-lg font-bold lg:text-xl'>{name}</p>
          </div>

          <div className='flex items-center gap-2 rounded-full border border-orange-300 bg-white px-4 py-2.5 shadow-sm lg:gap-3 lg:px-5 lg:py-3'>
            <Coins className='text-brand-yellow size-5 lg:size-6' />
            <div className='flex flex-col items-end'>
              <span className='text-brand-black text-xl font-black leading-none lg:text-2xl'>
                {coins}
              </span>
              <span className='text-xs text-gray-600'>коинов</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Regular Items (4+) - Clean Light Cards
  return (
    <div className='flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md lg:gap-5 lg:p-5'>
      <div className='flex w-14 shrink-0 items-center justify-center lg:w-16'>
        <span className='text-brand-black text-2xl font-black lg:text-3xl'>#{rank}</span>
      </div>

      <div className='flex-1'>
        <p className='text-brand-black text-base font-semibold lg:text-lg'>{name}</p>
      </div>

      <div className='flex items-center gap-2 lg:gap-2.5'>
        <Coins className='text-brand-yellow size-5 lg:size-6' />
        <div className='flex flex-col items-end'>
          <span className='text-brand-black text-lg font-bold leading-none lg:text-xl'>
            {coins}
          </span>
          <span className='text-xs text-gray-500'>коинов</span>
        </div>
      </div>
    </div>
  )
}
