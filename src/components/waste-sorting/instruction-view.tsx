'use client'

import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/button'
import type { WasteItem } from '@/shared/config/waste-data'
import { useKioskStore } from '@/shared/stores/kiosk-store'
import { cn } from '@/shared/utils/class-names'

interface InstructionViewProps {
  item: WasteItem
}

const binColorConfig = {
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-950/30',
    border: 'border-yellow-500',
    text: 'text-yellow-900 dark:text-yellow-100',
    button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-950/30',
    border: 'border-blue-500',
    text: 'text-blue-900 dark:text-blue-100',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-950/30',
    border: 'border-green-500',
    text: 'text-green-900 dark:text-green-100',
    button: 'bg-green-600 hover:bg-green-700 text-white',
  },
  gray: {
    bg: 'bg-gray-100 dark:bg-gray-950/30',
    border: 'border-gray-500',
    text: 'text-gray-900 dark:text-gray-100',
    button: 'bg-gray-600 hover:bg-gray-700 text-white',
  },
}

export function InstructionView({ item }: InstructionViewProps) {
  const { completeDisposal, reset } = useKioskStore()
  const colorConfig = binColorConfig[item.binColor]

  return (
    <div className='space-y-8'>
      {/* Bin Color Indicator */}
      <div
        className={cn(
          'rounded-3xl border-8 p-12 text-center',
          colorConfig.bg,
          colorConfig.border,
        )}
      >
        {/* Bin Label Header */}
        <div className={cn('mb-8', colorConfig.text)}>
          <p className='text-2xl font-semibold uppercase tracking-wider'>
            {item.binLabel} Bin
          </p>
          <h1 className='mt-2 text-7xl font-black uppercase tracking-tight'>
            {item.binColor} BIN
          </h1>
        </div>

        {/* Item Name */}
        <div className='mb-8'>
          <p className='text-3xl font-bold text-gray-900 dark:text-gray-50'>
            {item.label}
          </p>
        </div>

        {/* Instruction */}
        <div className='mx-auto max-w-2xl rounded-2xl bg-white/80 p-8 shadow-lg dark:bg-gray-900/80'>
          <Trash2 className='mx-auto mb-4 size-16 text-gray-700 dark:text-gray-300' />
          <p className='text-2xl font-semibold leading-relaxed text-gray-800 dark:text-gray-200'>
            {item.instruction}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
        <Button
          variant='outline'
          size='lg'
          onClick={reset}
          className='h-16 gap-3 text-xl font-semibold'
        >
          <ArrowLeft className='size-6' />
          Back
        </Button>
        <Button
          size='lg'
          onClick={completeDisposal}
          className={cn('h-16 gap-3 text-xl font-semibold', colorConfig.button)}
        >
          <Trash2 className='size-6' />
          Thrown Away
        </Button>
      </div>
    </div>
  )
}
