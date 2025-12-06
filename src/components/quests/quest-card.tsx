'use client'

import { motion } from 'framer-motion'
import { Calendar, Coins, Target } from 'lucide-react'

import type { QuestProgress } from '@/shared/api/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/card'
import { formatDate } from '@/shared/utils/date-formatters'
import { formatWasteType, getWasteIcon } from '@/shared/utils/waste-formatters'

interface QuestCardProps {
  questProgress: QuestProgress
  questType: 'daily' | 'weekly'
}

export function QuestCard({ questProgress, questType }: QuestCardProps) {
  const { quest, progress, completed } = questProgress
  const wasteIcon = getWasteIcon(quest.subject.type)
  const wasteName = formatWasteType(quest.subject.type, quest.subject.subtype)
  const dateLabel = formatDate(quest.createdAt)

  const isWeekly = questType === 'weekly'
  const progressPercentage = (progress / quest.goal) * 100

  // Weekly Quest - Dark Mode Hero
  if (isWeekly) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className={`bg-brand-black border-brand-black overflow-hidden border-2 shadow-2xl transition-all hover:shadow-3xl ${completed ? 'opacity-90' : ''}`}
        >
          <CardHeader className='pb-4'>
            <div className='flex items-start justify-between'>
              <div className='flex items-center gap-4'>
                <div className='flex size-16 items-center justify-center rounded-full bg-zinc-800 text-4xl shadow-lg lg:size-20 lg:text-5xl'>
                  {wasteIcon}
                </div>
                <div>
                  <CardTitle className='text-2xl font-black text-white lg:text-3xl'>
                    {wasteName}
                  </CardTitle>
                  <CardDescription className='mt-1 flex items-center gap-1.5 text-sm text-zinc-400 lg:text-base'>
                    <Calendar className='size-4' />
                    {dateLabel}
                  </CardDescription>
                </div>
              </div>
              <div className='bg-brand-yellow text-brand-black rounded-full px-4 py-1.5 text-xs font-bold uppercase lg:px-5 lg:py-2 lg:text-sm'>
                Еженедельно
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Target className='text-brand-yellow size-6 lg:size-7' />
                <span className='text-base font-medium text-zinc-400 lg:text-lg'>Прогресс:</span>
                <span className='text-brand-yellow text-3xl font-black lg:text-4xl'>
                  {progress} / {quest.goal}
                </span>
                <span className='text-sm text-zinc-500 lg:text-base'>
                  {quest.goal === 1 ? 'предмет' : quest.goal < 5 ? 'предмета' : 'предметов'}
                </span>
              </div>
              <div className='bg-brand-yellow text-brand-black flex items-center gap-2 rounded-full px-5 py-2.5 shadow-lg lg:px-6 lg:py-3'>
                <Coins className='size-5 lg:size-6' />
                <span className='text-base font-black lg:text-lg'>+{quest.reward}</span>
              </div>
            </div>

            <div className='relative h-4 w-full overflow-hidden rounded-full bg-zinc-800 lg:h-5'>
              <motion.div
                className='bg-brand-yellow h-full shadow-lg'
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            {completed && (
              <div className='bg-brand-yellow/10 flex items-center gap-2 rounded-lg border border-brand-yellow/30 px-4 py-3'>
                <span className='text-2xl'>✅</span>
                <span className='text-brand-yellow text-base font-bold lg:text-lg'>
                  Квест выполнен!
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Daily Quest - Light Mode Card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`overflow-hidden border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md ${completed ? 'opacity-75' : ''}`}
      >
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex size-12 items-center justify-center rounded-full bg-gray-50 text-3xl lg:size-14 lg:text-4xl'>
                {wasteIcon}
              </div>
              <div>
                <CardTitle className='text-brand-black text-lg font-bold lg:text-xl'>
                  {wasteName}
                </CardTitle>
                <CardDescription className='text-brand-black/60 mt-1 flex items-center gap-1 text-xs lg:text-sm'>
                  <Calendar className='size-3' />
                  {dateLabel}
                </CardDescription>
              </div>
            </div>
            <div className='rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-700'>
              Ежедневно
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Target className='text-brand-black size-4 lg:size-5' />
              <span className='text-brand-black text-xs font-medium lg:text-sm'>Прогресс:</span>
              <span className='text-brand-black text-xl font-black lg:text-2xl'>
                {progress} / {quest.goal}
              </span>
              <span className='text-xs text-gray-600 lg:text-sm'>
                {quest.goal === 1 ? 'предмет' : quest.goal < 5 ? 'предмета' : 'предметов'}
              </span>
            </div>
            <div className='bg-brand-yellow/10 border-brand-yellow/30 text-brand-black flex items-center gap-1.5 rounded-full border px-3 py-1.5'>
              <Coins className='text-brand-yellow size-4' />
              <span className='text-sm font-bold'>+{quest.reward}</span>
            </div>
          </div>

          <div className='relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100'>
            <motion.div
              className='bg-brand-yellow h-full'
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          {completed && (
            <div className='bg-brand-yellow/10 border-brand-yellow/30 flex items-center gap-2 rounded-lg border px-3 py-2'>
              <span className='text-lg'>✅</span>
              <span className='text-brand-black text-sm font-semibold'>Квест выполнен!</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
