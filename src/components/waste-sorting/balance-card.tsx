'use client'

import { Coins } from 'lucide-react'

import { NumberTicker } from '@/shared/components/number-ticker'

interface BalanceCardProps {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className='flex items-center gap-3 rounded-full border-4 border-yellow-500 bg-yellow-50 px-6 py-3 shadow-xl'>
      <Coins className='size-8 text-yellow-600' />
      <div className='text-right'>
        <p className='text-xs font-semibold tracking-wider text-yellow-700 uppercase'>
          Оджеттоны
        </p>
        <NumberTicker value={balance} className='text-3xl font-black text-yellow-900' />
      </div>
    </div>
  )
}
