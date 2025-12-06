'use client'

import { AlertCircle } from 'lucide-react'

import { useKioskAuth } from '@/shared/hooks/use-kiosk-auth'
import { useKioskStore } from '@/shared/stores/kiosk-store'

interface KioskInitializerProps {
  children: React.ReactNode
}

export function KioskInitializer({ children }: KioskInitializerProps) {
  useKioskAuth()

  const { initError, isInitialized } = useKioskStore()

  if (initError) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-red-50'>
        <div className='flex max-w-md flex-col items-center gap-6 rounded-xl border-2 border-red-200 bg-white p-8 text-center shadow-lg'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <AlertCircle className='h-8 w-8 text-red-600' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-red-900'>Ошибка конфигурации киоска</h1>
            <p className='text-sm text-red-700'>{initError}</p>
          </div>
          <p className='text-xs text-gray-500'>
            Пожалуйста, свяжитесь с поддержкой или проверьте настройки окружения.
          </p>
        </div>
      </div>
    )
  }

  if (!isInitialized) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center gap-4'>
          <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600' />
          <p className='text-sm font-medium text-gray-600'>Инициализация киоска...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
