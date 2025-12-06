'use client'

import { motion } from 'framer-motion'

import { QuestCard } from './quest-card'
import type { Quest } from '@/shared/api/types'

interface QuestListProps {
  dailyQuests: Quest[]
  weeklyQuest: Quest | null
}

export function QuestList({ dailyQuests, weeklyQuest }: QuestListProps) {
  const hasDailyQuests = dailyQuests.length > 0
  const hasWeeklyQuest = weeklyQuest !== null

  if (!hasDailyQuests && !hasWeeklyQuest) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-1 items-center justify-center'
      >
        <div className='text-center'>
          <div className='mb-4 text-6xl'>🎯</div>
          <h3 className='text-2xl font-bold text-gray-900'>Нет активных квестов</h3>
          <p className='mt-2 text-gray-600'>
            Новые квесты появятся скоро. Проверьте позже!
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className='space-y-6'>
      {hasWeeklyQuest && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900'>
            <span className='text-3xl'>🏆</span>
            Еженедельный квест
          </h2>
          <QuestCard quest={weeklyQuest} questType='weekly' />
        </motion.section>
      )}

      {hasDailyQuests && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className='mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900'>
            <span className='text-3xl'>⭐</span>
            Ежедневные квесты
          </h2>
          <div className='grid gap-4 lg:grid-cols-2'>
            {dailyQuests.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <QuestCard quest={quest} questType='daily' />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
