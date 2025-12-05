'use client'

import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { useEffect } from 'react'

export function SuccessView() {
  useEffect(() => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = {
      startVelocity: 30,
      spread: 90,
      ticks: 120,
      zIndex: 1000,
      scalar: 1.2,
      gravity: 1.5,
      decay: 0.92,
      useWorker: true,
      disableForReducedMotion: false,
    }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = Math.floor(40 * (timeLeft / duration))

      confetti({
        ...defaults,
        particleCount: Math.max(particleCount, 100),
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#10b981', '#14b8a6', '#06b6d4', '#3b82f6'],
      })
      confetti({
        ...defaults,
        particleCount: Math.max(particleCount, 100),
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#10b981', '#14b8a6', '#06b6d4', '#3b82f6'],
      })
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center space-y-8 text-center'>
      <motion.div
        className='relative'
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <CheckCircle2 className='size-32 text-green-500' />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className='absolute -top-4 -right-4 size-12 text-yellow-500' />
        </motion.div>
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className='absolute -bottom-4 -left-4 size-12 text-yellow-500' />
        </motion.div>
      </motion.div>

      <motion.div
        className='space-y-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h1
          className='text-6xl font-black text-gray-900'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          Отлично!
        </motion.h1>
        <motion.div
          className='bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-6xl font-black text-transparent'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        >
          10 Оджеттонов!
        </motion.div>
        <motion.p
          className='text-2xl text-gray-600'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Спасибо за ответственную сортировку
        </motion.p>
      </motion.div>
      <div className='flex gap-4'>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className='size-4 rounded-full bg-green-500'
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  )
}
