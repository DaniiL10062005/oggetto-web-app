'use client'

import { CameraFeed } from '@/components/waste-sorting/camera-feed'
import { InstructionView } from '@/components/waste-sorting/instruction-view'
import { SuccessView } from '@/components/waste-sorting/success-view'
import { TotalScore } from '@/components/waste-sorting/total-score'

import { useKioskStore } from '@/shared/stores/kiosk-store'

export default function KioskPage() {
  const { currentStep, selectedItem } = useKioskStore()

  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <TotalScore />

      <div className='flex flex-1 flex-col items-center justify-center overflow-hidden px-8 py-6'>
        {(currentStep === 'idle' || currentStep === 'scanning') && (
          <div className='flex h-full w-full max-w-6xl flex-col items-center justify-center gap-8'>
            <div className='text-center'>
              <h1 className='text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
                Что вы хотите выбросить?
              </h1>
              <p className='mt-4 text-2xl text-gray-600 dark:text-gray-400'>
                Поднесите предмет к камере для сканирования
              </p>
            </div>

            <div className='w-full flex-1 max-w-5xl'>
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
