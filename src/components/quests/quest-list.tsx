'use client'

import { motion } from 'framer-motion'

import { QuestCard } from './quest-card'
import type { QuestProgress } from '@/shared/api/types'

interface QuestListProps {
  dailyQuests: QuestProgress[]
  weeklyQuest: QuestProgress | null
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
          <h3 className='text-brand-black text-2xl font-bold'>Нет активных квестов</h3>
          <p className='mt-2 text-zinc-600'>
            Новые квесты появятся скоро. Проверьте позже!
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className='space-y-8'>
      {hasWeeklyQuest && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-brand-black mb-5 flex items-center gap-3 text-2xl font-black lg:text-3xl'>
            <span className='text-4xl lg:text-5xl'>🏆</span>
            Еженедельный квест
          </h2>
          <QuestCard questProgress={weeklyQuest} questType='weekly' />
        </motion.section>
      )}

      {hasDailyQuests && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className='text-brand-black mb-5 flex items-center gap-3 text-2xl font-black lg:text-3xl'>
            <span className='text-4xl lg:text-5xl'>⭐</span>
            Ежедневные квесты
          </h2>
          <div className='grid gap-4 lg:grid-cols-2'>
            {dailyQuests.map((questProgress, index) => (
              <motion.div
                key={questProgress.quest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <QuestCard questProgress={questProgress} questType='daily' />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
