'use client'

import { motion, useAnimate } from 'framer-motion'
import { Coins } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { useKioskStore } from '@/shared/stores/kiosk-store'

export function TotalScore() {
  const points = useKioskStore(state => state.points)
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
      className='fixed top-6 right-6 z-50 flex items-center gap-3 rounded-full border-4 border-yellow-500 bg-yellow-50 px-6 py-3 shadow-xl'
    >
      <motion.div animate={{ rotate: points > 0 ? 360 : 0 }} transition={{ duration: 0.5 }}>
        <Coins className='size-8 text-yellow-600' />
      </motion.div>
      <div className='text-right'>
        <p className='text-xs font-semibold tracking-wider text-yellow-700 uppercase'>
          Оджеттоны
        </p>
        <motion.p
          key={points}
          initial={{ scale: 1.5, color: '#16a34a' }}
          animate={{ scale: 1, color: '#78350f' }}
          transition={{ duration: 0.3 }}
          className='text-2xl font-black text-yellow-900'
        >
          {points}
        </motion.p>
      </div>
    </motion.div>
  )
}
