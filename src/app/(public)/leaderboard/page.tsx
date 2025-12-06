'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy } from 'lucide-react'
import Link from 'next/link'

import { LeaderboardItem } from '@/components/leaderboard/leaderboard-item'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/tabs'
import { useLeaderboard } from '@/shared/hooks/use-leaderboard'
import type { LeaderboardPeriod } from '@/shared/api/types'

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<LeaderboardPeriod>('daily')

  const { data, isLoading, isError, error } = useLeaderboard({
    period,
    limit: 50,
  })

  return (
    <div className='bg-brand-gray flex h-screen flex-col overflow-hidden'>
      <header className='border-brand-black/10 bg-brand-black border-b px-6 py-4 shadow-sm lg:px-8 lg:py-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className='flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white'
            >
              <ArrowLeft className='size-5' />
              <span className='text-sm font-medium'>Назад</span>
            </Link>
            <div className='h-8 w-px bg-zinc-700' />
            <div className='flex items-center gap-3'>
              <div className='bg-brand-yellow flex size-12 items-center justify-center rounded-full shadow-lg'>
                <Trophy className='text-brand-black size-7' />
              </div>
              <div>
                <h1 className='text-2xl font-black text-white lg:text-3xl'>
                  Таблица лидеров
                </h1>
                <p className='text-sm text-zinc-400 lg:text-base'>
                  Рейтинг офисов по количеству коинов
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className='flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-8'>
        <div className='mx-auto max-w-4xl'>
          <Tabs value={period} onValueChange={(value) => setPeriod(value as LeaderboardPeriod)}>
            <TabsList className='w-full max-w-md'>
              <TabsTrigger value='daily' className='flex-1'>
                День
              </TabsTrigger>
              <TabsTrigger value='week' className='flex-1'>
                Неделя
              </TabsTrigger>
              <TabsTrigger value='month' className='flex-1'>
                Месяц
              </TabsTrigger>
            </TabsList>

            <TabsContent value={period}>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className='space-y-3'
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className='h-20 animate-pulse rounded-lg border-2 border-gray-200 bg-gray-100'
                    />
                  ))}
                </motion.div>
              )}

              {isError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='flex flex-1 items-center justify-center py-12'
                >
                  <div className='text-center'>
                    <div className='mb-4 text-6xl'>⚠️</div>
                    <h3 className='text-2xl font-bold text-red-600'>Ошибка загрузки</h3>
                    <p className='mt-2 text-gray-600'>
                      {error instanceof Error ? error.message : 'Не удалось загрузить таблицу лидеров'}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className='mt-4 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700'
                    >
                      Попробовать снова
                    </button>
                  </div>
                </motion.div>
              )}

              {!isLoading && !isError && data && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className='space-y-3'
                >
                  {data.data.length === 0 ? (
                    <div className='py-12 text-center'>
                      <div className='mb-4 text-6xl'>📊</div>
                      <h3 className='text-xl font-semibold text-gray-700'>
                        Нет данных за выбранный период
                      </h3>
                      <p className='mt-2 text-gray-500'>
                        Попробуйте выбрать другой временной интервал
                      </p>
                    </div>
                  ) : (
                    data.data.map((item, index) => (
                      <motion.div
                        key={item.userId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <LeaderboardItem item={item} />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
