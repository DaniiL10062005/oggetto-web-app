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
    bg: 'bg-yellow-100',
    border: 'border-yellow-500',
    text: 'text-yellow-900',
    button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  },
  blue: {
    bg: 'bg-blue-100',
    border: 'border-blue-500',
    text: 'text-blue-900',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  green: {
    bg: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-900',
    button: 'bg-green-600 hover:bg-green-700 text-white',
  },
  gray: {
    bg: 'bg-gray-100',
    border: 'border-gray-500',
    text: 'text-gray-900',
    button: 'bg-gray-600 hover:bg-gray-700 text-white',
  },
}

export function InstructionView({ item }: InstructionViewProps) {
  const { completeDisposal, reset } = useKioskStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const colorConfig = BIN_COLOR_CONFIG[item.binColor]

  return (
    <div className='flex h-full w-full max-w-6xl flex-col justify-center gap-3 lg:gap-6'>
      <div
        className={cn(
          'rounded-2xl border-4 p-4 text-center lg:rounded-3xl lg:border-8 lg:p-10',
          colorConfig.bg,
          colorConfig.border,
        )}
      >
        <div className={cn('mb-3 lg:mb-6', colorConfig.text)}>
          <p className='text-sm font-semibold tracking-wider uppercase lg:text-xl'>
            Контейнер: {item.binLabel}
          </p>
          <h1 className='mt-1 text-3xl font-black tracking-tight uppercase lg:mt-2 lg:text-6xl'>
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

        <div className='mb-3 lg:mb-6'>
          <p className='text-xl font-bold text-gray-900 lg:text-3xl'>{item.label}</p>
        </div>

        <div className='mx-auto max-w-2xl rounded-xl bg-white/80 p-4 shadow-lg lg:rounded-2xl lg:p-6'>
          <Trash2 className='mx-auto mb-2 size-8 text-gray-700 lg:mb-3 lg:size-14' />
          <p className='text-base leading-relaxed font-semibold text-gray-800 lg:text-xl'>
            {item.instruction}
          </p>
        </div>
      </div>

      <div className='flex flex-col justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-4'>
        <Button
          variant='outline'
          size='lg'
          onClick={reset}
          className='h-10 gap-2 text-sm font-semibold lg:h-14 lg:gap-3 lg:text-lg'
        >
          <ArrowLeft className='size-4 lg:size-5' />
          Назад
        </Button>
        <Button
          variant='outline'
          size='lg'
          onClick={() => setIsDialogOpen(true)}
          className='h-10 gap-2 text-sm font-semibold lg:h-14 lg:gap-3 lg:text-lg'
        >
          <Edit3 className='size-4 lg:size-5' />
          Не то, что я отсканировал?
        </Button>
        <Button
          size='lg'
          onClick={completeDisposal}
          className={cn('h-10 gap-2 text-sm font-semibold lg:h-14 lg:gap-3 lg:text-lg', colorConfig.button)}
        >
          <Trash2 className='size-4 lg:size-5' />
          Выбросил(а)
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-h-[80vh] max-w-4xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-xl lg:text-2xl'>Выберите предмет вручную</DialogTitle>
            <DialogDescription className='text-sm lg:text-base'>
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
