'use client'

import { ArrowLeft, CheckCircle2, Edit3, Trash2, XCircle } from 'lucide-react'
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
import { useKioskStore } from '@/shared/stores/kiosk-store'
import type { WasteClassification } from '@/shared/utils/waste-mapping'

interface InstructionViewProps {
  item: WasteClassification
}

const BIN_COLOR_LABELS = {
  yellow: 'Желтый',
  blue: 'Синий',
  green: 'Зеленый',
  gray: 'Серый',
} as const

export function InstructionView({ item }: InstructionViewProps) {
  const { completeDisposal, reset } = useKioskStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const steps = item.text.split(/\n+/).filter(Boolean)

  return (
    <div className='flex h-full w-full max-w-6xl flex-col justify-center gap-6 lg:gap-8'>
      <div className='flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl lg:rounded-3xl'>
        <div className='bg-brand-gray px-6 py-8 text-center lg:px-10 lg:py-12'>
          {item.accepted ? (
            <CheckCircle2 className='text-brand-black mx-auto mb-4 size-16 lg:mb-6 lg:size-24' />
          ) : (
            <XCircle className='mx-auto mb-4 size-16 text-red-600 lg:mb-6 lg:size-24' />
          )}
          <h1 className='text-brand-black mb-2 text-2xl font-bold lg:mb-3 lg:text-4xl'>
            {item.accepted ? 'Подготовьте к переработке' : 'Не подлежит переработке'}
          </h1>
          <p className='text-base text-zinc-500 lg:text-xl'>
            {item.displayLabel} • {BIN_COLOR_LABELS[item.binColor]} контейнер
          </p>
        </div>

        <div className='flex-1 px-6 py-8 lg:px-10 lg:py-12'>
          {item.accepted ? (
            <>
              <div className='mb-6 lg:mb-8'>
                <p className='text-brand-black text-lg font-semibold lg:text-2xl'>
                  Следуйте{' '}
                  {steps.length === 1 ? 'этому шагу' : `этим ${steps.length} шагам`}
                </p>
              </div>

              <div className='space-y-6 lg:space-y-8'>
                {steps.map((step, index) => (
                  <div className='flex gap-4 lg:gap-6' key={index}>
                    <div className='bg-brand-yellow flex h-12 w-12 shrink-0 items-center justify-center rounded-full lg:h-14 lg:w-14'>
                      <span className='text-brand-black text-xl font-bold lg:text-2xl'>
                        {index + 1}
                      </span>
                    </div>

                    <div className='flex flex-1 items-center'>
                      <p className='text-brand-black text-lg leading-relaxed font-medium lg:text-2xl'>
                        {step.slice(3)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='rounded-xl bg-red-50 p-6 lg:p-8'>
              <p className='text-brand-black text-lg leading-relaxed font-medium lg:text-2xl'>
                {item.text ||
                  'Этот предмет не подлежит переработке. Пожалуйста, выбросьте его в контейнер для смешанных отходов.'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-3 lg:gap-4'>
        <Button
          variant='outline'
          size='lg'
          onClick={reset}
          className='border-brand-black text-brand-black h-12 gap-2 border-2 bg-white px-6 text-base font-bold transition-all hover:scale-[1.02] hover:opacity-90 lg:h-16 lg:gap-3 lg:px-8 lg:text-xl'
        >
          <ArrowLeft className='size-5 lg:size-6' />
          Назад
        </Button>
        <Button
          variant='outline'
          size='lg'
          onClick={() => setIsDialogOpen(true)}
          className='border-brand-black text-brand-black h-12 gap-2 border-2 bg-white px-6 text-base font-bold transition-all hover:scale-[1.02] hover:opacity-90 lg:h-16 lg:gap-3 lg:px-8 lg:text-xl'
        >
          <Edit3 className='size-5 lg:size-6' />
          Не то, что я отсканировал?
        </Button>
        {item.accepted && (
          <Button
            size='lg'
            onClick={completeDisposal}
            className='bg-brand-yellow text-brand-black h-12 gap-2 px-6 text-base font-bold transition-all hover:scale-[1.02] hover:opacity-90 lg:h-16 lg:gap-3 lg:px-8 lg:text-xl'
          >
            <Trash2 className='size-5 lg:size-6' />Я выбросил
          </Button>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-h-[80vh] max-w-4xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-xl lg:text-2xl'>
              Выберите предмет вручную
            </DialogTitle>
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
