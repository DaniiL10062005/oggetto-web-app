'use client'

import { Medal, Trophy } from 'lucide-react'
import Link from 'next/link'

import { BalanceWidget } from '@/components/waste-sorting/balance-widget'
import { CameraFeed } from '@/components/waste-sorting/camera-feed'
import { InstructionView } from '@/components/waste-sorting/instruction-view'
import { SuccessView } from '@/components/waste-sorting/success-view'

import { useKioskStore } from '@/shared/stores/kiosk-store'

export default function KioskPage() {
  const { currentStep, selectedItem } = useKioskStore()

  return (
    <div className='flex min-h-screen w-full flex-col overflow-y-auto lg:h-screen lg:overflow-hidden'>
      <BalanceWidget />

      <Link
        href='/quests'
        className='fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-blue-600 px-4 py-3 shadow-xl transition-all hover:scale-105 hover:shadow-2xl lg:gap-3 lg:px-6 lg:py-4'
      >
        <Trophy className='size-5 text-white lg:size-6' />
        <span className='text-sm font-bold text-white lg:text-base'>Квесты</span>
      </Link>

      <Link
        href='/leaderboard'
        className='fixed bottom-6 left-48 z-50 flex items-center gap-2 rounded-full bg-linear-to-r from-yellow-500 to-green-500 px-4 py-3 shadow-xl transition-all hover:scale-105 hover:shadow-2xl lg:gap-3 lg:px-6 lg:py-4'
      >
        <Medal className='size-5 text-white lg:size-6' />
        <span className='text-sm font-bold text-white lg:text-base'>Лидеры</span>
      </Link>

      <div className='flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-4 lg:overflow-hidden lg:px-8 lg:py-6'>
        {(currentStep === 'idle' || currentStep === 'scanning') && (
          <div className='flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4 lg:gap-8'>
            <div className='text-center'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 lg:text-6xl'>
                Что вы хотите выбросить?
              </h1>
              <p className='mt-2 text-base text-gray-600 lg:mt-4 lg:text-2xl'>
                Поднесите предмет к камере для сканирования
              </p>
            </div>

            <div className='w-full max-w-5xl flex-1'>
              <CameraFeed />
            </div>
          </div>
        )}

        {currentStep === 'instruction' && selectedItem && (
          <InstructionView item={selectedItem} />
        )}

        {currentStep === 'success' && <SuccessView />}
      </div>
    </div>
  )
}
