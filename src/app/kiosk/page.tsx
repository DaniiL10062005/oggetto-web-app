'use client'

import { CameraFeed } from '@/components/waste-sorting/camera-feed'
import { InstructionView } from '@/components/waste-sorting/instruction-view'
import { SuccessView } from '@/components/waste-sorting/success-view'
import { TotalScore } from '@/components/waste-sorting/total-score'
import { WasteSelector } from '@/components/waste-sorting/waste-selector'
import { useKioskStore } from '@/shared/stores/kiosk-store'

export default function KioskPage() {
  const { currentStep, selectedItem } = useKioskStore()

  return (
    <>
      {/* Persistent Score Badge */}
      <TotalScore />

      <div className='space-y-8'>
        {/* Smart Waste Mirror Layout - Idle/Scanning State */}
        {(currentStep === 'idle' || currentStep === 'scanning') && (
          <>
            {/* Header Section */}
            <div className='text-center'>
              <h1 className='text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl'>
                What are you throwing away?
              </h1>
              <p className='mt-4 text-xl text-gray-600 dark:text-gray-400'>
                Scan your item or select manually below
              </p>
            </div>

            {/* Camera Feed - Top Half */}
            <div className='mx-auto w-full max-w-4xl'>
              <CameraFeed />
            </div>

            {/* Manual Selection Divider */}
            <div className='relative py-4'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t-2 border-gray-300 dark:border-gray-700' />
              </div>
              <div className='relative flex justify-center'>
                <span className='bg-neutral-50 px-6 text-lg font-semibold text-gray-600 dark:bg-gray-900 dark:text-gray-400'>
                  Or select manually
                </span>
              </div>
            </div>

            {/* Waste Selector - Bottom Half */}
            <WasteSelector />
          </>
        )}

        {/* Instruction View */}
        {currentStep === 'instruction' && selectedItem && (
          <InstructionView item={selectedItem} />
        )}

        {/* Success View */}
        {currentStep === 'success' && <SuccessView />}
      </div>
    </>
  )
}
