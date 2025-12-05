'use client'

import { Coins } from 'lucide-react'

import { useKioskStore } from '@/shared/stores/kiosk-store'

export function TotalScore() {
  const points = useKioskStore(state => state.points)

  return (
    <div className='fixed top-6 right-6 z-50 flex items-center gap-3 rounded-full border-4 border-yellow-500 bg-yellow-50 px-6 py-3 shadow-xl'>
      <Coins className='size-8 text-yellow-600' />
      <div className='text-right'>
        <p className='text-xs font-semibold tracking-wider text-yellow-700 uppercase'>
          Оджеттоны
        </p>
        <p className='text-2xl font-black text-yellow-900'>{points}</p>
      </div>
    </div>
  )
}
