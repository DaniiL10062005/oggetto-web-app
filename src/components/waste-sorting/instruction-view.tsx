'use client'

import { ArrowLeft, Edit3, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { WasteSelector } from '@/components/waste-sorting/waste-selector'
import { Button } from '@/shared/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog'
import type { WasteItem } from '@/shared/mock/waste-data'
import { useKioskStore } from '@/shared/stores/kiosk-store'
import { cn } from '@/shared/utils/class-names'

interface InstructionViewProps {
  item: WasteItem
}

const BIN_COLOR_CONFIG = {
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const colorConfig = BIN_COLOR_CONFIG[item.binColor]

  return (
    <div className='flex h-full w-full max-w-6xl flex-col justify-center gap-6'>
      <div
        className={cn(
          'rounded-3xl border-8 p-10 text-center',
          colorConfig.bg,
          colorConfig.border,
        )}
      >
        <div className={cn('mb-6', colorConfig.text)}>
          <p className='text-xl font-semibold tracking-wider uppercase'>
            Контейнер: {item.binLabel}
          </p>
          <h1 className='mt-2 text-6xl font-black tracking-tight uppercase'>
            {item.binColor === 'yellow'
              ? 'ЖЕЛТЫЙ'
              : item.binColor === 'blue'
                ? 'СИНИЙ'
                : item.binColor === 'green'
                  ? 'ЗЕЛЕНЫЙ'
                  : 'СЕРЫЙ'}{' '}
            КОНТЕЙНЕР
          </h1>
        </div>

        <div className='mb-6'>
          <p className='text-3xl font-bold text-gray-900 dark:text-gray-50'>{item.label}</p>
        </div>

        <div className='mx-auto max-w-2xl rounded-2xl bg-white/80 p-6 shadow-lg dark:bg-gray-900/80'>
          <Trash2 className='mx-auto mb-3 size-14 text-gray-700 dark:text-gray-300' />
          <p className='text-xl font-semibold leading-relaxed text-gray-800 dark:text-gray-200'>
            {item.instruction}
          </p>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-4'>
        <Button
          variant='outline'
          size='lg'
          onClick={reset}
          className='h-14 gap-3 text-lg font-semibold'
        >
          <ArrowLeft className='size-5' />
          Назад
        </Button>
        <Button
          variant='outline'
          size='lg'
          onClick={() => setIsDialogOpen(true)}
          className='h-14 gap-3 text-lg font-semibold'
        >
          <Edit3 className='size-5' />
          Не то, что я отсканировал?
        </Button>
        <Button
          size='lg'
          onClick={completeDisposal}
          className={cn('h-14 gap-3 text-lg font-semibold', colorConfig.button)}
        >
          <Trash2 className='size-5' />
          Выбросил(а)
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-h-[80vh] max-w-4xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Выберите предмет вручную</DialogTitle>
            <DialogDescription className='text-base'>
              Нажмите на нужный предмет для правильной сортировки отходов
            </DialogDescription>
          </DialogHeader>
          <div className='mt-4'>
            <WasteSelector onSelect={() => setIsDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
