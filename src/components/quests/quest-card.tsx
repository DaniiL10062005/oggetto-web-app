'use client'

import { motion } from 'framer-motion'
import { Calendar, Target } from 'lucide-react'

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

  const isDaily = questType === 'daily'
  const bgColor = isDaily ? 'bg-blue-50' : 'bg-purple-50'
  const borderColor = isDaily ? 'border-blue-200' : 'border-purple-200'
  const textColor = isDaily ? 'text-blue-700' : 'text-purple-700'
  const badgeBg = isDaily ? 'bg-blue-100' : 'bg-purple-100'
  const badgeText = isDaily ? 'text-blue-800' : 'text-purple-800'

  const progressPercentage = (progress / quest.goal) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`${bgColor} ${borderColor} border-2 transition-all hover:shadow-lg ${completed ? 'opacity-75' : ''}`}
      >
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex size-12 items-center justify-center rounded-full bg-white text-3xl shadow-sm'>
                {wasteIcon}
              </div>
              <div>
                <CardTitle className='text-lg font-bold text-gray-900'>
                  {wasteName}
                </CardTitle>
                <CardDescription className='mt-1 flex items-center gap-1 text-sm text-gray-600'>
                  <Calendar className='size-3' />
                  {dateLabel}
                </CardDescription>
              </div>
            </div>
            <div
              className={`${badgeBg} ${badgeText} rounded-full px-3 py-1 text-xs font-semibold uppercase`}
            >
              {isDaily ? 'Ежедневно' : 'Еженедельно'}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Target className={`size-5 ${textColor}`} />
            <span className='text-sm font-medium text-gray-700'>Прогресс:</span>
            <span className={`text-2xl font-black ${textColor}`}>
              {progress} / {quest.goal}
            </span>
            <span className='text-sm text-gray-600'>
              {quest.goal === 1 ? 'предмет' : quest.goal < 5 ? 'предмета' : 'предметов'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className='relative h-3 w-full overflow-hidden rounded-full bg-white'>
            <motion.div
              className={`h-full ${isDaily ? 'bg-blue-500' : 'bg-purple-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          {completed && (
            <div className='flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2'>
              <span className='text-xl'>✅</span>
              <span className='text-sm font-semibold text-green-800'>Квест выполнен!</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
