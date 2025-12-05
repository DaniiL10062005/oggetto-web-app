'use client'

import { CheckCircle2, Sparkles } from 'lucide-react'

export function SuccessView() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center space-y-8 text-center'>
      <div className='relative'>
        <CheckCircle2 className='size-32 animate-bounce text-green-500' />
        <Sparkles className='absolute -top-4 -right-4 size-12 animate-pulse text-yellow-500' />
        <Sparkles className='absolute -bottom-4 -left-4 size-12 animate-pulse text-yellow-500 delay-75' />
      </div>

      <div className='space-y-4'>
        <h1 className='text-6xl font-black text-gray-900 dark:text-gray-50'>Отлично!</h1>
        <p className='text-4xl font-bold text-green-600 dark:text-green-400'>
          +10 Оджеттонов получено!
        </p>
        <p className='text-2xl text-gray-600 dark:text-gray-400'>
          Спасибо за ответственную сортировку
        </p>
      </div>

      <div className='flex gap-4'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='size-4 animate-pulse rounded-full bg-green-500'
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
