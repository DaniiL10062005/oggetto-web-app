'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Trophy } from 'lucide-react'
import Link from 'next/link'

import { QuestList } from '@/components/quests/quest-list'
import { QuestListSkeleton } from '@/components/quests/quest-skeleton'

import { useQuests } from '@/shared/hooks/use-quests'

export default function QuestsPage() {
  const { data: quests, isLoading, isError, error } = useQuests()

  return (
    <div className='flex h-screen flex-col overflow-hidden'>
      <header className='border-b bg-white px-6 py-4 shadow-sm lg:px-8 lg:py-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className='flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'
            >
              <ArrowLeft className='size-5' />
              <span className='text-sm font-medium'>Назад</span>
            </Link>
            <div className='h-8 w-px bg-gray-300' />
            <div className='flex items-center gap-3'>
              <div className='flex size-12 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-blue-500 shadow-lg'>
                <Trophy className='size-7 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-black text-gray-900 lg:text-3xl'>
                  Квесты и Челленджи
                </h1>
                <p className='text-sm text-gray-600 lg:text-base'>
                  Выполняйте задания и зарабатывайте бонусы
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className='flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-8'>
        <div className='mx-auto max-w-6xl'>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <QuestListSkeleton />
            </motion.div>
          )}

          {isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='flex flex-1 items-center justify-center'
            >
              <div className='text-center'>
                <div className='mb-4 text-6xl'>⚠️</div>
                <h3 className='text-2xl font-bold text-red-600'>Ошибка загрузки</h3>
                <p className='mt-2 text-gray-600'>
                  {error instanceof Error ? error.message : 'Не удалось загрузить квесты'}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className='mt-4 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700'
                >
                  Попробовать снова
                </button>
              </div>
            </motion.div>
          )}

          {!isLoading && !isError && quests && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <QuestList dailyQuests={quests.daily} weeklyQuest={quests.weekly} />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
