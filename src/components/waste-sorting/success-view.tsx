'use client'

import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { Check, Coins } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useCreateDisposal } from '@/shared/hooks/use-create-disposal'
import { usePointBalance } from '@/shared/hooks/use-point-balance'
import { useKioskStore } from '@/shared/stores/kiosk-store'

export function SuccessView() {
  const selectedItem = useKioskStore(state => state.selectedItem)
  const pointId = useKioskStore(state => state.pointId)
  const isInitialized = useKioskStore(state => state.isInitialized)
  const lastDisposal = useKioskStore(state => state.lastDisposal)

  const { data: point } = usePointBalance()

  const { mutate: createDisposal, isPending } = useCreateDisposal()

  const hasSubmittedRef = useRef(false)
  const previousBalanceRef = useRef(0)
  const [coinsEarned, setCoinsEarned] = useState(10)

  useEffect(() => {
    let newBalance = 0

    if (lastDisposal?.user?.balance !== undefined) {
      newBalance = lastDisposal.user.balance
    } else if (point?.balance !== undefined) {
      newBalance = point.balance
    }

    if (newBalance > previousBalanceRef.current && previousBalanceRef.current > 0) {
      const earned = newBalance - previousBalanceRef.current
      setCoinsEarned(earned)
    }
  }, [lastDisposal, point])

  useEffect(() => {
    if (hasSubmittedRef.current || isPending) {
      return
    }

    if (!selectedItem) {
      return
    }

    if (!isInitialized || !pointId) {
      return
    }

    hasSubmittedRef.current = true
    previousBalanceRef.current = lastDisposal?.user?.balance ?? point?.balance ?? 0

    createDisposal(
      {
        type: selectedItem.type,
        subtype: selectedItem.subtype,
        state: selectedItem.state,
      },
      {
        onError: error => {
          console.error('Не удалось записать утилизацию:', error)
          hasSubmittedRef.current = false
        },
      },
    )
  }, [selectedItem, isInitialized, pointId, isPending, createDisposal, lastDisposal, point])

  useEffect(() => {
    const duration = 3500
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
        colors: ['#FFDD00', '#FFE534', '#FFB800', '#FFC700'],
      })
      confetti({
        ...defaults,
        particleCount: Math.max(particleCount, 100),
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFDD00', '#FFE534', '#FFB800', '#FFC700'],
      })
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center lg:space-y-10'>
      {/* Hero Success Icon - Large Yellow Circle with Check */}
      <motion.div
        className='bg-brand-yellow relative flex size-32 items-center justify-center rounded-full shadow-2xl lg:size-40'
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <Check className='text-brand-black size-16 stroke-4 lg:size-24' />
        </motion.div>

        {/* Pulsing rings */}
        <motion.div
          className='bg-brand-yellow/30 absolute inset-0 rounded-full'
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className='bg-brand-yellow/20 absolute inset-0 rounded-full'
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>

      {/* Reward Text */}
      <motion.div
        className='space-y-3 lg:space-y-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h1
          className='text-5xl font-black text-brand-black lg:text-7xl'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          Отлично!
        </motion.h1>

        <motion.p
          className='text-xl text-zinc-500 lg:text-3xl'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Вы спасли планету немного!
        </motion.p>

        {/* Currency Gain Badge */}
        <motion.div
          className='mx-auto inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-8 py-3 shadow-lg lg:gap-4 lg:px-10 lg:py-4'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <Coins className='text-brand-yellow size-7 lg:size-9' />
          <span className='text-brand-black text-2xl font-black lg:text-4xl'>
            +{coinsEarned} Оджеттонов
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
