'use client'

import { Coins } from 'lucide-react'
import { useKioskStore } from '@/shared/stores/kiosk-store'

export function TotalScore() {
  const points = useKioskStore(state => state.points)

  return (
    <div className='fixed right-6 top-6 z-50 flex items-center gap-3 rounded-full border-4 border-yellow-500 bg-yellow-50 px-6 py-3 shadow-xl dark:bg-yellow-950/30'>
      <Coins className='size-8 text-yellow-600 dark:text-yellow-400' />
      <div className='text-right'>
        <p className='text-xs font-semibold uppercase tracking-wider text-yellow-700 dark:text-yellow-300'>
          Оджеттоны
        </p>
        <p className='text-2xl font-black text-yellow-900 dark:text-yellow-100'>{points}</p>
      </div>
    </div>
  )
}
