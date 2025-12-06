'use client'

import { motion, useAnimate } from 'framer-motion'
import { Coins } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { usePointBalance } from '@/shared/hooks/use-point-balance'

export function BalanceWidget() {
  const { data: point } = usePointBalance()

  const points = point?.balance ?? 0
  const [scope, animate] = useAnimate()
  const previousPoints = useRef(points)

  useEffect(() => {
    if (points > previousPoints.current) {
      animate(
        scope.current,
        {
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            '0 0 30px 5px rgba(234, 179, 8, 0.6), 0 0 50px 10px rgba(234, 179, 8, 0.3)',
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          ],
          borderColor: ['#eab308', '#fbbf24', '#eab308'],
        },
        {
          duration: 0.6,
          ease: 'easeInOut',
        },
      )
    }
    previousPoints.current = points
  }, [points, animate, scope])

  return (
    <motion.div
      ref={scope}
      className='fixed top-3 right-3 z-50 flex items-center gap-2 rounded-full border-2 border-yellow-500 bg-yellow-50 px-3 py-2 shadow-xl lg:top-6 lg:right-6 lg:gap-3 lg:border-4 lg:px-6 lg:py-3'
    >
      <motion.div animate={{ rotate: points > 0 ? 360 : 0 }} transition={{ duration: 0.5 }}>
        <Coins className='size-5 text-yellow-600 lg:size-8' />
      </motion.div>
      <div className='text-right'>
        <p className='text-[10px] font-semibold tracking-wider text-yellow-700 uppercase lg:text-xs'>
          Оджеттоны
        </p>
        <motion.p
          key={points}
          initial={{ scale: 1.5, color: '#16a34a' }}
          animate={{ scale: 1, color: '#78350f' }}
          transition={{ duration: 0.3 }}
          className='text-lg font-black text-yellow-900 lg:text-2xl'
        >
          {points}
        </motion.p>
      </div>
    </motion.div>
  )
}
