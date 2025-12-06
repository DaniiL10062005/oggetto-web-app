'use client'

import { motion } from 'framer-motion'
import { Calendar, Target } from 'lucide-react'

import type { Quest } from '@/shared/api/types'
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
  quest: Quest
  questType: 'daily' | 'weekly'
}

export function QuestCard({ quest, questType }: QuestCardProps) {
  const wasteIcon = getWasteIcon(quest.subject.type)
  const wasteName = formatWasteType(quest.subject.type, quest.subject.subtype)
  const dateLabel = formatDate(quest.createdAt)

  const isDaily = questType === 'daily'
  const bgColor = isDaily ? 'bg-blue-50' : 'bg-purple-50'
  const borderColor = isDaily ? 'border-blue-200' : 'border-purple-200'
  const textColor = isDaily ? 'text-blue-700' : 'text-purple-700'
  const badgeBg = isDaily ? 'bg-blue-100' : 'bg-purple-100'
  const badgeText = isDaily ? 'text-blue-800' : 'text-purple-800'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${bgColor} ${borderColor} border-2 transition-all hover:shadow-lg`}>
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
        <CardContent>
          <div className='flex items-center gap-2'>
            <Target className={`size-5 ${textColor}`} />
            <span className='text-sm font-medium text-gray-700'>Цель:</span>
            <span className={`text-2xl font-black ${textColor}`}>{quest.goal}</span>
            <span className='text-sm text-gray-600'>
              {quest.goal === 1 ? 'предмет' : quest.goal < 5 ? 'предмета' : 'предметов'}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
